import { forwardRef, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { join } from "path";
import { ParseInstaAccountDto } from "../insta/dto/parse.insta.account.dto";
const puppeteer = require('puppeteer');
import { InstaService } from '../insta/insta.service';
import { IgApiClient } from 'instagram-private-api';
import { CryptService } from "../insta/crypt.service";
import { ConfigService } from "@nestjs/config";

export class PuppeteerService {

    constructor (@Inject(forwardRef(() => InstaService)) private instaService: InstaService, private cryptService: CryptService, private configService: ConfigService) {}

    async parseAccountApi(_id: object) {

        const account = await this.instaService.findById(_id);
        console.log(account);

        if(account) {
            const ig = new IgApiClient();
            await ig.state.generateDevice(account.nickname);
            // ig.state.proxyUrl = 'http://139.162.1.237';
            // ig.request.defaults.agentOptions = {
            //     // @ts-ignore
            //     hostname: '161.35.70.249', // proxy hostname
            //     port: 1080, // proxy port
            //     protocol: 'socks5:', // supported: 'socks:' , 'socks4:' , 'socks4a:' , 'socks5:' , 'socks5h:'
            //     //username: 'myProxyUser', // proxy username, optional
            //     //password: 'myProxyPassword123', // proxy password, optional
            // };
            const passwordAccount = await this.cryptService.decryptFunc(account.password);
            console.log(passwordAccount);
            const loggedInUser = await ig.account.login(account.login, passwordAccount);
            try {
                console.log(loggedInUser);
            } catch (e) {
                console.log(e);
            }
            if(loggedInUser.pk) {
                account.profile_avatar_url = loggedInUser.profile_pic_url;
                account.profile_url = `https://instagram.com/${loggedInUser.username}`
                account.profile_name = loggedInUser.full_name;
                account.profile_nickname = loggedInUser.username;
                account.profile_number  = loggedInUser.phone_number;
                await account.save();
            }
            return {result: true};
        }

        else {
            console.log('account false');
            return {result: true};
        }


    }

    async findUserByName(name: string): Promise<any> {

        name = name.replace(/\s/g, '');
        const instaLogin = await this.configService.get<string>('INSTA_LOGIN');
        const instaPassword = await this.configService.get<string>('INSTA_PASSWORD');
        const instaName = await this.configService.get<string>('INSTA_NAME');
        const ig = new IgApiClient();
        await ig.state.generateDevice(instaName);
        const loggedInUser = await ig.account.login(instaLogin, instaPassword);
        const user_search = await ig.user.search(name.trim());

        const user  =  user_search.users.filter(user => user.username.toString() === name.toString())[0];
        return user;

    }

    async addBestFreind(_id: object, login: string) {

        const account = await this.instaService.findById({_id});
        if(account) {
            const ig = new IgApiClient();
            try {
                await ig.state.generateDevice(account.profile_nickname);
                const loggedInUser = await ig.account.login(account.login, await this.cryptService.decryptFunc(account.password));
                const userId = await ig.user.getIdByUsername(login);
                await ig.friendship.setBesties({add: [userId]})
            } catch (e) {
                throw new Error(e);
            }
        }
        return true;
    }

    async unSubscribeUser(nickname: string, account: object): Promise<any> {

        const accountFound =  await this.instaService.findById({_id: account});
        try {
            if(accountFound) {
                const ig = new IgApiClient();
                await ig.state.generateDevice(accountFound.profile_nickname);
                    const loggedInUser = await ig.account.login(accountFound.login, await this.cryptService.decryptFunc(accountFound.password));
                    if(loggedInUser) {
                        const userId = await ig.user.getIdByUsername(nickname);
                        await ig.friendship.setBesties({remove: [userId]})
                    }
            }
            return true;
        } catch (e) {
            throw new Error(e);
        }
    }
}