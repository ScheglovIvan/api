import { Body, Controller, Get, Post } from "@nestjs/common";
import { StatsGetDto } from "./stats.get.dto";
import { StatsService } from "./stats.service";

@Controller('stats')
export class StatsController {

    constructor (private statService: StatsService) {}

    @Post()
    async getActiveSubsctibe(@Body() statsGetDto: StatsGetDto): Promise<any> {
            const allStats = await Promise.all([
                await this.statService.getActiveSubscribe(statsGetDto),
            ])
            return allStats;
    }

}
