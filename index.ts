import express from "express";

import {admin, vendor} from "./routes/index";

const app = express()

app.use("/admin", admin);
app.use("/vendor", vendor);


app.get('/', (req, res) =>{
    res.send("Home Page baby!")
})


app.listen(3000, ()=>{
    console.log("Connection is live on port 3000!!!")
})
