import express from 'express';
import App from './services/MainApp'
import dbConnection from './services/Database'


const Startup = async () =>{
    const app = express()

    await dbConnection()
    await App(app)

    app.listen(3000, ()=>{
        console.log("We are live on port 3000 folks.")
    })
}

Startup()