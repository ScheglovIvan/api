import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare type StatsDocument = Stats & Document;
export declare class Stats {
    account_id: object;
    visited_stats: object;
    actived_stats: object;
    balance_stats: object;
    total_stats: object;
}
export declare const StatsSchema: mongoose.Schema<Document<Stats>, mongoose.Model<Document<Stats>>>;
