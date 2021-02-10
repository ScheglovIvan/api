import { Model } from "mongoose";
import { InstaDocument } from "../insta/insta.shcema";
import { CustomerDocument } from "../users/customer/user.customer.schema";
import { UsersDocument } from "../users/user.schema";
import { StatsGetDto } from "./stats.get.dto";
import { StatsDocument } from "./stats.schema";
export declare class StatsService {
    private userModel;
    private accountModel;
    private customerModel;
    private statsModel;
    constructor(userModel: Model<UsersDocument>, accountModel: Model<InstaDocument>, customerModel: Model<CustomerDocument>, statsModel: Model<StatsDocument>);
    months: Array<string>;
    getActiveSubscribe(statsGetDto: StatsGetDto): Promise<any>;
    updateStat(type: string, account_id: object, options: any): Promise<void>;
    getStats(account_id: object, type: string): Promise<object>;
    createStats(account_id: object): Promise<StatsDocument>;
    deleteStats(account_id: object): Promise<any>;
}
