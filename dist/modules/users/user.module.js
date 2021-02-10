"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const user_schema_1 = require("./user.schema");
const bcrypt_service_1 = require("../auth/bcrypt.service");
const insta_module_1 = require("../insta/insta.module");
const crypt_service_1 = require("../insta/crypt.service");
const user_customer_service_1 = require("./customer/user.customer.service");
const user_customer_schema_1 = require("./customer/user.customer.schema");
const parse_module_1 = require("../parse/parse.module");
const stats_module_1 = require("../statistic/stats.module");
const mail_module_1 = require("../mail/mail.module");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        providers: [user_service_1.UserService, bcrypt_service_1.BcryptService, crypt_service_1.CryptService, user_customer_service_1.CustomerService],
        controllers: [user_controller_1.UserController],
        imports: [
            stats_module_1.StatsModule,
            parse_module_1.ParseModule,
            insta_module_1.InstaModule,
            mail_module_1.MailModule,
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.Users.name, schema: user_schema_1.UsersSchema },
                { name: user_customer_schema_1.Customer.name, schema: user_customer_schema_1.UserCustomerSchema }
            ]),
        ],
        exports: [user_service_1.UserService, user_customer_service_1.CustomerService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map