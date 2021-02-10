import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Users } from '../user.schema';
export declare type CustomerDocument = Customer & Document;
export declare class Customer {
    profile_nickname: string;
    email: string;
    profile_name: string;
    profile_avatar_url: string;
    is_active: boolean;
    user_invited: Users;
    account_invited: object;
    purchases: Array<any>;
}
export declare const UserCustomerSchema: mongoose.Schema<Document<Customer>, mongoose.Model<Document<Customer>>>;
