import { InstaService } from "../insta/insta.service";
export declare class PaymentsController {
    private instaService;
    constructor(instaService: InstaService);
    getPagePayments(response: any, req: any): Promise<any>;
}
