import { StatsGetDto } from "./stats.get.dto";
import { StatsService } from "./stats.service";
export declare class StatsController {
    private statService;
    constructor(statService: StatsService);
    getActiveSubsctibe(statsGetDto: StatsGetDto): Promise<any>;
}
