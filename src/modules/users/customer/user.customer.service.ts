import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InstaService } from 'src/modules/insta/insta.service';
import { PuppeteerService } from 'src/modules/parse/parse.service';
import { BcryptService } from '../../auth/bcrypt.service';
import { CustomerSubscribeDto } from './dto/customer.subsctibe.dto';
import { Customer, CustomerDocument } from './user.customer.schema';
import { Purchase } from './interfaces/purchase_interface';
import * as moment from 'moment';
import { StatsService } from 'src/modules/statistic/stats.service';
import { UserService } from '../user.service';
import { throwError } from 'rxjs';

@Injectable()
export class CustomerService {

      constructor(@InjectModel(Customer.name) 
      private customerUserModel: Model<CustomerDocument>, 
      private instaService: InstaService,
      private bcryptModel: BcryptService,
      private parseService: PuppeteerService,
      private statsService: StatsService,
      private userService: UserService
      ) {}

      async existUser(name: string ): Promise<any> {
            return await this.customerUserModel.findOne({profile_nickname: name});
      }


      async getCustomers(_id: object, page: number = 1): Promise<any> {

            const data =  await this.customerUserModel.find({user_invited: _id, }).limit(25).skip(25 * (page - 1));
            const count = await this.customerUserModel.find({user_invited: _id, }).count();

            return {data: data, count: Math.round(count / 25)};
      }

      async removeSubscribe(account_id: object, customer_id: object) {
            const account = await this.instaService.findById(account_id);
            const customer = await this.customerUserModel.findOne({_id: customer_id});
            if(account && customer) {
                  await this.parseService.unSubscribeUser(customer.profile_nickname, account_id);
                  customer.purchases = customer.purchases.filter(v => v.account_id.toString() !== account_id.toString());
                  await customer.save();
                  await this.statsService.updateStat('actived_stats', customer.account_invited, {type: 'minus'});
            }
            return true;
      }

      async addSubscribe(source: object, target: object, data: Purchase): Promise<any> {
            const customer = await this.customerUserModel.findOne({_id: source});
            try {
                  if(customer) {
                        if(!customer.purchases || !customer.purchases.length) {
                              customer.purchases = [data];
                        }
                        else if (customer.purchases && customer.purchases.length) {
                              const currentData = customer.purchases;
                              // if(customer.purchases.find(sub => sub['account_id'] === target)) {
                              //       throw new Error('exist');
                              // }
                              customer.purchases = [...customer.purchases, data];
                        }
                        await customer.save();
                        return customer;
                  }
            } catch (e) {
                  throw new Error(e);
            }
      }

      async getAll(): Promise<any> {
            return await this.customerUserModel.find();
      }

      async createCustomer(customerSubscribeDto: CustomerSubscribeDto): Promise<any> {

            const existUser = await this.existUser(customerSubscribeDto.nickname);
            const account = await this.instaService.findById(customerSubscribeDto._id);
            let r;

            if(!existUser) {

                  const account = await this.instaService.findById(customerSubscribeDto._id);
                  const infoUser = await this.parseService.findUserByName(customerSubscribeDto.nickname);

                  const u_created = await this.customerUserModel.create({
                        profile_nickname: infoUser.username,
                        email: customerSubscribeDto.email,
                        profile_name: (infoUser.full_name) ? infoUser.full_name : null,
                        profile_avatar_url: infoUser.profile_pic_url,
                        user_invited: account.user,
                        account_invited: account._id,
                  });

                  const t =  await this.addSubscribe(u_created._id, account._id, {
                        startedAt: moment(new Date()),
                        endAt: moment(new Date()).add(25, 'minutes'),
                        account_id: account._id,
                        active: true,
                  });

                  r = t;
            }

            if(existUser) {

                  const t = await this.addSubscribe(existUser._id, account._id, {
                        startedAt: moment(new Date()),
                        endAt: moment(new Date()).add(25, 'minutes'),
                        account_id: account._id,
                        active: true,
                  });

                  r = t;
            }

            try {
                  const balance_update = account.cost_subscribe - (account.cost_subscribe * 20 / 100);
                  await this.userService.updateBalance(balance_update, account.user);
                  await this.statsService.updateStat('balance_stats', account._id, {type: 'plus', value: balance_update, model: 'balance'});
            } catch (e) {
                  throw new Error(e);
            }

            return r;
      }
}