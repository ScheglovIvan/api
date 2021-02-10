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
exports.SettingsController = void 0;
const common_1 = require("@nestjs/common");
const insta_service_1 = require("../../insta/insta.service");
const authenticated_guard_1 = require("../../auth/authenticated.guard");
const config_1 = require("@nestjs/config");
let SettingsController = class SettingsController {
    constructor(instaService, configService) {
        this.instaService = instaService;
        this.configService = configService;
    }
    async root(req) {
        const idUser = req.user._doc._id;
        const mainAccount = await this.instaService.getMainAccount(idUser);
        const accounts = await this.instaService.getAllAccounts(idUser);
        return { bodyClass: 'application application-offset', user: req.user._doc, account: mainAccount, accounts: accounts,
            page: 'settings', home_url: this.configService.get('protocol') + this.configService.get('HOME_URL') };
    }
};
__decorate([
    common_1.UseGuards(authenticated_guard_1.AuthenticatedGuard),
    common_1.Get('/settings'),
    common_1.Render('settings/settings.hbs'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "root", null);
SettingsController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [insta_service_1.InstaService, config_1.ConfigService])
], SettingsController);
exports.SettingsController = SettingsController;
//# sourceMappingURL=settings.controller.js.map