import {Request, Response, NextFunction} from "express";
import { Vendor } from "../models";
import {ModifyVendor, vendorLoginInput} from "../dto"
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

    const {name, location, foodType, phoneNo} = <ModifyVendor>req.body
    const user = req.user
    
    if(user){

        const validUser = await Vendor.findById(user._id);

        if(validUser){
            validUser.name = name;
            validUser.location = location;
            validUser.foodType = foodType;
            validUser.phoneNo = phoneNo

            const result = await validUser.save();

            return res.status(200).json(result)

        }
        return res.status(400).json({message:"This user does not exist."})


    }
    
}


export const UpdateVendorService = async(req: Request, res: Response, next:NextFunction) => {

    const user = req.user
    if(user){

        const validUser = await Vendor.findById(user._id);

        if(validUser){
            validUser.serviceAvailable = !(validUser.serviceAvailable)

            const result = await validUser.save();

            return res.status(200).json(validUser)

        }

        return res.status(400).json({message:"This user does not exist."})
    
    
    }
    
}

