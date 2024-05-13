import {Request, Response, NextFunction} from "express";
import {CreateVendorInput} from "../dto"

export const createVendor = async (req: Request, res: Response, next: NextFunction) =>{
    const{name, ownerName, location, password, foodType, email, phoneNo } = <CreateVendorInput>req.body

}

export const getVendor = async (req: Request, res: Response, next: NextFunction) =>{


}

export const getVendorID = async (req: Request, res: Response, next: NextFunction) =>{
    res.send(req.params.id)

}