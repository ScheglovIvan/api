import { Model } from 'mongoose';
import { BcryptService } from '../auth/bcrypt.service';
import { CreateUserDto } from './dto/user.register.dto';
import { UsersDocument } from './user.schema';
import { PostService } from '../mail/mail.service';
export declare type User = any;
export declare class UserService {
    private userModel;
    private bcryptModel;
    private postService;
    constructor(userModel: Model<UsersDocument>, bcryptModel: BcryptService, postService: PostService);
    findOne(LoginUserDto: any): Promise<User | undefined>;
    findLogin(login: string): Promise<User | undefined>;
    updateVisited(count: number, user_id: object): Promise<any>;
    updateSubscribe(count: number, user_id: object): Promise<any>;
    create(UserData: CreateUserDto): Promise<any>;
    private createNewPassword;
    recoveryPassword(email: string): Promise<UsersDocument>;
    updateBalance(summ: number, _id: object): Promise<void>;
}
