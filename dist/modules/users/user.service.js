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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt_service_1 = require("../auth/bcrypt.service");
const user_schema_1 = require("./user.schema");
const password = require("password-generator");
const mail_service_1 = require("../mail/mail.service");
let UserService = class UserService {
    constructor(userModel, bcryptModel, postService) {
        this.userModel = userModel;
        this.bcryptModel = bcryptModel;
        this.postService = postService;
    }
    async findOne(LoginUserDto) {
        return this.userModel.find({ $or: [{ login: LoginUserDto.login }, { email: LoginUserDto.email }] });
    }
    async findLogin(login) {
        return this.userModel.findOne({ $or: [{ login: login }, { email: login }] });
    }
    async updateVisited(count, user_id) {
        const currentUser = await this.userModel.findOne({ _id: user_id });
        if (currentUser) {
            currentUser.total_visited = currentUser.total_visited + count;
            currentUser.save();
        }
        return true;
    }
    async updateSubscribe(count, user_id) {
        const currentUser = await this.userModel.findOne({ _id: user_id });
        if (currentUser) {
            currentUser.total_visited = currentUser.total_visited + count;
            currentUser.save();
        }
        return true;
    }
    async create(UserData) {
        const isUserExist = await this.userModel.find({ $or: [{ 'login': UserData.login }, { 'email': UserData.email }] });
        if (isUserExist.length !== 0) {
            return { exist: true };
        }
        if (isUserExist.length === 0) {
            return await this.userModel.create({
                'login': UserData.login,
                'email': UserData.email,
                'password': await this.bcryptModel.hash(UserData.password)
            });
        }
    }
    async createNewPassword() {
        return await password();
    }
    async recoveryPassword(email) {
        const user = await this.userModel.findOne({ email: email });
        if (user) {
            const new_p = await this.createNewPassword();
            const hash = await this.bcryptModel.hash(new_p);
            user.password = hash;
            await user.save();
            await this.postService.sendPasswordRecovery(new_p, user.login, user.email);
        }
        return user;
    }
    async updateBalance(summ, _id) {
        await this.userModel.findOne({ _id: _id }, function (err, model) {
            if (!err) {
                model.balance = model.balance + summ;
                model.save();
            }
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        bcrypt_service_1.BcryptService,
        mail_service_1.PostService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map