"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstaModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const parse_module_1 = require("../parse/parse.module");
const crypt_service_1 = require("./crypt.service");
const insta_controller_1 = require("./insta.controller");
const insta_service_1 = require("./insta.service");
const insta_shcema_1 = require("./insta.shcema");
const stats_module_1 = require("../statistic/stats.module");
const mail_module_1 = require("../mail/mail.module");
let InstaModule = class InstaModule {
};
InstaModule = __decorate([
    common_1.Module({
        controllers: [insta_controller_1.InstagrammController],
        providers: [insta_service_1.InstaService, crypt_service_1.CryptService],
        imports: [
            stats_module_1.StatsModule,
            config_1.ConfigModule,
            mail_module_1.MailModule,
            common_1.forwardRef(() => parse_module_1.ParseModule),
            mongoose_1.MongooseModule.forFeature([{ name: insta_shcema_1.InstaAccount.name, schema: insta_shcema_1.InstaSchema }])
        ],
        exports: [insta_service_1.InstaService],
    })
], InstaModule);
exports.InstaModule = InstaModule;
//# sourceMappingURL=insta.module.js.map