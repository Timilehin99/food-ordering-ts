import express, {Router, Request, Response, NextFunction} from "express";
import { GetVendorProfile, UpdateVendorProfile, UpdateVendorService, vendorLogin } from "../controllers"
import { validate } from "../middleware";

const router = Router();

router.post("/login", vendorLogin )

router.use(validate)

router.get("/profile", GetVendorProfile)
router.patch("/profile", UpdateVendorProfile)
router.patch("/service", UpdateVendorService)


export {router as vendor};