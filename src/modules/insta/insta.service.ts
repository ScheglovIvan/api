import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { parse } from "path";
import { PostService } from "../mail/mail.service";
import { PuppeteerService } from "../parse/parse.service";
import { StatsService } from "../statistic/stats.service";
import { CustomerSubscribeDto } from "../users/customer/dto/customer.subsctibe.dto";
import { CryptService } from "./crypt.service";
import { CreateInstaAccountDto } from "./dto/create.insta.account.dto";
import { DeleteAccountInstaDto } from "./dto/delete.insta.account.dto";
import { ParseInstaAccountDto } from "./dto/parse.insta.account.dto";
import { InstaAccount, InstaSchema, InstaDocument } from './insta.shcema';


@Injectable()
export class InstaService {

    constructor(@InjectModel(InstaAccount.name) private instaModel: Model<InstaDocument>,
    @Inject(forwardRef(() => PuppeteerService)) private parseService: PuppeteerService,
    private cryptSerive: CryptService,
    private statsService: StatsService,
    private postService: PostService
    ) {}

    async findById(id: object): Promise<any> {
        return await this.instaModel.findOne({_id: id});
    }

    async findOne(id: object, CreateInstaAccountDto: CreateInstaAccountDto): Promise<any> {
        return await this.instaModel.findOne({user: id, login: CreateInstaAccountDto.login});
    }

    async getMainAccount(user_id: object): Promise<any> {
        return await this.instaModel.findOne({user: user_id, main: true});
    }

    async setCostAccount(_id: object, cost: number): Promise<any> {
        const account = await this.instaModel.findOne({_id: _id});
        account.cost_subscribe = cost;
        account.save();
        return true;
    }

    async findAccount(_id: object): Promise<any> {
        return await this.instaModel.findOne({_id: _id});
    }

    async findAccountByName(login: string): Promise<any> {
        return await this.instaModel.findOne({login: login});
    }

    async updateVisited(count: number, name: string): Promise<any> {
        const account = await this.instaModel.findOne({profile_nickname: name});
        if(account) {
            account.total_visited = account.total_visited + count;
            account.save();
        }
    }

    async updateSubscribe(count: number, name: string): Promise<any> {
        const account = await this.instaModel.findOne({profile_nickname: name});
        if(account) {
            account.total_subscribe = account.total_subscribe + count;
            account.save();
        }
        return true;
    }

    async findAcccountByProfile(profile: string) {
        return await this.instaModel.findOne({profile_nickname: profile})
    }

    async createAccount(user_id: object, CreateInstaAccountDto: CreateInstaAccountDto): Promise<any> {

        const accountCount = await this.getAllAccounts(user_id);
        const isExist = await this.findOne(user_id, CreateInstaAccountDto);
        let main = false;

        if(!accountCount.length) {
            main = true;
        }

        if(isExist) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'exist',
                message: ['Вы уже добавил учётную запись instagram'],
            }, HttpStatus.FORBIDDEN);
        }

        const resultCreate = await this.instaModel.create({
            login: CreateInstaAccountDto.login,
            password: await this.cryptSerive.cryptFunc(CreateInstaAccountDto.password),
            nickname: CreateInstaAccountDto.nickname,
            user: user_id,
            main: main
        });

        console.log(resultCreate);

        if(!resultCreate) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: ['Проверьте учётные данные и повторите попытку'],
                typeError: 'parseError',
            }, HttpStatus.BAD_REQUEST);
        };

        try {
            const t = await this.parseService.parseAccountApi(resultCreate._id);
            console.log('parse this');
            console.log(t);
            await this.statsService.createStats(resultCreate._id);
            return t;
        } catch (e) {
            await resultCreate.delete();
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                message: ['Проверьте учётные данные и повторите попытку'],
                typeError: 'parseError',
            }, HttpStatus.BAD_REQUEST);
        }

    }

    async getAllAccounts(userid: object): Promise<any> {
        return await this.instaModel.find({user: userid});
    }

    async setMain(_id: object, user_id: object) {

        const accounts = await this.instaModel.find({user: user_id});

        for(const account of accounts) {
            if(_id.toString() === account._id.toString()) {
                account.main = true;
            }
            else {
                account.main = false;
            }
            await account.save();
        }
        return true;
    }

    async deleteAcccount(user_id: object, id: object): Promise<any> {

        const r = await this.instaModel.deleteOne({
            user: user_id,
            _id: id
        });

        if(r) {
            const allAcc = await this.instaModel.find({user: user_id});
            if(allAcc.length) {
                allAcc[0].main = true;
                allAcc[0].save();
            }
            await this.statsService.deleteStats(id);
        }

        return r;
    }

    async parseAcccount(_id: object, ParseInstaAccountDto: ParseInstaAccountDto): Promise<any> {
        return await this.parseService.parseAccountApi(_id);
    }

    async createRemoveSubscribeLink(nickname, ) {
        
    }

    async deleteSubscribe() {

    }

    async addSubscribe(CustomerSubscribeDto: CustomerSubscribeDto, customer: any): Promise<any> {

        const account = await this.instaModel.findOne({_id: CustomerSubscribeDto._id});
        await this.updateSubscribe(1, account.profile_nickname);
        await this.statsService.updateStat('actived_stats', account._id, {type: 'plus'});
        await this.statsService.updateStat('total_stats', account._id, {type: 'plus'});
        await this.postService.sendSuccessPayment(account.profile_nickname, CustomerSubscribeDto.nickname, CustomerSubscribeDto.email, customer, account._id);

        return await this.parseService.addBestFreind(CustomerSubscribeDto._id, CustomerSubscribeDto.nickname);
    }
}