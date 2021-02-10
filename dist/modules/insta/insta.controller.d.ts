import { ConfigService } from "@nestjs/config";
import { PuppeteerService } from "../parse/parse.service";
import { CreateInstaAccountDto } from "./dto/create.insta.account.dto";
import { DeleteAccountInstaDto } from "./dto/delete.insta.account.dto";
import { InstaService } from "./insta.service";
export declare class InstagrammController {
    private instaService;
    private configService;
    private parseService;
    constructor(instaService: InstaService, configService: ConfigService, parseService: PuppeteerService);
    root(req: any): Promise<{
        bodyClass: string;
        user: any;
        account: any;
        accounts: any;
        page: string;
        home_url: string;
    }>;
    deleteAcc({ id }: {
        id: any;
    }, req: any, resp: any): Promise<void>;
    getAccount({ id }: {
        id: any;
    }, req: any, resp: any): Promise<any>;
    setMain(id: object, req: any, resp: any): Promise<any>;
    addAccount(createInstaAccountDto: CreateInstaAccountDto, req: any, resp: any): Promise<any>;
    deleteAccount(DeleteAccountInstaDto: DeleteAccountInstaDto, req: any, resp: any): Promise<void>;
    setCostAccount(body: any): Promise<any>;
    parseAccount(Body: any): Promise<void>;
}
