import * as mongoose from 'mongoose';
import { Users } from '../users/user.schema';
import { Document } from 'mongoose';
export declare type InstaDocument = InstaAccount & Document;
export declare class InstaAccount {
    login: string;
    password: string;
    nickname: string;
    user: Users;
    profile_url: string;
    profile_avatar_url: string;
    profile_name: string;
    profile_nickname: string;
    profile_number: string;
    cost_subscribe: number;
    total_visited: number;
    main: boolean;
    total_subscribe: number;
    special_link: string;
    created_at: Date;
}
export declare const InstaSchema: mongoose.Schema<mongoose.Document<InstaAccount>, mongoose.Model<mongoose.Document<InstaAccount>>>;
