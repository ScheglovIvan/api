"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const app_service_1 = require("./app.service");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./modules/users/user.module");
const auth_module_1 = require("./modules/auth/auth.module");
const insta_module_1 = require("./modules/insta/insta.module");
const parse_module_1 = require("./modules/parse/parse.module");
const main_module_1 = require("./modules/main/main.module");
const config_1 = require("@nestjs/config");
const payment_module_1 = require("./modules/payment/payment.module");
const schedule_1 = require("@nestjs/schedule");
const task_module_1 = require("./modules/task/task.module");
const stats_module_1 = require("./modules/statistic/stats.module");
const mail_module_1 = require("./modules/mail/mail.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb+srv://joni:test@cluster0.p958b.mongodb.net/instagram?retryWrites=true&w=majority'),
            auth_module_1.AuthModule,
            main_module_1.MainModule,
            user_module_1.UserModule,
            insta_module_1.InstaModule,
            parse_module_1.ParseModule,
            task_module_1.TasksModule,
            stats_module_1.StatsModule,
            mail_module_1.MailModule,
            config_1.ConfigModule.forRoot(),
            schedule_1.ScheduleModule.forRoot(),
            payment_module_1.PaymentsModule,
        ],
        controllers: [],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map