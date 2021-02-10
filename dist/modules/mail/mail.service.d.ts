import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
export declare class PostService {
    private readonly mailerService;
    private configService;
    constructor(mailerService: MailerService, configService: ConfigService);
    sendPasswordRecovery(password: string, user_name: string, email: string): Promise<void>;
    sendSuccessPayment(user_invited: string, user_name: string, email: string, customer: object, account: object): Promise<void>;
    sendPaymentResume(user_invited_name: string, email: string, customer: object): Promise<void>;
}
