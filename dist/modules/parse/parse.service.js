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
exports.PuppeteerService = void 0;
const common_1 = require("@nestjs/common");
const puppeteer = require('puppeteer');
const insta_service_1 = require("../insta/insta.service");
const instagram_private_api_1 = require("instagram-private-api");
const crypt_service_1 = require("../insta/crypt.service");
const config_1 = require("@nestjs/config");
let PuppeteerService = class PuppeteerService {
    constructor(instaService, cryptService, configService) {
        this.instaService = instaService;
        this.cryptService = cryptService;
        this.configService = configService;
    }
    async parseAccountApi(_id) {
        const account = await this.instaService.findById(_id);
        console.log(account);
        if (account) {
            const ig = new instagram_private_api_1.IgApiClient();
            await ig.state.generateDevice(account.nickname);
            const passwordAccount = await this.cryptService.decryptFunc(account.password);
            console.log(passwordAccount);
            const loggedInUser = await ig.account.login(account.login, passwordAccount);
            try {
                console.log(loggedInUser);
            }
            catch (e) {
                console.log(e);
            }
            if (loggedInUser.pk) {
                account.profile_avatar_url = loggedInUser.profile_pic_url;
                account.profile_url = `https://instagram.com/${loggedInUser.username}`;
                account.profile_name = loggedInUser.full_name;
                account.profile_nickname = loggedInUser.username;
                account.profile_number = loggedInUser.phone_number;
                await account.save();
            }
            return { result: true };
        }
        else {
            console.log('account false');
            return { result: true };
        }
    }
    async findUserByName(name) {
        name = name.replace(/\s/g, '');
        const instaLogin = await this.configService.get('INSTA_LOGIN');
        const instaPassword = await this.configService.get('INSTA_PASSWORD');
        const instaName = await this.configService.get('INSTA_NAME');
        const ig = new instagram_private_api_1.IgApiClient();
        await ig.state.generateDevice(instaName);
        const loggedInUser = await ig.account.login(instaLogin, instaPassword);
        const user_search = await ig.user.search(name.trim());
        const user = user_search.users.filter(user => user.username.toString() === name.toString())[0];
        return user;
    }
    async addBestFreind(_id, login) {
        const account = await this.instaService.findById({ _id });
        if (account) {
            const ig = new instagram_private_api_1.IgApiClient();
            try {
                await ig.state.generateDevice(account.profile_nickname);
                const loggedInUser = await ig.account.login(account.login, await this.cryptService.decryptFunc(account.password));
                const userId = await ig.user.getIdByUsername(login);
                await ig.friendship.setBesties({ add: [userId] });
            }
            catch (e) {
                throw new Error(e);
            }
        }
        return true;
    }
    async unSubscribeUser(nickname, account) {
        const accountFound = await this.instaService.findById({ _id: account });
        try {
            if (accountFound) {
                const ig = new instagram_private_api_1.IgApiClient();
                await ig.state.generateDevice(accountFound.profile_nickname);
                const loggedInUser = await ig.account.login(accountFound.login, await this.cryptService.decryptFunc(accountFound.password));
                if (loggedInUser) {
                    const userId = await ig.user.getIdByUsername(nickname);
                    await ig.friendship.setBesties({ remove: [userId] });
                }
            }
            return true;
        }
        catch (e) {
            throw new Error(e);
        }
    }
};
PuppeteerService = __decorate([
    __param(0, common_1.Inject(common_1.forwardRef(() => insta_service_1.InstaService))),
    __metadata("design:paramtypes", [insta_service_1.InstaService, crypt_service_1.CryptService, config_1.ConfigService])
], PuppeteerService);
exports.PuppeteerService = PuppeteerService;
//# sourceMappingURL=parse.service.js.map