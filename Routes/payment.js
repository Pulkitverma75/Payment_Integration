import express from "express";
import { createPayment, verifyPayment } from "../Controllers/payments.controllers.js";

const router = express.Router();


router.get("/home", (req, res) => { res.send("Working Fine!") })
router.post("/createPayment", createPayment)
router.post("/verifyPayment", verifyPayment)


export default router;