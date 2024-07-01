import bcrypt from "bcryptjs";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { APP_SECRET } from "../config";
import {VendorPayload } from "../dto";
import { AuthPayload } from "../dto/auth.dto";

const salt_rounds = 10

export const hashPassword = async (password:string)=>{
    return await bcrypt.hash(password, salt_rounds)
}

export const verifyPassword = async (password:string, hash: string)=>{
    return await bcrypt.compare(password,hash)
}

export const createSignature = (payload: AuthPayload) =>{

    const signature = jwt.sign(payload, APP_SECRET, {expiresIn: 3600})

    return signature

}

export const verifySignature = async(req: Request) =>{
    const signature = req.get('Authorization');

    if(signature){

        const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET) as AuthPayload;

        req.user = payload;

        return true;

    }

}