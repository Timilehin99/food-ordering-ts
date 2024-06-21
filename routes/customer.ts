import express, {Router, Request, Response, NextFunction} from "express";
import { CustomerLogin, RequestOTP, newCustomer, verifyCustomer } from "../controllers";
import { validate } from "../middleware";
import { GenerateOTP } from "../utilities";


const router = Router();

router.post("/signup", newCustomer)
router.post("/login", CustomerLogin)

router.use(validate);

router.patch("/verify", verifyCustomer)
router.get("/otp", RequestOTP)





export {router as customer};