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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const insta_service_1 = require("../insta/insta.service");
const crypt_service_1 = require("../insta/crypt.service");
const customer_subsctibe_dto_1 = require("./customer/dto/customer.subsctibe.dto");
const user_customer_service_1 = require("./customer/user.customer.service");
const parse_service_1 = require("../parse/parse.service");
const stats_service_1 = require("../statistic/stats.service");
const authenticated_guard_1 = require("../auth/authenticated.guard");
let UserController = class UserController {
    constructor(userService, customerService, instaService, cryptSerivce, parseService, statService) {
        this.userService = userService;
        this.customerService = customerService;
        this.instaService = instaService;
        this.cryptSerivce = cryptSerivce;
        this.parseService = parseService;
        this.statService = statService;
    }
    async createPaymentPage(req, { name }) {
        const userOwner = await this.instaService.findAcccountByProfile(name);
        if (userOwner) {
            await this.userService.updateVisited(1, userOwner.user);
            await this.instaService.updateVisited(1, name);
            await this.statService.updateStat('visited_stats', userOwner._id, { type: 'plus' });
        }
        return { bodyClass: 'application application-offset', owner: userOwner };
    }
    async renderSuccessSubscribe() {
        return { bodyClass: 'application application-offset' };
    }
    async renderCustomerList(req, resp, page) {
        const idUser = req.user._doc._id;
        const userMainAccount = await this.instaService.getMainAccount(idUser);
        const relatedUsers = await this.customerService.getCustomers(idUser, page);
        if (!userMainAccount) {
            return resp.redirect('/create');
        }
        return {
            data: relatedUsers.data,
            bodyClass: 'application application-offset',
            page: 'customer_list',
            account: userMainAccount,
            user: req.user._doc,
            pagination: {
                page: page,
                pageCount: relatedUsers.count
            }
        };
    }
    async subscribeUser(customerSubscribeDto, resp) {
        console.log(customerSubscribeDto);
        const client = await this.customerService.createCustomer(customerSubscribeDto);
        console.log(client);
        const r = await this.instaService.addSubscribe(customerSubscribeDto, client._id);
        if (r) {
            resp.redirect('/user/customer/success');
        }
    }
    async subscribeUserTest(CustomerSubscribeDto, resp) {
        const user = await this.customerService.createCustomer(CustomerSubscribeDto);
    }
    async unsubscribeTest(nickname, account) {
        return await this.parseService.unSubscribeUser(nickname, account);
    }
    async unsubscribeRender(id) {
    }
    async renderRecovery() {
        return {};
    }
    async recoveryPassword(body, resp) {
        const { email } = body;
        if (email) {
            const r = await this.userService.recoveryPassword(email);
        }
        return resp.redirect('recovery');
    }
    async cancelSubsctibe(query, resp) {
        const r = await this.customerService.removeSubscribe(query.account, query.customer);
        if (r) {
            resp.redirect('cancel_subscribe_success');
        }
    }
    async renderCancelSuccess() {
        return {};
    }
};
__decorate([
    common_1.Get('subscribe/:name'),
    common_1.Render('users/new_subscribe.hbs'),
    __param(0, common_1.Request()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createPaymentPage", null);
__decorate([
    common_1.Get('customer/success'),
    common_1.Render('users/success_subscribe.hbs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "renderSuccessSubscribe", null);
__decorate([
    common_1.UseGuards(authenticated_guard_1.AuthenticatedGuard),
    common_1.Get('customer'),
    common_1.Render('users/customer_list.hbs'),
    __param(0, common_1.Req()), __param(1, common_1.Response()), __param(2, common_1.Query('p')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "renderCustomerList", null);
__decorate([
    common_1.Post('subscribe'),
    __param(0, common_1.Body()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_subsctibe_dto_1.CustomerSubscribeDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "subscribeUser", null);
__decorate([
    common_1.Post('testsubscribe'),
    __param(0, common_1.Body()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_subsctibe_dto_1.CustomerSubscribeDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "subscribeUserTest", null);
__decorate([
    common_1.Post('unsubsctibe'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unsubscribeTest", null);
__decorate([
    common_1.Get('unsubsctibe'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "unsubscribeRender", null);
__decorate([
    common_1.Get('/recovery'),
    common_1.Render('users/recovery_password.hbs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "renderRecovery", null);
__decorate([
    common_1.Post('/recovery'),
    __param(0, common_1.Body()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "recoveryPassword", null);
__decorate([
    common_1.Get('cancel_subscribe'),
    __param(0, common_1.Query()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "cancelSubsctibe", null);
__decorate([
    common_1.Get('cancel_subscribe_success'),
    common_1.Render('users/success_cancel.hbs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "renderCancelSuccess", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, user_customer_service_1.CustomerService, insta_service_1.InstaService,
        crypt_service_1.CryptService,
        parse_service_1.PuppeteerService,
        stats_service_1.StatsService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map