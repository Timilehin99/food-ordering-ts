import express from "express";
import bodyParser from "body-parser";

import {admin, vendor} from "./routes";

const app = express()

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
