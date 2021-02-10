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
exports.CreateInstaAccountDto = void 0;
const class_validator_1 = require("class-validator");
class CreateInstaAccountDto {
}
__decorate([
    class_validator_1.IsString({ message: 'Заполните все поля' }),
    class_validator_1.IsNotEmpty({ message: 'Заполните все поля' }),
    __metadata("design:type", Object)
], CreateInstaAccountDto.prototype, "login", void 0);
__decorate([
    class_validator_1.IsString({ message: 'Заполните все поля' }),
    class_validator_1.IsNotEmpty({ message: 'Заполните все поля' }),
    __metadata("design:type", Object)
], CreateInstaAccountDto.prototype, "nickname", void 0);
__decorate([
    class_validator_1.IsString({ message: 'Заполните все поля' }),
    class_validator_1.IsNotEmpty({ message: 'Заполните все поля' }),
    __metadata("design:type", String)
], CreateInstaAccountDto.prototype, "password", void 0);
exports.CreateInstaAccountDto = CreateInstaAccountDto;
//# sourceMappingURL=create.insta.account.dto.js.map