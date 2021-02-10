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
exports.InstaSchema = exports.InstaAccount = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const user_schema_1 = require("../users/user.schema");
let InstaAccount = class InstaAccount {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], InstaAccount.prototype, "login", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], InstaAccount.prototype, "password", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], InstaAccount.prototype, "nickname", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }),
    __metadata("design:type", user_schema_1.Users)
], InstaAccount.prototype, "user", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], InstaAccount.prototype, "profile_url", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], InstaAccount.prototype, "profile_avatar_url", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], InstaAccount.prototype, "profile_name", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], InstaAccount.prototype, "profile_nickname", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], InstaAccount.prototype, "profile_number", void 0);
__decorate([
    mongoose_1.Prop({ required: false, default: 10 }),
    __metadata("design:type", Number)
], InstaAccount.prototype, "cost_subscribe", void 0);
__decorate([
    mongoose_1.Prop({ default: 0 }),
    __metadata("design:type", Number)
], InstaAccount.prototype, "total_visited", void 0);
__decorate([
    mongoose_1.Prop({ default: false }),
    __metadata("design:type", Boolean)
], InstaAccount.prototype, "main", void 0);
__decorate([
    mongoose_1.Prop({ default: 0 }),
    __metadata("design:type", Number)
], InstaAccount.prototype, "total_subscribe", void 0);
__decorate([
    mongoose_1.Prop({ default: null }),
    __metadata("design:type", String)
], InstaAccount.prototype, "special_link", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Date)
], InstaAccount.prototype, "created_at", void 0);
InstaAccount = __decorate([
    mongoose_1.Schema({ timestamps: true })
], InstaAccount);
exports.InstaAccount = InstaAccount;
exports.InstaSchema = mongoose_1.SchemaFactory.createForClass(InstaAccount);
//# sourceMappingURL=insta.shcema.js.map