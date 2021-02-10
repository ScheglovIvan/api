import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class StatsGetDto {

    @IsNotEmpty()
    user_id: object;

    @IsNotEmpty()
    type: string;

}