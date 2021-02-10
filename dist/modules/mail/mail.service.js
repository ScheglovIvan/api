"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
let PostService = class PostService {
    constructor(mailerService, configService) {
        this.mailerService = mailerService;
        this.configService = configService;
    }
    async sendPasswordRecovery(password, user_name, email) {
        console.log(email);
        this.mailerService
            .sendMail({
            to: email,
            from: 'noreply@nestjs.com',
            subject: 'New password ✔',
            template: 'recovery',
            context: {
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
    async sendSuccessPayment(user_invited, user_name, email, customer, account) {
        const url = this.configService.get('protocol') + this.configService.get('HOME_URL');
        const url_cancel = url + `/user/cancel_subscribe?customer=${customer}&account=${account}`;
        console.log(email);
        this.mailerService
            .sendMail({
            to: email,
            from: 'noreply@nestjs.com',
            subject: 'Подписка успешно оформлена ✔',
            template: 'template_success',
            context: {
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
            .catch((e) => { });
    }
    async sendPaymentResume(user_invited_name, email, customer) {
        const url = this.configService.get('protocol') + this.configService.get('HOME_URL');
        const url_resume = url + `/user/subscribe/${user_invited_name}`;
        this.mailerService
            .sendMail({
            to: email,
            from: 'noreply@nestjs.com',
            subject: 'Подписка успешно оформлена ✔',
            template: 'subscribe_end',
            context: {
                email: email,
                user_invited: user_invited_name,
                customer_id: customer,
                home_url: url,
                resume_url: url_resume,
            },
        })
            .then(() => { })
            .catch(() => { });
    }
};
PostService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [mailer_1.MailerService, config_1.ConfigService])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=mail.service.js.map