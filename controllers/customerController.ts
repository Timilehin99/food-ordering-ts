import {Request, Response, NextFunction} from "express";
import { CreateCustomer } from "../dto/customer.dto";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Customer } from "../models/customer";
import { GenerateOTP, hashPassword } from "../utilities";

export const newCustomer = async (req: Request, res:Response, next:NextFunction) =>{

    const customerInput = plainToClass(CreateCustomer, req.body);
    const inputErr =  await validate(customerInput, {validationError: {target: true}})

    if(inputErr){

        res.status(400).json(inputErr)
    }

    const{ username, email, phone, password, } = customerInput;

    const hash_pwd = hashPassword(password)

    const {otp, otp_expiry} = GenerateOTP()

    const result = await Customer.create({
        username : username,
        email : email,
        password : hash_pwd,
        otp: otp,
        otp_expiry : otp_expiry,
        phone: phone,
        lat : 0,
        long : 0
    }  )

    if(result){

    }




}