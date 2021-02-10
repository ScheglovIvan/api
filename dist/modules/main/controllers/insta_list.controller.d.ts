import { InstaService } from "src/modules/insta/insta.service";
import { ConfigService } from "@nestjs/config";
export declare class SettingsController {
    private instaService;
    private configService;
    constructor(instaService: InstaService, configService: ConfigService);
    root(req: any): Promise<{
        bodyClass: string;
        user: any;
        account: import("../../insta/insta.shcema").InstaDocument;
        accounts: import("../../insta/insta.shcema").InstaDocument[];
        page: string;
        home_url: string;
    }>;
}
