import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UsersSchema, Users } from './user.schema';
import { BcryptService } from '../auth/bcrypt.service';
import { InstaModule } from '../insta/insta.module';
import { CryptService } from '../insta/crypt.service';
import { CustomerService } from './customer/user.customer.service';
import { Customer, UserCustomerSchema } from './customer/user.customer.schema';
import { ParseModule } from '../parse/parse.module';
import { StatsModule } from '../statistic/stats.module';
import { MailModule } from '../mail/mail.module';

@Module({
    providers: [UserService, BcryptService, CryptService, CustomerService],
    controllers: [UserController],
    imports: [
        StatsModule,
        ParseModule,
        InstaModule,
        MailModule,
        MongooseModule.forFeature([
            {name: Users.name, schema: UsersSchema},
            {name: Customer.name, schema: UserCustomerSchema}
        ]),
    ],
    exports: [UserService, CustomerService],
})
export class UserModule {}

