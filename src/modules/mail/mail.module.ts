import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailController } from './main.controller';
import { PostService } from './mail.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.jino.ru',
        port:  587,
        secure: false,
        auth: {
          user: 'lambadda@9002885655.myjino.ru',
          pass: 'test1994',
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@1>',
      },
      preview: true,
      template: {
        dir: process.cwd() + '/views/mail',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [MailController],
  providers: [PostService],
  exports: [PostService],
})
export class MailModule {}