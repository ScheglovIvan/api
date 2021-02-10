"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypt_service_1 = require("../insta/crypt.service");
const insta_module_1 = require("../insta/insta.module");
const parse_service_1 = require("./parse.service");
let ParseModule = class ParseModule {
};
ParseModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => insta_module_1.InstaModule),
        ],
        providers: [parse_service_1.PuppeteerService, crypt_service_1.CryptService, config_1.ConfigService],
        exports: [parse_service_1.PuppeteerService]
    })
], ParseModule);
exports.ParseModule = ParseModule;
//# sourceMappingURL=parse.module.js.map