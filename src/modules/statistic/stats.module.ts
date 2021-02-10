import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InstaAccount, InstaSchema } from '../insta/insta.shcema';
import { Customer, UserCustomerSchema } from '../users/customer/user.customer.schema';
import { UserModule } from '../users/user.module';
import { Users, UsersSchema } from '../users/user.schema';
import { StatsController } from './stats.controller';
import { StatsSchema, Stats } from './stats.schema';
import { StatsService } from './stats.service';

@Module({
   providers: [StatsService],
   controllers: [StatsController],
   imports: [
        MongooseModule.forFeature(
            [
                {name: InstaAccount.name, schema: InstaSchema},
                {name: Users.name, schema: UsersSchema},
                {name: Customer.name, schema: UserCustomerSchema},
                {name: Stats.name, schema: StatsSchema}
            ]
        )
   ],
   exports: [StatsService],
})
export class StatsModule {};