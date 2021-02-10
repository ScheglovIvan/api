import { InstaService } from '../insta/insta.service';
import { CryptService } from "../insta/crypt.service";
import { ConfigService } from "@nestjs/config";
export declare class PuppeteerService {
    private instaService;
    private cryptService;
    private configService;
    constructor(instaService: InstaService, cryptService: CryptService, configService: ConfigService);
    parseAccountApi(_id: object): Promise<{
        result: boolean;
    }>;
    findUserByName(name: string): Promise<any>;
    addBestFreind(_id: object, login: string): Promise<boolean>;
    unSubscribeUser(nickname: string, account: object): Promise<any>;
}
