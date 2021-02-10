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
exports.InstaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mail_service_1 = require("../mail/mail.service");
const parse_service_1 = require("../parse/parse.service");
const stats_service_1 = require("../statistic/stats.service");
const crypt_service_1 = require("./crypt.service");
const insta_shcema_1 = require("./insta.shcema");
let InstaService = class InstaService {
    constructor(instaModel, parseService, cryptSerive, statsService, postService) {
        this.instaModel = instaModel;
        this.parseService = parseService;
        this.cryptSerive = cryptSerive;
        this.statsService = statsService;
        this.postService = postService;
    }
    async findById(id) {
        return await this.instaModel.findOne({ _id: id });
    }
    async findOne(id, CreateInstaAccountDto) {
        return await this.instaModel.findOne({ user: id, login: CreateInstaAccountDto.login });
    }
    async getMainAccount(user_id) {
        return await this.instaModel.findOne({ user: user_id, main: true });
    }
    async setCostAccount(_id, cost) {
        const account = await this.instaModel.findOne({ _id: _id });
        account.cost_subscribe = cost;
        account.save();
        return true;
    }
    async findAccount(_id) {
        return await this.instaModel.findOne({ _id: _id });
    }
    async findAccountByName(login) {
        return await this.instaModel.findOne({ login: login });
    }
    async updateVisited(count, name) {
        const account = await this.instaModel.findOne({ profile_nickname: name });
        if (account) {
            account.total_visited = account.total_visited + count;
            account.save();
        }
    }
    async updateSubscribe(count, name) {
        const account = await this.instaModel.findOne({ profile_nickname: name });
        if (account) {
            account.total_subscribe = account.total_subscribe + count;
            account.save();
        }
        return true;
    }
    async findAcccountByProfile(profile) {
        return await this.instaModel.findOne({ profile_nickname: profile });
    }
    async createAccount(user_id, CreateInstaAccountDto) {
        const accountCount = await this.getAllAccounts(user_id);
        const isExist = await this.findOne(user_id, CreateInstaAccountDto);
        let main = false;
        if (!accountCount.length) {
            main = true;
        }
        if (isExist) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: 'exist',
                message: ['Вы уже добавил учётную запись instagram'],
            }, common_1.HttpStatus.FORBIDDEN);
        }
        const resultCreate = await this.instaModel.create({
            login: CreateInstaAccountDto.login,
            password: await this.cryptSerive.cryptFunc(CreateInstaAccountDto.password),
            nickname: CreateInstaAccountDto.nickname,
            user: user_id,
            main: main
        });
        console.log(resultCreate);
        if (!resultCreate) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: ['Проверьте учётные данные и повторите попытку'],
                typeError: 'parseError',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        ;
        try {
            const t = await this.parseService.parseAccountApi(resultCreate._id);
            console.log('parse this');
            console.log(t);
            await this.statsService.createStats(resultCreate._id);
            return t;
        }
        catch (e) {
            await resultCreate.delete();
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                message: ['Проверьте учётные данные и повторите попытку'],
                typeError: 'parseError',
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAllAccounts(userid) {
        return await this.instaModel.find({ user: userid });
    }
    async setMain(_id, user_id) {
        const accounts = await this.instaModel.find({ user: user_id });
        for (const account of accounts) {
            if (_id.toString() === account._id.toString()) {
                account.main = true;
            }
            else {
                account.main = false;
            }
            await account.save();
        }
        return true;
    }
    async deleteAcccount(user_id, id) {
        const r = await this.instaModel.deleteOne({
            user: user_id,
            _id: id
        });
        if (r) {
            const allAcc = await this.instaModel.find({ user: user_id });
            if (allAcc.length) {
                allAcc[0].main = true;
                allAcc[0].save();
            }
            await this.statsService.deleteStats(id);
        }
        return r;
    }
    async parseAcccount(_id, ParseInstaAccountDto) {
        return await this.parseService.parseAccountApi(_id);
    }
    async createRemoveSubscribeLink(nickname) {
    }
    async deleteSubscribe() {
    }
    async addSubscribe(CustomerSubscribeDto, customer) {
        const account = await this.instaModel.findOne({ _id: CustomerSubscribeDto._id });
        await this.updateSubscribe(1, account.profile_nickname);
        await this.statsService.updateStat('actived_stats', account._id, { type: 'plus' });
        await this.statsService.updateStat('total_stats', account._id, { type: 'plus' });
        await this.postService.sendSuccessPayment(account.profile_nickname, CustomerSubscribeDto.nickname, CustomerSubscribeDto.email, customer, account._id);
        return await this.parseService.addBestFreind(CustomerSubscribeDto._id, CustomerSubscribeDto.nickname);
    }
};
InstaService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(insta_shcema_1.InstaAccount.name)),
    __param(1, common_1.Inject(common_1.forwardRef(() => parse_service_1.PuppeteerService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        parse_service_1.PuppeteerService,
        crypt_service_1.CryptService,
        stats_service_1.StatsService,
        mail_service_1.PostService])
], InstaService);
exports.InstaService = InstaService;
//# sourceMappingURL=insta.service.js.map