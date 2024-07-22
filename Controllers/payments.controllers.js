import { createRazorpayInstance } from "../config/razorpay.config.js";
import crypto from "crypto";

const razorpayInstance = createRazorpayInstance;

export const createPayment = async (req, res) => {
    const { productID, amount } = req.body;   //Never accept amount from client as it can be change, always fetch data from DB.
    console.log(productID, amount);
    if (!productID || !amount) {
        res.status(400).json({ message: "Product ID and its amount is required" })
    }
    const options = {
        amount: amount * 100, //amount in smallest currency unit
        currency: "INR",
        receipt: "receipt_order_1"
    };
    try {
        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Payment is failed" })
            }
            return res.status(200).json(order);
        })
    } catch (error) {
        console.log("Server Error", error);
        res.status(500).json({ success: false, message: "Something went wrong" })
    }

}

export const verifyPayment = async (req, res) => {
    const { orderID, paymentID, signature } = req.body
    const secretkey = process.env.RAZORPAY_KEY_SECRET;

    //create hmac object using crypto
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(orderID + "|" + paymentID);
    //digest it in hex
    const generatedsignature = hmac.digest("hex");
    if (generatedsignature === signature) {
        return res.status(200).json({
            success: true,
            message: "Payment verified"
        });
    }
    else {
        return res.status(400).json({
            success: false,
            message: "Payment is not verified"
        })
    }
}   
