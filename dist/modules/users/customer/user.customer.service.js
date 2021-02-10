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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const insta_service_1 = require("../../insta/insta.service");
const parse_service_1 = require("../../parse/parse.service");
const bcrypt_service_1 = require("../../auth/bcrypt.service");
const user_customer_schema_1 = require("./user.customer.schema");
const moment = require("moment");
const stats_service_1 = require("../../statistic/stats.service");
const user_service_1 = require("../user.service");
let CustomerService = class CustomerService {
    constructor(customerUserModel, instaService, bcryptModel, parseService, statsService, userService) {
        this.customerUserModel = customerUserModel;
        this.instaService = instaService;
        this.bcryptModel = bcryptModel;
        this.parseService = parseService;
        this.statsService = statsService;
        this.userService = userService;
    }
    async existUser(name) {
        return await this.customerUserModel.findOne({ profile_nickname: name });
    }
    async getCustomers(_id, page = 1) {
        const data = await this.customerUserModel.find({ user_invited: _id, }).limit(25).skip(25 * (page - 1));
        const count = await this.customerUserModel.find({ user_invited: _id, }).count();
        return { data: data, count: Math.round(count / 25) };
    }
    async removeSubscribe(account_id, customer_id) {
        const account = await this.instaService.findById(account_id);
        const customer = await this.customerUserModel.findOne({ _id: customer_id });
        if (account && customer) {
            await this.parseService.unSubscribeUser(customer.profile_nickname, account_id);
            customer.purchases = customer.purchases.filter(v => v.account_id.toString() !== account_id.toString());
            await customer.save();
            await this.statsService.updateStat('actived_stats', customer.account_invited, { type: 'minus' });
        }
        return true;
    }
    async addSubscribe(source, target, data) {
        const customer = await this.customerUserModel.findOne({ _id: source });
        try {
            if (customer) {
                if (!customer.purchases || !customer.purchases.length) {
                    customer.purchases = [data];
                }
                else if (customer.purchases && customer.purchases.length) {
                    const currentData = customer.purchases;
                    customer.purchases = [...customer.purchases, data];
                }
                await customer.save();
                return customer;
            }
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async getAll() {
        return await this.customerUserModel.find();
    }
    async createCustomer(customerSubscribeDto) {
        const existUser = await this.existUser(customerSubscribeDto.nickname);
        const account = await this.instaService.findById(customerSubscribeDto._id);
        let r;
        if (!existUser) {
            const account = await this.instaService.findById(customerSubscribeDto._id);
            const infoUser = await this.parseService.findUserByName(customerSubscribeDto.nickname);
            const u_created = await this.customerUserModel.create({
                profile_nickname: infoUser.username,
                email: customerSubscribeDto.email,
                profile_name: (infoUser.full_name) ? infoUser.full_name : null,
                profile_avatar_url: infoUser.profile_pic_url,
                user_invited: account.user,
                account_invited: account._id,
            });
            const t = await this.addSubscribe(u_created._id, account._id, {
                startedAt: moment(new Date()),
                endAt: moment(new Date()).add(25, 'minutes'),
                account_id: account._id,
                active: true,
            });
            r = t;
        }
        if (existUser) {
            const t = await this.addSubscribe(existUser._id, account._id, {
                startedAt: moment(new Date()),
                endAt: moment(new Date()).add(25, 'minutes'),
                account_id: account._id,
                active: true,
            });
            r = t;
        }
        try {
            const balance_update = account.cost_subscribe - (account.cost_subscribe * 20 / 100);
            await this.userService.updateBalance(balance_update, account.user);
            await this.statsService.updateStat('balance_stats', account._id, { type: 'plus', value: balance_update, model: 'balance' });
        }
        catch (e) {
            throw new Error(e);
        }
        return r;
    }
};
CustomerService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_customer_schema_1.Customer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        insta_service_1.InstaService,
        bcrypt_service_1.BcryptService,
        parse_service_1.PuppeteerService,
        stats_service_1.StatsService,
        user_service_1.UserService])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=user.customer.service.js.map