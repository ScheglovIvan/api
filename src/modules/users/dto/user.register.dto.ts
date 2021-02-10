import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Match } from '../../../decorators/match.decorator';

export class CreateUserDto {

    @IsString({message: 'Поле логин должно быть строкой'})
    @IsNotEmpty({message: 'Поле логин не может быть пустым'})
    readonly  login: string;

    @IsNotEmpty({ message: 'Заполните поле Email' })
    readonly  email: string;

    @MinLength(6, { message: "Минимальная длина пароля 6 символов"})
    @MaxLength(20, { message: "Максимальная длина пароля 20 символов"})
    // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,20}$/,
    //     { message: "Пароль должен содержать как минимум одну цифру и символ в верхнем регистре"}
    // )
    readonly password: string;

    @Match('password', {message: 'Веденные пароли не совпадают'})
    @IsNotEmpty({message: "Подвердите веденный пароль"})
    readonly passwordConfirm: string;
}