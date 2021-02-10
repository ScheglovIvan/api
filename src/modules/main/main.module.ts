import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { InstaModule } from "../insta/insta.module";
import { InstaService } from "../insta/insta.service";
import { StatsModule } from "../statistic/stats.module";
import { HomeController } from './controllers/home.controller';
import { SettingsController } from "./controllers/settings.controller";

@Module({
    controllers: [HomeController, SettingsController],
    providers: [],
    imports: [
        StatsModule,
        InstaModule,
        ConfigModule
    ],
    exports: [],
})
export class MainModule {};