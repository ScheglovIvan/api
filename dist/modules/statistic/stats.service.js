"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const insta_shcema_1 = require("../insta/insta.shcema");
const user_customer_schema_1 = require("../users/customer/user.customer.schema");
const user_schema_1 = require("../users/user.schema");
const stats_schema_1 = require("./stats.schema");
const moment = require("moment");
let StatsService = class StatsService {
    constructor(userModel, accountModel, customerModel, statsModel) {
        this.userModel = userModel;
        this.accountModel = accountModel;
        this.customerModel = customerModel;
        this.statsModel = statsModel;
        this.months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
    }
    async getActiveSubscribe(statsGetDto) {
        const customersByUser = await this.customerModel.find({ user_invited: statsGetDto.user_id });
        let count = 0;
        let countTotal = 0;
        if (customersByUser) {
            for (const customer of customersByUser) {
                countTotal = countTotal + customer.purchases.length;
                if (customer.purchases && customer.purchases.length) {
                    for (let i = 0; i < customer.purchases.length; i++) {
                        if (customer.purchases[i].active) {
                            ++count;
                        }
                    }
                }
            }
        }
        return { activeSubscribeCount: count, totalActiveSubscribe: countTotal };
    }
    async updateStat(type, account_id, options) {
        const statModel = await this.statsModel.findOne({ account_id: account_id });
        const date = moment().month();
        const year = moment().year();
        const keys = Object.keys(statModel[type]);
        const month = keys[date];
        for (const prop in statModel[type]) {
            if (month.toLowerCase() === prop.toLowerCase()) {
                if (options.type === 'plus' && options.model !== 'balance') {
                    statModel[type][prop].count = statModel[type][prop].count + 1;
                }
                if (options.type === 'minus' && options.model !== 'balance') {
                    if (statModel[type][prop].count - 1 < 0) {
                        statModel[type][prop].count = 0;
                    }
                    else {
                        statModel[type][prop].count = statModel[type][prop].count - 1;
                    }
                }
                if (options.model === 'balance' && options.value) {
                    statModel[type][prop].count = statModel[type][prop].count + parseInt(options.value);
                }
            }
        }
        await this.statsModel.findOneAndUpdate({ _id: statModel._id }, statModel);
    }
    async getStats(account_id, type) {
        const account = await this.statsModel.findOne({ account_id: account_id });
        const account_insta = await this.accountModel.findOne({ _id: account_id });
        const account_cost = account_insta.cost_subscribe;
        if (account) {
            const date = moment().month();
            const year = moment().year();
            const data = {};
            const month = this.months[date];
            let prevMonth;
            if (date === 0) {
                prevMonth = this.months[11];
            }
            else {
                prevMonth = this.months[date - 1];
            }
            if (type === 'year') {
                let year_balance = 0;
                let year_total = 0;
                let year_active = 0;
                let year_visited = 0;
                let graph_followers = [];
                let profit_stats = [];
                for (const value in account.balance_stats) {
                    year_balance += account.balance_stats[value].count;
                    profit_stats.push(account.balance_stats[value].count);
                }
                for (const value in account.total_stats) {
                    year_total += account.total_stats[value].count;
                    graph_followers.push(account.total_stats[value].count);
                }
                for (const value in account.actived_stats) {
                    year_active += account.actived_stats[value].count;
                }
                for (const value in account.visited_stats) {
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
                };
            }
            if (type === 'month') {
                let graph_followers = new Array();
                for (const value in account.total_stats) {
                    graph_followers.push(account.total_stats[value].count);
                }
                return {
                    balance: {
                        value: account.balance_stats[month].count,
                        last: (account.balance_stats[prevMonth].count) ? Math.round((account.balance_stats[month].count - account.balance_stats[prevMonth].count) / account.balance_stats[prevMonth].count * 100) : '',
                    },
                    total_acc: {
                        value: account.total_stats[month].count,
                        last: (account.total_stats[prevMonth].count) ? Math.round((account.total_stats[month].count - account.total_stats[prevMonth].count) / account.total_stats[prevMonth].count * 100) : '',
                    },
                    active_acc: {
                        value: account.actived_stats[month].count,
                        last: (account.actived_stats[prevMonth].count) ? Math.round((account.actived_stats[month].count - account.actived_stats[prevMonth].count) / account.actived_stats[prevMonth].count * 100) : '',
                    },
                    visited: {
                        value: account.visited_stats[month].count,
                        last: (account.visited_stats[prevMonth].count) ? Math.round((account.visited_stats[month].count -
                            account.visited_stats[prevMonth].count) / account.visited_stats[prevMonth].count * 100) : '',
                    },
                    sales: {
                        value: account_cost * account.total_stats[month].count - ((account_cost * account.total_stats[month].count) * 20 / 100),
                        last: (account_cost * account.total_stats[prevMonth].count) ? Math.round((account_cost * account.total_stats[month].count - account_cost * account.total_stats[prevMonth].count) / account_cost * account.total_stats[prevMonth].count * 100) : '',
                        array: [],
                    },
                    graph_followers: graph_followers
                };
            }
        }
    }
    async createStats(account_id) {
        const data = {};
        for (const month of this.months) {
            data[month] = {
                count: 0,
            };
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
    async deleteStats(account_id) {
        return await this.statsModel.deleteOne({ account_id: account_id });
    }
};
StatsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(user_schema_1.Users.name)),
    __param(1, mongoose_1.InjectModel(insta_shcema_1.InstaAccount.name)),
    __param(2, mongoose_1.InjectModel(user_customer_schema_1.Customer.name)),
    __param(3, mongoose_1.InjectModel(stats_schema_1.Stats.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], StatsService);
exports.StatsService = StatsService;
//# sourceMappingURL=stats.service.js.map