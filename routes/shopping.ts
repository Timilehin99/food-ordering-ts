import express, {Router, Request, Response, NextFunction} from "express";
import { validate } from "../middleware";
import { GetFoodAvailability, GetQuick, GetTopRated } from "../controllers/shoppingController";

const router = Router();


router.use(validate)
router.get("/:pincode", GetFoodAvailability)
router.get("top-rated/:pincode", GetTopRated)
router.get("/quick/:pincode", GetQuick)




export {router as shopping};