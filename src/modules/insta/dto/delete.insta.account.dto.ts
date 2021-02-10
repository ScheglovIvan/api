import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class DeleteAccountInstaDto {


    @IsNotEmpty()
    @IsString()
    _id: object;

}