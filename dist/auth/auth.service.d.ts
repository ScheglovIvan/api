import { UserService } from 'src/modules/users/user.service';
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    validateUser(username: string, pass: string): Promise<any>;
}
