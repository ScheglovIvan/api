import * as mongoose from 'mongoose';
import { Users } from '../users/user.schema';
export declare type PaymentsDocument = Payments & Document;
export declare class Payments {
    user: Users;
    payment_id: string;
}
export declare const PaymentsSchema: mongoose.Schema<mongoose.Document<Payments>, mongoose.Model<mongoose.Document<Payments>>>;
