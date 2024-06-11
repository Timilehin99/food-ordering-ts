import mongoose from "mongoose";
import { MONGODB_URL } from "../config";

export default async () =>{

    try{
        await mongoose.connect(MONGODB_URL)
        console.log("DB is live!!")
    }
    catch(ex){
        console.log(ex)
    }
}