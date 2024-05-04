import express, {Router, Request, Response, NextFunction} from "express";
import { createVendor, getVendor, getVendorID } from "../controllers";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Jinki mi jinki.");
})

router.post("/vendor", createVendor);
router.get("/vendor", getVendor);
router.post("/vendor/:id", getVendorID);

export {router as vendor};