import { PassportSerializer } from "@nestjs/passport";
import { User, UserService } from "../users/user.service";
import { AuthService } from "./auth.service";
export declare class LocalSerializer extends PassportSerializer {
    private readonly authService;
    private readonly userRepository;
    constructor(authService: AuthService, userRepository: UserService);
    serializeUser(user: User, done: CallableFunction): void;
    deserializeUser(userId: string, done: CallableFunction): Promise<any>;
}
