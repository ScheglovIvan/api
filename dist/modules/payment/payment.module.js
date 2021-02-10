"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const insta_module_1 = require("../insta/insta.module");
const payment_controller_1 = require("./payment.controller");
const payment_schema_1 = require("./payment.schema");
let PaymentsModule = class PaymentsModule {
};
PaymentsModule = __decorate([
    common_1.Module({
        controllers: [payment_controller_1.PaymentsController],
        providers: [],
        imports: [
            insta_module_1.InstaModule,
            mongoose_1.MongooseModule.forFeature([
                { name: payment_schema_1.Payments.name, schema: payment_schema_1.PaymentsSchema }
            ]),
        ],
        exports: [],
    })
], PaymentsModule);
exports.PaymentsModule = PaymentsModule;
//# sourceMappingURL=payment.module.js.map