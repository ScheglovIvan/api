import { Controller, Get, Render, UseGuards, Request, Response, Post, Req, Body, Session, UseFilters} from "@nestjs/common";
import { stat } from "fs";
import { HttpExceptionFilter } from "src/filters/http-exception.filter";
import { InstaService } from "src/modules/insta/insta.service";
import { StatsService } from "src/modules/statistic/stats.service";
import { AuthenticatedGuard } from "../../auth/authenticated.guard";

@Controller()
export class HomeController {

    constructor (private instaService: InstaService, private statsService: StatsService) {}


    @Get('/')
    @UseFilters(new HttpExceptionFilter())
    @UseGuards(AuthenticatedGuard)
    @Render('home/home.hbs')
    async root(@Request() req, @Response() resp, @Session() session): Promise<object> {
      const idUser = req.user._doc._id;
      const userMainAccount = await this.instaService.getMainAccount(idUser);
      const allAccounts = await this.instaService.getAllAccounts(idUser);

      let filterType = session.type_filter;
      if(!filterType) {
        filterType = 'year';
      }

      if(!userMainAccount || !allAccounts.length) {
        return resp.redirect('/create');
      }

      const stats: object = await this.statsService.getStats(userMainAccount._id, filterType);
      return {type_filter: filterType, bodyClass: 'application application-offset', stats: stats, user: req.user._doc, account: userMainAccount, page: 'home', accounts: allAccounts};
    }

    @Post('/setfilter')
    async setFilter(@Req() req, @Body() body, @Response() resp, @Session() session): Promise<any> {
          session.type_filter = body.type_filter;
          return resp.redirect('/');
    }

    @Get('/login')
    @Render('auth/login.hbs')
    indexLogin() {}

    @Get('/register')
    @Render('auth/register.hbs')
    indexRegister() {}

    @Get('/create')
    @Render('partials/add_insta.hbs')
    async createAccount() {
        return {bodyClass: 'application application-offset'};
    }

    @Get('/recovery')
    @Render('auth/recovery.hbs')
    async indexRecovery(@Request() req) {
        return {message: '', user: req.user}
    }

    @Get('/success_recovery')
    @Render('auth/see_mail.hbs')
    async indexSuccessRecovery(@Request() req) {
      return {message: '', user: req.user}
    }

    @Get('/test')
    @Render('test.hbs')
    async renderTest() {
      return {};
    }

    // @Get('/new_password')
    // indexSuccessRecovery(@Request() req) {
    //   return {message: '', user: req.user}
    // }

}