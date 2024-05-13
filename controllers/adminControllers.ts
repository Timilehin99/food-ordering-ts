import {Request, Response, NextFunction} from "express";
import { CreateVendorInput, CreateAdminInput } from "../dto";

export const createAdmin = async (req: Request, res: Response, next: NextFunction) =>{
    const{ name, email, password, dateCreated } = <CreateAdminInput>req.body;
    



}
