import { PostService } from "./mail.service";
export declare class MailController {
    private postService;
    constructor(postService: PostService);
    sendMailGet(): Promise<void>;
}
