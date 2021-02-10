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
exports.InstagrammController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const authenticated_guard_1 = require("../auth/authenticated.guard");
const parse_service_1 = require("../parse/parse.service");
const create_insta_account_dto_1 = require("./dto/create.insta.account.dto");
const delete_insta_account_dto_1 = require("./dto/delete.insta.account.dto");
const insta_service_1 = require("./insta.service");
const mongoose = require('mongoose');
let InstagrammController = class InstagrammController {
    constructor(instaService, configService, parseService) {
        this.instaService = instaService;
        this.configService = configService;
        this.parseService = parseService;
    }
    async root(req) {
        const idUser = req.user._doc._id;
        const mainAccount = await this.instaService.getMainAccount(idUser);
        const accounts = await this.instaService.getAllAccounts(idUser);
        return { bodyClass: 'application application-offset', user: req.user._doc, account: mainAccount, accounts: accounts,
            page: 'account_list', home_url: this.configService.get('protocol') + this.configService.get('HOME_URL') };
    }
    async deleteAcc({ id }, req, resp) {
        let id_user = req.session.passport.user._doc._id;
        const r = await this.instaService.deleteAcccount(id_user, mongoose.Types.ObjectId(id));
        if (r) {
            resp.redirect('/instagram/view');
        }
    }
    async getAccount({ id }, req, resp) {
        let id_user = req.session.passport.user._doc._id;
        const account = await this.instaService.findAccount(id);
        if (account) {
            return { user: req.user._doc, account: account, bodyClass: 'application application-offset', home_url: this.configService.get('protocol') + this.configService.get('HOME_URL') };
        }
        return resp.redirect('/');
    }
    async setMain(id, req, resp) {
        let id_user = req.session.passport.user._doc._id;
        const r = await this.instaService.setMain(id, id_user);
        if (r) {
            resp.redirect('/');
        }
    }
    async addAccount(createInstaAccountDto, req, resp) {
        let id = req.user._doc._id;
        const r = await this.instaService.createAccount(id, createInstaAccountDto);
        return resp.json(r);
    }
    async deleteAccount(DeleteAccountInstaDto, req, resp) {
        let id = req.session.passport.user._doc._id;
        const r = await this.instaService.deleteAcccount(id, DeleteAccountInstaDto);
        if (r) {
            resp.redirect('/');
        }
    }
    async setCostAccount(body) {
        return await this.instaService.setCostAccount(mongoose.Types.ObjectId(body.acc_id), body.account_cost);
    }
    async parseAccount(Body) {
        const id = mongoose.Types.ObjectId('6014842c48a6435978171b74');
        await this.parseService.parseAccountApi(id);
    }
};
__decorate([
    common_1.UseGuards(authenticated_guard_1.AuthenticatedGuard),
    common_1.Get('/view'),
    common_1.Render('account/list.hbs'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstagrammController.prototype, "root", null);
__decorate([
    common_1.UseGuards(authenticated_guard_1.AuthenticatedGuard),
    common_1.Get('/delete/:id'),
    __param(0, common_1.Param()), __param(1, common_1.Request()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], InstagrammController.prototype, "deleteAcc", null);
__decorate([
    common_1.UseGuards(authenticated_guard_1.AuthenticatedGuard),
    common_1.Get('/edit/:id'),
    common_1.Render('account/edit.hbs'),
    __param(0, common_1.Param()), __param(1, common_1.Request()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], InstagrammController.prototype, "getAccount", null);
__decorate([
    common_1.UseGuards(authenticated_guard_1.AuthenticatedGuard),
    common_1.Get('/setmain/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Req()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], InstagrammController.prototype, "setMain", null);
__decorate([
    common_1.Post('/add'),
    common_1.UseGuards(authenticated_guard_1.AuthenticatedGuard),
    __param(0, common_1.Body()), __param(1, common_1.Req()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_insta_account_dto_1.CreateInstaAccountDto, Object, Object]),
    __metadata("design:returntype", Promise)
], InstagrammController.prototype, "addAccount", null);
__decorate([
    common_1.Post('/delete'),
    __param(0, common_1.Body()), __param(1, common_1.Req()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_insta_account_dto_1.DeleteAccountInstaDto, Object, Object]),
    __metadata("design:returntype", Promise)
], InstagrammController.prototype, "deleteAccount", null);
__decorate([
    common_1.UseGuards(authenticated_guard_1.AuthenticatedGuard),
    common_1.Post('/setcost'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstagrammController.prototype, "setCostAccount", null);
__decorate([
    common_1.Post('/parse'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstagrammController.prototype, "parseAccount", null);
InstagrammController = __decorate([
    common_1.Controller('instagram'),
    __metadata("design:paramtypes", [insta_service_1.InstaService, config_1.ConfigService, parse_service_1.PuppeteerService])
], InstagrammController);
exports.InstagrammController = InstagrammController;
//# sourceMappingURL=insta.controller.js.map