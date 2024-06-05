import {Request, Response, NextFunction} from "express";
import { Vendor, Food } from "../models";
import {ModifyVendor, vendorLoginInput, createdFoodInput} from "../dto"
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

export const UpdateVendorCoverImage = async(req: Request, res: Response, next:NextFunction) => {

    const user = req.user
    if(user){

        const vendor = await Vendor.findById(user._id);

        if(vendor){

            const files = req.files as [Express.Multer.File];
            const names =  files.map((file: Express.Multer.File) => file.filename)

            vendor.coverImage.push(...names)
            const result =  await vendor.save()
            return res.json(result)
        }

        return res.status(400).json({message:"This user does not exist."})
    
    
    }
    
}

export const addFood = async(req: Request, res:Response, next: NextFunction) =>{

    const user = req.user

    if(user){
        const {name, description, price, category, prepTime, foodType} = <createdFoodInput>req.body;

        const vendor = await Vendor.findById(user._id)

        if(vendor){

            const files = req.files as [Express.Multer.File];
            const names =  files.map((file: Express.Multer.File) => file.filename)

            const food = await Food.create({
                vendorId : vendor._id,
                name: name,
                price: price,
                description: description,
                category: category,
                prepTime: prepTime,
                images: names,
                foodType: foodType

            })

            vendor.foods.push(food)
            const result = await vendor.save()

            return res.status(200).json(result)
        }
        return res.json({message: "Error on the dancefloor!!"})

    }
    return res.json({message: "Error on the dancefloor"})


}

export const getFoods = async(req: Request, res:Response, next: NextFunction) =>{

    const user = req.user

    if (user){
        const foods = await Food.find({vendorId : user._id})

        if(foods){
            return res.json(foods)
        }
    }

    const foods = await Food.find({}).sort({"name":1});
     
    return res.json({foods})

    
}