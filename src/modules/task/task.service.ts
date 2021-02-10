import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { PuppeteerService } from "../parse/parse.service";
import { CustomerService } from "../users/customer/user.customer.service";
import * as moment from 'moment';
import { InstaService } from "../insta/insta.service";
import { PostService } from "../mail/mail.service";
import { StatsService } from "../statistic/stats.service";

@Injectable()
export class TasksService {

  constructor (
  private customerService: CustomerService,
  private parseService: PuppeteerService,
  private instaSerivce: InstaService,
  private postService: PostService,
  private statsService: StatsService
  ) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron('10 * * * * *')
  async handleCron() {

    const customers = await this.customerService.getAll();
    for(const customer of customers) {
        if(customer.purchases && customer.purchases.length) {
          for(let i = 0; i < customer.purchases.length; i++) {
            const endAt: object = customer.purchases[i].endAt;
            // console.log(endAt);
            // console.log(new Date());
            const t = moment(new Date()).diff(endAt, 'minutes')
            console.log(t);
            if(t > 0) {
                const account = await this.instaSerivce.findById(customer.account_invited);
                if(account) {
                  await this.parseService.unSubscribeUser(customer.profile_nickname, customer.account_invited);
                  await this.postService.sendPaymentResume(account.profile_nickname, customer.email, customer);
                  await this.customerService.removeSubscribe(account._id, customer._id);
                }
            }
          }
        }

        await customer.save();
    }

    this.logger.debug('Called when the current second is 45');

  }

}