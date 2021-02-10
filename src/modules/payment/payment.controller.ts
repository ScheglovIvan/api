import { Controller, Get, Render, Response, Request, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "../auth/authenticated.guard";
import { InstaService } from "../insta/insta.service";



@Controller('payments')
export class PaymentsController {

    constructor (private instaService: InstaService) {}

    @UseGuards(AuthenticatedGuard)
    @Get('owner')
    @Render('payments/payments_owner.hbs')
    async getPagePayments(@Response() response, @Request() req): Promise<any> {
        const idUser = req.user._doc._id;
        const userMainAccount = await this.instaService.getMainAccount(idUser);
        if(!userMainAccount) {
            return response.redirect('/create');
        }
        return {page: 'payments_owner', bodyClass: 'application application-offset', account: userMainAccount, user: req.user._doc};
    }
}
