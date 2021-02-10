"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const insta_shcema_1 = require("../insta/insta.shcema");
const user_customer_schema_1 = require("../users/customer/user.customer.schema");
const user_schema_1 = require("../users/user.schema");
const stats_controller_1 = require("./stats.controller");
const stats_schema_1 = require("./stats.schema");
const stats_service_1 = require("./stats.service");
let StatsModule = class StatsModule {
};
StatsModule = __decorate([
    common_1.Module({
        providers: [stats_service_1.StatsService],
        controllers: [stats_controller_1.StatsController],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: insta_shcema_1.InstaAccount.name, schema: insta_shcema_1.InstaSchema },
                { name: user_schema_1.Users.name, schema: user_schema_1.UsersSchema },
                { name: user_customer_schema_1.Customer.name, schema: user_customer_schema_1.UserCustomerSchema },
                { name: stats_schema_1.Stats.name, schema: stats_schema_1.StatsSchema }
            ])
        ],
        exports: [stats_service_1.StatsService],
    })
], StatsModule);
exports.StatsModule = StatsModule;
;
//# sourceMappingURL=stats.module.js.map