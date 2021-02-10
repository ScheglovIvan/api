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
exports.HomeController = void 0;
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("../../../filters/http-exception.filter");
const insta_service_1 = require("../../insta/insta.service");
const stats_service_1 = require("../../statistic/stats.service");
const authenticated_guard_1 = require("../../auth/authenticated.guard");
let HomeController = class HomeController {
    constructor(instaService, statsService) {
        this.instaService = instaService;
        this.statsService = statsService;
    }
    async root(req, resp, session) {
        const idUser = req.user._doc._id;
        const userMainAccount = await this.instaService.getMainAccount(idUser);
        const allAccounts = await this.instaService.getAllAccounts(idUser);
        let filterType = session.type_filter;
        if (!filterType) {
            filterType = 'year';
        }
        if (!userMainAccount || !allAccounts.length) {
            return resp.redirect('/create');
        }
        const stats = await this.statsService.getStats(userMainAccount._id, filterType);
        return { type_filter: filterType, bodyClass: 'application application-offset', stats: stats, user: req.user._doc, account: userMainAccount, page: 'home', accounts: allAccounts };
    }
    async setFilter(req, body, resp, session) {
        session.type_filter = body.type_filter;
        return resp.redirect('/');
    }
    indexLogin() { }
    indexRegister() { }
    async createAccount() {
        return { bodyClass: 'application application-offset' };
    }
    async indexRecovery(req) {
        return { message: '', user: req.user };
    }
    async indexSuccessRecovery(req) {
        return { message: '', user: req.user };
    }
    async renderTest() {
        return {};
    }
};
__decorate([
    common_1.Get('/'),
    common_1.UseFilters(new http_exception_filter_1.HttpExceptionFilter()),
    common_1.UseGuards(authenticated_guard_1.AuthenticatedGuard),
    common_1.Render('home/home.hbs'),
    __param(0, common_1.Request()), __param(1, common_1.Response()), __param(2, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "root", null);
__decorate([
    common_1.Post('/setfilter'),
    __param(0, common_1.Req()), __param(1, common_1.Body()), __param(2, common_1.Response()), __param(3, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "setFilter", null);
__decorate([
    common_1.Get('/login'),
    common_1.Render('auth/login.hbs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "indexLogin", null);
__decorate([
    common_1.Get('/register'),
    common_1.Render('auth/register.hbs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "indexRegister", null);
__decorate([
    common_1.Get('/create'),
    common_1.Render('partials/add_insta.hbs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "createAccount", null);
__decorate([
    common_1.Get('/recovery'),
    common_1.Render('auth/recovery.hbs'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "indexRecovery", null);
__decorate([
    common_1.Get('/success_recovery'),
    common_1.Render('auth/see_mail.hbs'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "indexSuccessRecovery", null);
__decorate([
    common_1.Get('/test'),
    common_1.Render('test.hbs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "renderTest", null);
HomeController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [insta_service_1.InstaService, stats_service_1.StatsService])
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=home.controller.js.map