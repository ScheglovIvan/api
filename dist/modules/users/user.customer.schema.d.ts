import { Document } from 'mongoose';
import { Users } from './user.schema';
export declare type CustomerDocument = CustomerSchema & Document;
export declare class CustomerSchema {
    login: string;
    email: string;
    user_invited: Users;
    purchases: object;
}
