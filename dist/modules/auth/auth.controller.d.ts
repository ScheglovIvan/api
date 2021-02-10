import { LoginUserDto } from "../users/dto/user.login.dto";
import { CreateUserDto } from "../users/dto/user.register.dto";
import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    login(LoginUserDto: LoginUserDto, req: any, resp: any): Promise<any>;
    logout(req: any, res: any): Promise<any>;
    register(CreateUserDto: CreateUserDto, res: any): Promise<any>;
    registerUser(CreateUserDto: CreateUserDto, res: any): Promise<any>;
}
