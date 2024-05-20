import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MONGODB_URL } from "./config";

import {admin, vendor} from "./routes";

const app = express()

mongoose.connect(MONGODB_URL, ).
    then(()=>{console.log("DB is live")}).
    catch((err)=>{console.log(err)})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/admin", admin);
app.use("/vendor", vendor);


app.get('/', (req, res) =>{
    res.send("Home Page baby!")
})


app.listen(3000, ()=>{
    console.log("Connection is live on port 3000!!!")
})
