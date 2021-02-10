import { Controller, Get, Render, UseGuards, Request} from "@nestjs/common";
import { InstaService } from "src/modules/insta/insta.service";
import { AuthenticatedGuard } from "../../auth/authenticated.guard";
import { ConfigService } from "@nestjs/config";

@Controller()
export class SettingsController {

    constructor (private instaService: InstaService, private configService: ConfigService) {}

    @UseGuards(AuthenticatedGuard)
    @Get('/settings')
    @Render('settings/settings.hbs')
    async root(@Request() req): Promise<object> {
      const idUser = req.user._doc._id;
      const mainAccount = await this.instaService.getMainAccount(idUser);
      const accounts  = await this.instaService.getAllAccounts(idUser); 
      return {bodyClass: 'application application-offset', user: req.user._doc, account: mainAccount, accounts: accounts, 
      page: 'settings', home_url: this.configService.get<string>('protocol') + this.configService.get<string>('HOME_URL')};
    }

}