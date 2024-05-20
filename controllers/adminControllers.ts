import {Request, Response, NextFunction} from "express";
import { CreateVendorInput, CreateAdminInput } from "../dto";
import { Vendor } from "../models";
import { hashPassword, verifyPassword } from "../utilities";

export const checkDB = async (id:String | undefined, email?: String) =>{
    if(email){
        const vendor = await Vendor.findOne({email:email})
        return vendor 
    }else{
        const vendor = await Vendor.findById(id)
        return vendor
    }

}

export const createVendor = async (req: Request, res: Response, next: NextFunction) =>{
    const{name, ownerName, location, password, foodType, email, phoneNo } = <CreateVendorInput>req.body

    const vendorCheck = await checkDB('', email)

    if(vendorCheck){
        return res.status(400).send("This user already exists.");
    }

    const newPassword:String = await hashPassword(password)

    const newV = await Vendor.create({
        name: name,
        ownerName: ownerName,
        location: location,
        password: newPassword,
        foodType: foodType,
        email: email,
        phoneNo: phoneNo,

    })

    return res.status(200).json(newV);

}

export const getVendors = async (req: Request, res: Response, next: NextFunction) =>{

    const vendors = await Vendor.find({}).sort({"name":1});
     
    return res.status(200).json(vendors)
}

export const getVendorID = async (req: Request, res: Response, next: NextFunction) =>{
    const vendorID = req.params.id;

    const vendor = await checkDB(vendorID);

    if(vendor){
        return res.status(200).send(vendor)
    }
    else{
        return res.status(400).send(`Vendor was not found.`)
    }

}