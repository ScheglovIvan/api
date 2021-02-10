import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostService {
  constructor(private readonly mailerService: MailerService, private configService: ConfigService) {}

  public async sendPasswordRecovery(password: string, user_name: string, email: string) {

        console.log(email);

        this.mailerService
        .sendMail({
        to: email,
        from: 'noreply@nestjs.com',
        subject: 'New password ✔',
        template: 'recovery', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
        context: {  // Data to be sent to template engine.
            user: user_name,
            pass: password,
            email: email
        },
        })
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
  }

  public async sendSuccessPayment(user_invited: string, user_name: string, email: string, customer: object, account: object) {
    const url  = this.configService.get<string>('protocol') + this.configService.get<string>('HOME_URL');
    const url_cancel = url + `/user/cancel_subscribe?customer=${customer}&account=${account}`;

    console.log(email);

    this.mailerService
    .sendMail({
      to: email,
      from: 'noreply@nestjs.com',
      subject: 'Подписка успешно оформлена ✔',
      template: 'template_success', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
      context: {  // Data to be sent to template engine.
          user: user_name,
          email: email,
          user_invited: user_invited,
          customer_id: customer,
          account_id: account,
          home_url: url,
          cancel_url: url_cancel,
      },
    })
    .then((r) => {
      console.log(r);
    })
    .catch((e) => {});
  }

  public async sendPaymentResume(user_invited_name: string, email: string, customer: object) {

    const url = this.configService.get<string>('protocol') + this.configService.get<string>('HOME_URL');
    const url_resume = url + `/user/subscribe/${user_invited_name}`;

    this.mailerService
    .sendMail({
      to: email,
      from: 'noreply@nestjs.com',
      subject: 'Подписка успешно оформлена ✔',
      template: 'subscribe_end', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
      context: {  // Data to be sent to template engine.
          email: email,
          user_invited: user_invited_name,
          customer_id: customer,
          home_url: url,
          resume_url: url_resume,
      },
    })
    .then(() => {})
    .catch(() => {});
  }

}