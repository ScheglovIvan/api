import { Body, Controller, Post, Req, UseGuards, Response, Get, Render, Request, Param} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Prop } from "@nestjs/mongoose";
import { AuthenticatedGuard } from "../auth/authenticated.guard";
import { PuppeteerService } from "../parse/parse.service";
import { CreateInstaAccountDto } from "./dto/create.insta.account.dto";
import { DeleteAccountInstaDto } from "./dto/delete.insta.account.dto";
import { ParseInstaAccountDto } from "./dto/parse.insta.account.dto";
import { InstaService } from "./insta.service";


const mongoose = require('mongoose');

@Controller('instagram')
export class InstagrammController {

    constructor (private instaService: InstaService, private configService: ConfigService,private parseService: PuppeteerService) {}

    @UseGuards(AuthenticatedGuard)
    @Get('/view')
    @Render('account/list.hbs')
    async root(@Request() req) {
      const idUser = req.user._doc._id;
      const mainAccount = await this.instaService.getMainAccount(idUser);
      const accounts  = await this.instaService.getAllAccounts(idUser);
      return {bodyClass: 'application application-offset', user: req.user._doc, account: mainAccount, accounts: accounts,
      page: 'account_list', home_url: this.configService.get<string>('protocol') + this.configService.get<string>('HOME_URL')};
    }

    
    @UseGuards(AuthenticatedGuard)
    @Get('/delete/:id')
    async deleteAcc(@Param() {id}, @Request() req, @Response() resp) {
        let id_user = req.session.passport.user._doc._id;
        const r = await this.instaService.deleteAcccount(id_user, mongoose.Types.ObjectId(id));
        if(r) {
            resp.redirect('/instagram/view');
        }
    }

    
    @UseGuards(AuthenticatedGuard)
    @Get('/edit/:id')
    @Render('account/edit.hbs')
    async getAccount(@Param() {id}, @Request() req, @Response() resp) {
        let id_user = req.session.passport.user._doc._id;
        const account = await this.instaService.findAccount(id);
        if(account) {
            return {user: req.user._doc, account: account, bodyClass: 'application application-offset', home_url: this.configService.get<string>('protocol') + this.configService.get<string>('HOME_URL')};
        }
        return resp.redirect('/')
    }

    
    @UseGuards(AuthenticatedGuard)
    @Get('/setmain/:id')
    async setMain(@Param('id') id: object, @Req() req, @Response() resp): Promise<any> {
        let id_user = req.session.passport.user._doc._id;
        const r = await this.instaService.setMain(id, id_user);
        if(r) {
            resp.redirect('/');
        }
    }
    
    @Post('/add')
    @UseGuards(AuthenticatedGuard)
    async addAccount(@Body() createInstaAccountDto: CreateInstaAccountDto, @Req() req, @Response() resp) {
        let id = req.user._doc._id;
        const r = await this.instaService.createAccount(id, createInstaAccountDto);
        return resp.json(r);
    }

    @Post('/delete')
    async deleteAccount(@Body() DeleteAccountInstaDto: DeleteAccountInstaDto, @Req() req, @Response() resp) {
        let id = req.session.passport.user._doc._id;
        const r = await this.instaService.deleteAcccount(id, DeleteAccountInstaDto);
        if(r) {
            resp.redirect('/');
        }
    }

    @UseGuards(AuthenticatedGuard)
    @Post('/setcost')
    async setCostAccount(@Body() body) {
        return await this.instaService.setCostAccount(mongoose.Types.ObjectId(body.acc_id), body.account_cost);
    }

    @Post('/parse')
    async parseAccount(@Body() Body) {
        const id = mongoose.Types.ObjectId('6014842c48a6435978171b74');
        await this.parseService.parseAccountApi(id);
    }


}