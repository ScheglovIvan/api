import { IsNotEmpty, IsString } from "class-validator";

export class CreateInstaAccountDto {


    @IsString({message: 'Заполните все поля'})
    @IsNotEmpty({message: 'Заполните все поля'})
    login: any;

    @IsString({message: 'Заполните все поля'})
    @IsNotEmpty({message: 'Заполните все поля'})
    nickname: any;

    @IsString({message: 'Заполните все поля'})
    @IsNotEmpty({message: 'Заполните все поля'})
    password: string;

}