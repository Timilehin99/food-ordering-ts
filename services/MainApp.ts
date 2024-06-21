import express, {Application }from "express";
import bodyParser from "body-parser";
import {admin, vendor, shopping, customer} from "../routes";
import path from "path"


export default async(app:Application) => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use('/images', express.static(path.join(__dirname, 'images')))

    app.use("/admin", admin);
    app.use("/vendor", vendor);
    app.use("/shopping", shopping)
    app.use("/customer", customer)


    app.get('/', (req, res) =>{
        res.send("Home Page baby!")
    })

    return app
}



