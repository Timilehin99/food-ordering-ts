import express, {Router, Request, Response, NextFunction} from "express";
import {vendorLogin} from "../controllers"

const router = Router();

router.post("/login", vendorLogin )


export {router as vendor};