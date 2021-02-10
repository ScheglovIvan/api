import { PuppeteerService } from "../parse/parse.service";
import { CustomerService } from "../users/customer/user.customer.service";
import { InstaService } from "../insta/insta.service";
import { PostService } from "../mail/mail.service";
import { StatsService } from "../statistic/stats.service";
export declare class TasksService {
    private customerService;
    private parseService;
    private instaSerivce;
    private postService;
    private statsService;
    constructor(customerService: CustomerService, parseService: PuppeteerService, instaSerivce: InstaService, postService: PostService, statsService: StatsService);
    private readonly logger;
    handleCron(): Promise<void>;
}
