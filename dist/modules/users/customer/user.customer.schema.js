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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCustomerSchema = exports.Customer = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("../user.schema");
let Customer = class Customer {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Customer.prototype, "profile_nickname", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    mongoose_1.Prop({ required: false }),
    __metadata("design:type", String)
], Customer.prototype, "profile_name", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Customer.prototype, "profile_avatar_url", void 0);
__decorate([
    mongoose_1.Prop({ default: false }),
    __metadata("design:type", Boolean)
], Customer.prototype, "is_active", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }),
    __metadata("design:type", user_schema_1.Users)
], Customer.prototype, "user_invited", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'InstaAccount' }),
    __metadata("design:type", Object)
], Customer.prototype, "account_invited", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Array)
], Customer.prototype, "purchases", void 0);
Customer = __decorate([
    mongoose_1.Schema({ timestamps: true, autoIndex: true })
], Customer);
exports.Customer = Customer;
exports.UserCustomerSchema = mongoose_1.SchemaFactory.createForClass(Customer);
//# sourceMappingURL=user.customer.schema.js.map