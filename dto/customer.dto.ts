
import { IsEmail, IsEmpty, Length } from "class-validator"

export class CreateCustomer{
    @IsEmail()
    email : string

    @IsEmpty()
    phone : string

    @Length(4)
    username: string

    @Length(6,12)
    password: string


}