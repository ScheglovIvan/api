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
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const parse_service_1 = require("../parse/parse.service");
const user_customer_service_1 = require("../users/customer/user.customer.service");
const moment = require("moment");
const insta_service_1 = require("../insta/insta.service");
const mail_service_1 = require("../mail/mail.service");
const stats_service_1 = require("../statistic/stats.service");
let TasksService = TasksService_1 = class TasksService {
    constructor(customerService, parseService, instaSerivce, postService, statsService) {
        this.customerService = customerService;
        this.parseService = parseService;
        this.instaSerivce = instaSerivce;
        this.postService = postService;
        this.statsService = statsService;
        this.logger = new common_1.Logger(TasksService_1.name);
    }
    async handleCron() {
        const customers = await this.customerService.getAll();
        for (const customer of customers) {
            if (customer.purchases && customer.purchases.length) {
                for (let i = 0; i < customer.purchases.length; i++) {
                    const endAt = customer.purchases[i].endAt;
                    const t = moment(new Date()).diff(endAt, 'minutes');
                    console.log(t);
                    if (t > 0) {
                        const account = await this.instaSerivce.findById(customer.account_invited);
                        if (account) {
                            await this.parseService.unSubscribeUser(customer.profile_nickname, customer.account_invited);
                            await this.postService.sendPaymentResume(account.profile_nickname, customer.email, customer);
                            await this.customerService.removeSubscribe(account._id, customer._id);
                        }
                    }
                }
            }
            await customer.save();
        }
        this.logger.debug('Called when the current second is 45');
    }
};
__decorate([
    schedule_1.Cron('10 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksService.prototype, "handleCron", null);
TasksService = TasksService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_customer_service_1.CustomerService,
        parse_service_1.PuppeteerService,
        insta_service_1.InstaService,
        mail_service_1.PostService,
        stats_service_1.StatsService])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=task.service.js.map