import { IsNotEmpty } from "class-validator";

export class LoginUserDto {

    @IsNotEmpty({message: 'Заполните поле логин'})
    login: string;

    @IsNotEmpty({message: 'Заполните поле пароль'})
    password: string;

}