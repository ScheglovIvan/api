import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// user module
import {UserModule} from './modules/users/user.module';

// controllers
import { LoginController } from './controllers/LoginController';

// Login module
import  { AuthModule } from './modules/auth/auth.module'
// Instagram module
import { InstaModule } from './modules/insta/insta.module';
// prase module
import { ParseModule } from './modules/parse/parse.module';
// home pageModule
import { MainModule } from './modules/main/main.module';
// config module
import { ConfigModule } from '@nestjs/config';
// payment module
import { PaymentsModule } from './modules/payment/payment.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './modules/task/task.module';
import { StatsModule } from './modules/statistic/stats.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://joni:test@cluster0.p958b.mongodb.net/instagram?retryWrites=true&w=majority'),
    AuthModule,
    MainModule,
    UserModule,
    InstaModule,
    ParseModule,
    TasksModule,
    StatsModule,
    MailModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    PaymentsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
