
import { IsEmail, IsEmpty, Length } from "class-validator"

export class CreateCustomer{
    @IsEmail()
    email : string

    phone : string

    @Length(4)
    username: string

    @Length(6,12)
    password: string
}

export class LoginInfo{

    @IsEmail()
    email: string

    password: string
}

export interface CustomerPayload{
    _id : string,
    email : string,
    verified: boolean

}