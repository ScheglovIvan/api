import { Body, Controller, Get, Post, Render, Request, Param, Response, Req, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { InstaService } from '../insta/insta.service';
import { CryptService } from '../insta/crypt.service';
import { CustomerSubscribeDto } from './customer/dto/customer.subsctibe.dto';
import { CustomerService } from './customer/user.customer.service';
import { PuppeteerService } from '../parse/parse.service';
import { StatsService } from '../statistic/stats.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

@Controller('user')
export class UserController {

    constructor(private userService: UserService, private customerService: CustomerService, private instaService: InstaService, 
        private cryptSerivce: CryptService,
        private parseService: PuppeteerService,
        private statService: StatsService,
        ) {}

    @Get('subscribe/:name')
    @Render('users/new_subscribe.hbs')
    async createPaymentPage(@Request() req, @Param() {name}): Promise<any> {
        const userOwner = await this.instaService.findAcccountByProfile(name);
        if(userOwner) {
            await this.userService.updateVisited(1, userOwner.user);
            await this.instaService.updateVisited(1, name);
            await this.statService.updateStat('visited_stats', userOwner._id, {type: 'plus'});
        }
        return {bodyClass: 'application application-offset', owner: userOwner}
    }

    @Get('customer/success')
    @Render('users/success_subscribe.hbs')
    async renderSuccessSubscribe() {
        return {bodyClass: 'application application-offset'}
    }

    @UseGuards(AuthenticatedGuard)
    @Get('customer')
    @Render('users/customer_list.hbs')
    async renderCustomerList(@Req() req, @Response() resp, @Query('p') page: number): Promise<object> {

        const idUser = req.user._doc._id;
        const userMainAccount = await this.instaService.getMainAccount(idUser);
        const relatedUsers = await this.customerService.getCustomers(idUser, page);

        if(!userMainAccount) {
            return resp.redirect('/create');
        }
        return {
             data: relatedUsers.data,
             bodyClass: 'application application-offset',
             page: 'customer_list',
             account: userMainAccount,
             user: req.user._doc,
             pagination: {
                page: page,       // The current page the user is on
                pageCount: relatedUsers.count  // The total number of available pages
             }
        }
    }

    @Post('subscribe')
    async subscribeUser(@Body() customerSubscribeDto: CustomerSubscribeDto, @Response() resp): Promise<any> {

        console.log(customerSubscribeDto);

        const client = await this.customerService.createCustomer(customerSubscribeDto);

        console.log(client);

        const r = await this.instaService.addSubscribe(customerSubscribeDto, client._id);

        if(r) {
             resp.redirect('/user/customer/success')
        }
    }

    @Post('testsubscribe')
    async subscribeUserTest(@Body() CustomerSubscribeDto: CustomerSubscribeDto, @Response() resp): Promise<any> {
        const user = await this.customerService.createCustomer(CustomerSubscribeDto);
    }

    @Post('unsubsctibe')
    async unsubscribeTest(@Body() nickname: string, account: object) {
        return await this.parseService.unSubscribeUser(nickname, account);
    }

    @Get('unsubsctibe')
    async unsubscribeRender(@Param('id') id) {
        // return await this.parseService.unSubscribeUser(nickname, account);
    }

    @Get('/recovery')
    @Render('users/recovery_password.hbs')
    async renderRecovery() {
        return {}
    }

    @Post('/recovery')
    async recoveryPassword(@Body() body, @Response() resp) {
        const {email} = body;
        if(email) {
            const r = await this.userService.recoveryPassword(email);
            // if(r) {
            //     throw
            // }
        }
        return resp.redirect('recovery')
    }


    @Get('cancel_subscribe')
    async cancelSubsctibe(@Query() query, @Response() resp): Promise<any> {
        const r = await this.customerService.removeSubscribe(query.account, query.customer);
        if(r) {
            resp.redirect('cancel_subscribe_success');
        }
    }

    @Get('cancel_subscribe_success')
    @Render('users/success_cancel.hbs')
    async renderCancelSuccess() {
        return {};
    }

}