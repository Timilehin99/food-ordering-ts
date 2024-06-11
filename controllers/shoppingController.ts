import {Request, Response, NextFunction} from "express";
import { FoodDoc, Vendor } from "../models";


export const GetFoodAvailability = async (req:Request,res:Response, next: NextFunction) => {

    const pincode = req.params.pincode

    const result = await Vendor.find({ pinCode: pincode, serviceAvailable: false})
        .sort({"rating":-1})
        .populate("foods")

    if(result.length > 0){
        return res.status(200).send(result)
    }

    return res.status(400).send({message: "No food for you"})

}

export const GetTopRated = async (req:Request,res:Response, next: NextFunction) => {

    const pincode = req.params.pincode

    const result = await Vendor.find({ pinCode: pincode, serviceAvailable: true})
        .sort({"rating":-1})

    if(result.length > 0){
        return res.status(200).send(result)
    }

    return res.status(400).send({message: "No food for you"})

}

export const GetQuick = async (req:Request,res:Response, next: NextFunction) => {

    const pincode = req.params.pincode

    const result = await Vendor.find({ pinCode: pincode, serviceAvailable: true})
        .populate("foods")

    if(result.length > 0){
        let quickFood:any = [];

        result.map(vendor => {
            const foods = vendor.foods as [FoodDoc];

            quickFood.push(...foods.filter(food => food.prepTime <= 30))

        }
        )
        return res.status(200).send(quickFood)
    }

    return res.status(400).send({message: "No food for you"})

}