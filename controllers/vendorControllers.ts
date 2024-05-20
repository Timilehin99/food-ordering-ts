import {Request, Response, NextFunction} from "express";
import { Vendor } from "../models";
import {vendorLoginInput} from "../dto"
import { checkDB } from "./adminControllers";
import { createSignature, verifyPassword } from "../utilities";



export const vendorLogin = async (req: Request, res: Response, next:NextFunction) => {

    const{email, password} = <vendorLoginInput>req.body

    const validUser = await checkDB("", email);

    if(validUser){

        const passTrue = await verifyPassword(password, validUser.password)

        if(passTrue){

            const userSig = createSignature(
                {_id: validUser.id, 
                 name: validUser.name,
                 email: validUser.email,
                 foodType: validUser.foodType})

            return res.json(userSig)

        }else{

            return res.status(400).json({"message" : "Check your credentials."})

        }

    }

    return res.status(400).json({"message":"Check your credentials."})


}

export const GetVendorProfile =  async (req: Request, res: Response, next:NextFunction)=>{

    const user = req.user

    if(user){

        const validUser = await Vendor.findById(user._id);

        return res.status(200).json(validUser)
        
    }

    return res.status(400).json({message:"user not found"})


}

export const UpdateVendorProfile = async(req: Request, res: Response, next:NextFunction) => {
    
}


export const UpdateVendorService = async(req: Request, res: Response, next:NextFunction) => {
    
}

