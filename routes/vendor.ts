import express, {Router, Request, Response, NextFunction} from "express";
import { GetVendorProfile,getFoods, UpdateVendorProfile, UpdateVendorService, addFood, vendorLogin, UpdateVendorCoverImage } from "../controllers"
import { validate } from "../middleware";
import multer from "multer"

const router = Router();

const imgStore = multer.diskStorage({

    destination : (req,file, cb) => {
        cb(null, 'images')

    },
    filename: function(res, file, cb){
        cb(null, '_'+ file.originalname)
    }
})

const images = multer({storage:imgStore}).array('images', 5)

router.post("/login", vendorLogin )

router.use(validate)

router.get("/profile", GetVendorProfile)
router.patch("/profile", UpdateVendorProfile)
router.patch("/service", UpdateVendorService)
router.patch("/cover", images, UpdateVendorCoverImage)

router.post("/food",images, addFood);
router.get("/foods", getFoods);


export {router as vendor};