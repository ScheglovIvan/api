import { IsNotEmpty, IsString } from "class-validator";

export class ParseInstaAccountDto {

    @IsNotEmpty()
    @IsString()
    login: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}