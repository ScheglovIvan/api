import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { rejects } from 'assert';
import { Model } from 'mongoose';
import { BcryptService } from '../auth/bcrypt.service';
import { CreateUserDto } from './dto/user.register.dto';
import { Users, UsersDocument } from './user.schema';
import * as password from 'password-generator';
import { MailerService } from '@nestjs-modules/mailer';
import { PostService } from '../mail/mail.service';

export type User = any;

@Injectable()
export class UserService {

      constructor(@InjectModel(Users.name) private userModel: Model<UsersDocument>, 
      private bcryptModel: BcryptService,
      private postService: PostService
      ) {}

      async findOne(LoginUserDto): Promise<User | undefined> {
          return this.userModel.find({$or: [{login: LoginUserDto.login}, {email: LoginUserDto.email}]});
      }

      async findLogin(login: string): Promise<User | undefined> {
        return this.userModel.findOne({$or: [{login: login}, {email: login}]})
      }

      async updateVisited(count: number, user_id: object): Promise<any>  {
        const currentUser = await this.userModel.findOne({_id: user_id});
        if(currentUser) {
          currentUser.total_visited = currentUser.total_visited + count;
          currentUser.save();
        }
        return true;
      }

      async updateSubscribe(count: number, user_id: object): Promise<any>  {
        const currentUser = await this.userModel.findOne({_id: user_id});
        if(currentUser) {
          currentUser.total_visited = currentUser.total_visited + count;
          currentUser.save();
        }
        return true;
      }

      async create(UserData: CreateUserDto): Promise<any> {

        const isUserExist = await this.userModel.find({$or: [{'login': UserData.login}, {'email': UserData.email}]})
        if(isUserExist.length !== 0) {
          return {exist: true}
        }
        if(isUserExist.length === 0) {
            return await this.userModel.create({
              'login': UserData.login,
              'email': UserData.email,
              'password': await this.bcryptModel.hash(UserData.password)
            })
        }
      }

      private async createNewPassword() {
          return await password();
      }

      async recoveryPassword(email: string) {

        const user = await this.userModel.findOne({email: email});
        if(user) {
           const new_p = await this.createNewPassword();
           const hash = await  this.bcryptModel.hash(new_p);
           user.password = hash;
           await user.save();
           await this.postService.sendPasswordRecovery(new_p, user.login, user.email);
        }
        return user;

      }

      async updateBalance(summ: number, _id: object) {
          await this.userModel.findOne({_id: _id}, function (err, model) {
            if(!err) {
              model.balance = model.balance + summ;
              model.save();
            }
          });
      }
}