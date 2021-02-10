"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksModule = void 0;
const common_1 = require("@nestjs/common");
const insta_module_1 = require("../insta/insta.module");
const mail_module_1 = require("../mail/mail.module");
const parse_module_1 = require("../parse/parse.module");
const stats_module_1 = require("../statistic/stats.module");
const user_module_1 = require("../users/user.module");
const task_service_1 = require("./task.service");
let TasksModule = class TasksModule {
};
TasksModule = __decorate([
    common_1.Module({
        providers: [task_service_1.TasksService],
        imports: [user_module_1.UserModule, parse_module_1.ParseModule, insta_module_1.InstaModule, mail_module_1.MailModule, stats_module_1.StatsModule],
    })
], TasksModule);
exports.TasksModule = TasksModule;
//# sourceMappingURL=task.module.js.map