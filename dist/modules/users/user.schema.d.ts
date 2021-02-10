import { Document } from 'mongoose';
export declare type UsersDocument = Users & Document;
export declare class Users {
    login: string;
    email: string;
    password: string;
    user_role: string;
    user_email: string;
    special_link: string;
    total_visited: number;
    total_subscribe: number;
    balance: number;
}
export declare const UsersSchema: import("mongoose").Schema<Document<Users>, import("mongoose").Model<Document<Users>>>;
