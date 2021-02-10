import { InstaService } from "src/modules/insta/insta.service";
import { ConfigService } from "@nestjs/config";
export declare class SettingsController {
    private instaService;
    private configService;
    constructor(instaService: InstaService, configService: ConfigService);
    root(req: any): Promise<object>;
}
