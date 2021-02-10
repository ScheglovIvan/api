import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CustomerCreateDto {

    @IsString()
    @IsNotEmpty()
    profile_nickname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    profile_name: string;

    @IsString()
    @IsNotEmpty()
    profile_avatar_url: string;

    user_invited: object;
    purchases: object;

}