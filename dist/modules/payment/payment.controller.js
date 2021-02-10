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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const authenticated_guard_1 = require("../auth/authenticated.guard");
const insta_service_1 = require("../insta/insta.service");
let PaymentsController = class PaymentsController {
    constructor(instaService) {
        this.instaService = instaService;
    }
    async getPagePayments(response, req) {
        const idUser = req.user._doc._id;
        const userMainAccount = await this.instaService.getMainAccount(idUser);
        if (!userMainAccount) {
            return response.redirect('/create');
        }
        return { page: 'payments_owner', bodyClass: 'application application-offset', account: userMainAccount, user: req.user._doc };
    }
};
__decorate([
    common_1.UseGuards(authenticated_guard_1.AuthenticatedGuard),
    common_1.Get('owner'),
    common_1.Render('payments/payments_owner.hbs'),
    __param(0, common_1.Response()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getPagePayments", null);
PaymentsController = __decorate([
    common_1.Controller('payments'),
    __metadata("design:paramtypes", [insta_service_1.InstaService])
], PaymentsController);
exports.PaymentsController = PaymentsController;
//# sourceMappingURL=payment.controller.js.map