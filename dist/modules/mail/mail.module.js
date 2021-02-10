"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const main_controller_1 = require("./main.controller");
const mail_service_1 = require("./mail.service");
const config_1 = require("@nestjs/config");
let MailModule = class MailModule {
};
MailModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule,
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.jino.ru',
                    port: 587,
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
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        ],
        controllers: [main_controller_1.MailController],
        providers: [mail_service_1.PostService],
        exports: [mail_service_1.PostService],
    })
], MailModule);
exports.MailModule = MailModule;
//# sourceMappingURL=mail.module.js.map