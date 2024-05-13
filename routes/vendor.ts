import express, {Router, Request, Response, NextFunction} from "express";
import { createVendor, getVendor, getVendorID } from "../controllers";

const router = Router();

router.post("/create", createVendor);
router.get("/", getVendor);
router.get("/:id", getVendorID);

export {router as vendor};