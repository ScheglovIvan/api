export declare class HomeController {
    root(req: any): {
        bodyClass: string;
        user: any;
        account: number;
    };
    indexLogin(): void;
    indexRegister(): void;
    indexRecovery(req: any): {
        message: string;
        user: any;
    };
}
