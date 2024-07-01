import express, {Router, Request, Response, NextFunction} from "express";
import { createVendor, getVendors, getVendorID } from "../controllers";
import { validate } from "../middleware";

const router = Router();

router.post("/vendor/create", createVendor);

router.use(validate)
router.get("/vendors", getVendors);
router.get("/vendor/:id", getVendorID);


export {router as admin};