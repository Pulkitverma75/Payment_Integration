import express from "express";
import dotenv from "dotenv";
import paymentroute from "./Routes/payment.js"
import cors from "cors";
const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use("/api/v1", paymentroute)

app.listen(port, () => console.log(`Server is running on port ${port}`))
