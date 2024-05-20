import { Request, Response, NextFunction } from "express"
import { AuthPayload } from "../dto/auth.dto"
import { verifySignature } from "../utilities"

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload
        }
    }
}

export const validate = async (req: Request, res:Response, next: NextFunction)=>{
    const validate = await verifySignature(req);

    if(validate){
        next()
    }else{
        res.status(400).json({message: "You are not authorized"})
    }


}