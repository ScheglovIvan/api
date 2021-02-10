import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { BcryptService } from './bcrypt.service';
export declare class AuthService {
    private userService;
    private jwtService;
    private bcryptService;
    constructor(userService: UserService, jwtService: JwtService, bcryptService: BcryptService);
    validateUser(login: string, password: string): Promise<any>;
    createToken(user: any): Promise<{
        id: any;
        email: any;
        login: any;
        access_token: string;
    }>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    recovery(): Promise<void>;
}
