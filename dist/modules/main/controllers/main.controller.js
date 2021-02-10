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
exports.MainController = void 0;
const common_1 = require("@nestjs/common");
const authenticated_guard_1 = require("../../auth/authenticated.guard");
let MainController = class MainController {
    root(req) {
        return { bodyClass: 'application application-offset', user: req.user._doc, account: 133 };
    }
    indexLogin() { }
    indexRegister() { }
    indexRecovery(req) {
        return { message: '', user: req.user };
    }
};
__decorate([
    common_1.UseGuards(authenticated_guard_1.AuthenticatedGuard),
    common_1.Get('/'),
    common_1.Render('home/home.hbs'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MainController.prototype, "root", null);
__decorate([
    common_1.Get('/login'),
    common_1.Render('auth/login.hbs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MainController.prototype, "indexLogin", null);
__decorate([
    common_1.Get('/register'),
    common_1.Render('auth/register.hbs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MainController.prototype, "indexRegister", null);
__decorate([
    common_1.UseGuards(authenticated_guard_1.AuthenticatedGuard),
    common_1.Get('/recovery'),
    common_1.Render('auth/recovery.hbs'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MainController.prototype, "indexRecovery", null);
MainController = __decorate([
    common_1.Controller()
], MainController);
exports.MainController = MainController;
//# sourceMappingURL=main.controller.js.map