"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const insta_module_1 = require("../insta/insta.module");
const stats_module_1 = require("../statistic/stats.module");
const home_controller_1 = require("./controllers/home.controller");
const settings_controller_1 = require("./controllers/settings.controller");
let MainModule = class MainModule {
};
MainModule = __decorate([
    common_1.Module({
        controllers: [home_controller_1.HomeController, settings_controller_1.SettingsController],
        providers: [],
        imports: [
            stats_module_1.StatsModule,
            insta_module_1.InstaModule,
            config_1.ConfigModule
        ],
        exports: [],
    })
], MainModule);
exports.MainModule = MainModule;
;
//# sourceMappingURL=main.module.js.map