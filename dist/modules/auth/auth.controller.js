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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../../roles/role.enum");
const roles_decorator_1 = require("../../roles/roles.decorator");
const user_login_dto_1 = require("../users/dto/user.login.dto");
const user_register_dto_1 = require("../users/dto/user.register.dto");
const user_service_1 = require("../users/user.service");
const auth_service_1 = require("./auth.service");
const local_auth_guard_1 = require("./local-auth.guard");
let AuthController = class AuthController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async login(LoginUserDto, req, resp) {
        const r = await this.authService.createToken(req.user);
        return resp.json(r);
    }
    async logout(req, res) {
        req.logout();
        return res.redirect('/login');
    }
    async register(CreateUserDto, res) {
        const resultCreateUser = await this.userService.create(CreateUserDto);
        res.status(common_1.HttpStatus.OK).send(resultCreateUser);
    }
    async registerUser(CreateUserDto, res) {
        const resultCreateUser = await this.userService.create(CreateUserDto);
        res.status(common_1.HttpStatus.OK).send(resultCreateUser);
    }
};
__decorate([
    common_1.UseGuards(local_auth_guard_1.LocalAuthGuard),
    roles_decorator_1.Roles(role_enum_1.Role.User),
    common_1.Post('/login'),
    __param(0, common_1.Body()), __param(1, common_1.Request()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_dto_1.LoginUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Get('/logout'),
    __param(0, common_1.Request()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    roles_decorator_1.Roles(role_enum_1.Role.User),
    common_1.Post('/register'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_register_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    roles_decorator_1.Roles(role_enum_1.Role.Customer),
    common_1.Post('/register_user'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_register_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService, auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map