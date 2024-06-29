import {Request, Response, NextFunction} from "express";
import { CreateCustomer, LoginInfo, EditInfo } from "../dto/customer.dto";
import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { Customer } from "../models/customer";
import { GenerateOTP, createSignature, hashPassword, sendOTP, verifyPassword } from "../utilities";

export const newCustomer = async (req: Request, res:Response, next:NextFunction) =>{

    const customerInput = plainToClass(CreateCustomer, req.body);
    const inputErr =  await validate(customerInput, {validationError: {target: true}})

    if(inputErr.length > 0){

        return res.status(400).json(inputErr)
    }

    const{ username, email, phone, password, } = customerInput;

    const existing_user = await Customer.findOne({$or: [{email : email}, {username: username}]})

    if(existing_user){
        return res.status(400).json({message: "This user already exists"})
    }

    const hash_pwd = await hashPassword(password)

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

        await sendOTP(otp, phone)

        const signature = createSignature({
            _id: result._id,
            email: result.email,
            verified: result.verified
        })

        return res.status(200).json({signature: signature})

    }
    return res.status(400).json({message:"Signup error"})

}

export const verifyCustomer = async (req: Request, res:Response, next:NextFunction) => {

    const {otp} = req.body
    const customer = req.user

    if(customer){

        const profile = await Customer.findById(customer._id)

        if(profile){
            if(profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()){

                profile.verified = true

                const savedProfile = await profile.save()

                const newSig = createSignature({
                    _id: savedProfile._id,
                    email: savedProfile.email,
                    verified: savedProfile.verified
                }
                );

                return res.status(200).json({signature : newSig})


            }
        }
    }

    return res.status(400).json({error: "Something went wrong"})


}

export const CustomerLogin = async (req: Request, res:Response, next:NextFunction) => {

    const loginInput = plainToClass(LoginInfo, req.body)

    const loginErrors = await validate(loginInput, {validationError: {target : true}})

    if(loginErrors.length > 0){
        return res.status(400).json({error: loginErrors})

    }

    const {email, password} = loginInput;


    const user = await Customer.findOne({email: email})

    if(user){

        const passT = await verifyPassword(password, user.password)

        if(passT){

            const signature = createSignature({
                _id: user._id,
                email: user.email,
                verified: user.verified
            })

            return res.status(200).json({message: signature})
        }

        return res.status(400).json({message: "Login failed"})
        
    }
    return res.status(400).json({message: "Login failed"})
}

export const RequestOTP = async (req: Request, res:Response, next:NextFunction) => {

    const customer = req.user;

    if(customer){
        const profile = await Customer.findById(customer._id);

        if(profile){
            const {otp, otp_expiry} = GenerateOTP();

            profile.otp = otp;
            profile.otp_expiry = otp_expiry;

            const result = await profile.save()
            await sendOTP(otp, profile.phone);

            return res.status(200).json({message: "OTP generated successfully"})


        }
        return res.status(400).json({message: "OTP generation error."})


    }
    return res.status(400).json({message: "OTP generation error."})

}

export const GetCustomerProfile = async (req: Request, res:Response, next:NextFunction) =>{

    const user = req.user

    if (user){
        const profile = await Customer.findById(user._id);

        if (profile){
           return res.status(200).json(profile)
        }

        return res.status(400).json({message: "Error retrieving profile"})

    }

    return res.status(400).json({message: "Error retrieving profile"})

}

export const EditCustomerProfile = async (req: Request, res:Response, next:NextFunction) =>{

    const user = req.user

    const EditInput = plainToClass(EditInfo, req.body)

    const EditErrors = await validate(EditInput, {validationError: {target : true}})

    if(EditErrors.length > 0){
        return res.status(400).json({error: EditErrors})

    }

    const {username, address, } = EditInput

    if(user){
        const profile = await Customer.findById(user._id);

        if (profile){
           profile.username = username
           profile.address = address

           const result = await profile.save()

           return res.status(200).json({message: "Profile update successfully."})

        }

        return res.status(400).json({message: "Error updating profile"})

        


    }

    return res.status(400).json({message: "Error updating profile"})


}
