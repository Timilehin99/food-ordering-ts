import express, {Router, Request, Response, NextFunction} from "express";

const router = Router();

router.get("/auth/login", (req: Request, res: Response) => {
    res.send("slinki mi slinki.");
})

export {router as admin};