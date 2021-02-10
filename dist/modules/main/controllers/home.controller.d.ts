import { InstaService } from "src/modules/insta/insta.service";
import { StatsService } from "src/modules/statistic/stats.service";
export declare class HomeController {
    private instaService;
    private statsService;
    constructor(instaService: InstaService, statsService: StatsService);
    root(req: any, resp: any, session: any): Promise<object>;
    setFilter(req: any, body: any, resp: any, session: any): Promise<any>;
    indexLogin(): void;
    indexRegister(): void;
    createAccount(): Promise<{
        bodyClass: string;
    }>;
    indexRecovery(req: any): Promise<{
        message: string;
        user: any;
    }>;
    indexSuccessRecovery(req: any): Promise<{
        message: string;
        user: any;
    }>;
    renderTest(): Promise<{}>;
}
