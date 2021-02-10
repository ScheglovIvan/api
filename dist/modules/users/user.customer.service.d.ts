import { Model } from 'mongoose';
import { BcryptService } from '../auth/bcrypt.service';
import { UsersDocument } from './user.schema';
export declare type User = any;
export declare class UserCustomerService {
    private userModel;
    private bcryptModel;
    constructor(userModel: Model<UsersDocument>, bcryptModel: BcryptService);
}
