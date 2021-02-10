import { Controller, Get, Post } from "@nestjs/common";
import { PostService } from "./mail.service";

@Controller('mail')
export class MailController {

    constructor (private postService: PostService) {}

    @Get('test')
    public async sendMailGet() {
        await this.postService.sendPasswordRecovery('lalala', 'blablbla', '123@gmail.com');
    }

    // @Post('test_success')
    // public async sendSuccess() {
    //     await this.postService.sendSuccessPayment('lalala', 'blablbla', 'test@gmail.com');
    // }


}