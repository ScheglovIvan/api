import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { count } from "console";
import { Model } from "mongoose";
import { InstaAccount, InstaDocument } from "../insta/insta.shcema";
import { Customer, CustomerDocument } from "../users/customer/user.customer.schema";
import { Users, UsersDocument } from "../users/user.schema";
import { StatsGetDto } from "./stats.get.dto";
import { StatsDocument, Stats } from "./stats.schema";
import * as moment from 'moment';
import { stat } from "fs";
import { query } from "express";

@Injectable()
export class StatsService {

    constructor(@InjectModel(Users.name) private userModel: Model<UsersDocument>,
    @InjectModel(InstaAccount.name) private accountModel: Model<InstaDocument>,
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    @InjectModel(Stats.name) private statsModel: Model<StatsDocument>
    ) {}

    public months: Array<string> = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    async getActiveSubscribe(statsGetDto: StatsGetDto): Promise<any> {

        const customersByUser = await this.customerModel.find({user_invited: statsGetDto.user_id});
        let count = 0;
        let countTotal = 0;

        if(customersByUser) {
            for(const customer of customersByUser) {
                countTotal = countTotal + customer.purchases.length;
                if(customer.purchases && customer.purchases.length) {
                    for(let i = 0; i < customer.purchases.length; i++) {
                        if(customer.purchases[i].active) {
                            ++count;
                        }
                    }
                }
            }
        }
        // return customersByUser;
        return {activeSubscribeCount: count, totalActiveSubscribe: countTotal}
    }

    async updateStat(type: string, account_id: object, options: any) {

        const statModel = await this.statsModel.findOne({account_id: account_id});

        const date = moment().month();
        const year = moment().year();

        const keys = Object.keys(statModel[type]);
        const month = keys[date];

        for(const prop in statModel[type]) {
            if(month.toLowerCase() === prop.toLowerCase()) {
                if(options.type === 'plus' && options.model !== 'balance') {
                    statModel[type][prop].count = statModel[type][prop].count + 1;
                }
                if(options.type === 'minus' && options.model !== 'balance') {
                    if(statModel[type][prop].count - 1 < 0) {
                        statModel[type][prop].count = 0;
                    }
                    else {
                        statModel[type][prop].count = statModel[type][prop].count - 1;
                    }
                }
                if(options.model === 'balance' && options.value) {
                    statModel[type][prop].count = statModel[type][prop].count + parseInt(options.value);
                }
            }
        }

        await this.statsModel.findOneAndUpdate({_id: statModel._id}, statModel);

    }

    async getStats(account_id: object, type: string): Promise<object> {

        const account = await this.statsModel.findOne({account_id: account_id});
        const account_insta = await this.accountModel.findOne({_id: account_id});
        const account_cost = account_insta.cost_subscribe;

        if(account) {

            const date: number = moment().month();
            const year: number = moment().year();
            const data = {};

            const month = this.months[date];
            let prevMonth: string;

            if(date === 0) {
                prevMonth = this.months[11];
            }
            else {
                prevMonth = this.months[date - 1];
            }

            if(type === 'year') {

                let year_balance:number = 0;
                let year_total:number = 0;
                let year_active: number = 0;
                let year_visited: number = 0;
                let graph_followers: Array<number> = [];
                let profit_stats: Array<number> = [];

                for(const value in account.balance_stats) {
                    year_balance += account.balance_stats[value].count;
                    profit_stats.push(account.balance_stats[value].count);
                }

                for(const value in account.total_stats) {
                    year_total += account.total_stats[value].count;
                    graph_followers.push(account.total_stats[value].count);
                }

                for(const value in account.actived_stats) {
                    year_active += account.actived_stats[value].count;
                }

                for(const value in account.visited_stats) {
                    year_visited += account.visited_stats[value].count;
                }

                return {
                    balance: {
                        value: year_balance,
                    },
                    total_acc: {
                        value: year_total,
                    },
                    active_acc: {
                        value: year_active,
                    },
                    visited: {
                        value: year_visited,
                    },
                    graph_followers: graph_followers,
                    profit_stats: profit_stats.join(','),
                    profit: {
                       value: year_balance
                    },
                }
            }

            if(type === 'month') {

                let graph_followers: Array<number> = new Array();

                for(const value in account.total_stats) {
                    graph_followers.push(account.total_stats[value].count);
                }

                return {
                    balance: {
                        value: account.balance_stats[month].count,
                        last:  (account.balance_stats[prevMonth].count) ? Math.round((account.balance_stats[month].count - account.balance_stats[prevMonth].count) / account.balance_stats[prevMonth].count * 100) : '',
                    },
                    total_acc: {
                        value: account.total_stats[month].count,
                        last:  (account.total_stats[prevMonth].count) ? Math.round((account.total_stats[month].count - account.total_stats[prevMonth].count) / account.total_stats[prevMonth].count * 100) : '',
                    },
                    active_acc: {
                        value: account.actived_stats[month].count,
                        last:  (account.actived_stats[prevMonth].count) ? Math.round((account.actived_stats[month].count - account.actived_stats[prevMonth].count) / account.actived_stats[prevMonth].count * 100) : '',
                    },
                    visited: {
                        value: account.visited_stats[month].count,
                        last:  (account.visited_stats[prevMonth].count) ? Math.round((account.visited_stats[month].count -
                            account.visited_stats[prevMonth].count) / account.visited_stats[prevMonth].count * 100) : '',
                    },
                    sales: {
                        value:  account_cost * account.total_stats[month].count - ((account_cost * account.total_stats[month].count) * 20 / 100),
                        last: (account_cost * account.total_stats[prevMonth].count) ? Math.round((account_cost * account.total_stats[month].count - account_cost * account.total_stats[prevMonth].count) / account_cost * account.total_stats[prevMonth].count * 100) : '',
                        array: [],
                    },
                    graph_followers: graph_followers
                }
            }
        }
    }

    async createStats(account_id: object) {

        const data = {};
        for(const month of this.months) {
            data[month] = {
                count: 0,
            }
        }

        return await this.statsModel.create({
            account_id: account_id,
            visited_stats: data,
            actived_stats: data,
            balance_stats: data,
            total_stats: data,
            gain_stats: data,
            salses_stats: data,
        });

    }

    async deleteStats(account_id: object): Promise<any> {
        return await this.statsModel.deleteOne({account_id: account_id});
    }

}