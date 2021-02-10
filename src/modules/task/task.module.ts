import { Module } from '@nestjs/common';
import { InstaModule } from '../insta/insta.module';
import { MailModule } from '../mail/mail.module';
import { ParseModule } from '../parse/parse.module';
import { StatsModule } from '../statistic/stats.module';
import { CustomerService } from '../users/customer/user.customer.service';
import { UserModule } from '../users/user.module';
import { TasksService } from './task.service';

@Module({
  providers: [TasksService],
  imports: [UserModule, ParseModule, InstaModule, MailModule, StatsModule],
})
export class TasksModule {}