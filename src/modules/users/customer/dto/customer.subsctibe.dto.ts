import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CustomerSubscribeDto {

    @IsString()
    @IsNotEmpty({message: 'Заполните поля'})
    nickname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    _id: object;

}