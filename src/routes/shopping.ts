import express, {Router, Request, Response, NextFunction} from "express";
import { validate } from "../middleware";
import { GetFoodAvailability, GetFoods, GetQuick, GetTopRated, findRestaurantByID } from "../controllers/shoppingController";

const router = Router();


router.use(validate)
router.get("/:pincode", GetFoodAvailability)
router.get("top-rated/:pincode", GetTopRated)
router.get("/quick/:pincode", GetQuick)
router.get("/restaurant/:id", findRestaurantByID)
router.get("/foods", GetFoods)




export {router as shopping};