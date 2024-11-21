// node ./dist/app.js
import express from "express";
import { connectDB } from "./utils/features.js";
// The node-cache library is a lightweight, in-memory caching solution for Node.js applications.
import NodeCache from "node-cache";
import { errorMiddleware } from "./middlewares/error.js";
import { config } from "dotenv";
// The morgan package is a popular HTTP request logger middleware for Node.js.
import morgan from "morgan";
import Stripe from "stripe";
import cors from "cors";

// Routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js"
import orderRoute from "./routes/order.js"
import paymentRoute from "./routes/payment.js"

config({
    path: "./.env",
});

const port = process.env.PORT || 400;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";

connectDB(mongoURI);

export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
});

// Using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
})