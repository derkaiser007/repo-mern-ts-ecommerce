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

// dotenv Library: 
// dotenv is a popular Node.js package for managing environment variables. 
// It loads environment variables from a .env file and makes them accessible via process.env.
// The config() Function:
// The config function reads the .env file and parses its contents.
// The path option specifies the location of the .env file. If omitted, dotenv defaults to looking for a .env file in the root directory.
config({
    path: "./.env",
});

const port = process.env.PORT || 400;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";

connectDB(mongoURI);

export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();

// It initializes an Express application instance and assigns it to the app variable.
// This instance will be used to define routes, middleware, and start the server.
const app = express();

// app.use() is used to mount middleware functions in an Express application.

// express.json() is a built-in middleware in Express that parses incoming JSON payloads from HTTP request bodies.
// It is used to handle requests with a Content-Type header of application/json.
// This middleware processes the request body, converting it from JSON into a JavaScript object that is accessible via req.body.
// Without this middleware, req.body will be undefined for JSON request payloads.
app.use(express.json());

// It sets up middleware to use Morgan, a popular HTTP request logging library for Express.js.
// It helps developers monitor and debug web applications by showing request information such as HTTP method, status code, response time, etc.
// The "dev" mode is one of Morgan's predefined logging formats.
// It logs the output in a concise, colored format that is easy to read.
app.use(morgan("dev"));

app.use(cors());

// It defines a basic route handler in an Express application that responds to HTTP GET requests sent to the root endpoint ("/").
// app.get(path, callback)
// path: Specifies the route path, in this case, the root path ("/").
// callback: A function that gets executed whenever the specified route is accessed using the GET HTTP method.
// Parameters: (req, res)
// req (Request): Represents the incoming HTTP request. It contains data like query parameters, headers, and the request body.
// res (Response): Represents the HTTP response that will be sent back to the client.
// res.send(): It sends a simple response back to the client.
app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
});

// Using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);

// It is used to serve static files (such as images, files, or other assets) in an Express application.
// app.use(path, middleware)
// This is a middleware function that mounts the middleware (express.static) at the specified path ("/uploads").
// express.static(directory): This serves static files from the specified directory ("uploads" in this case).
// Any file located in the uploads directory can be accessed via a URL that starts with /uploads.
app.use("/uploads", express.static("uploads"));

// It is typically used in an Express.js application to handle errors globally.
// If an error occurs in your routes or middleware, you can pass it to the error-handling middleware using next(err).
// Express automatically skips other middleware and routes, jumping directly to the error-handling middleware.
// The error middleware should always be added after all other middleware and routes to catch any unhandled errors.
// Without a custom error middleware, Express has a default error handler that logs the error stack trace and sends a generic response.
app.use(errorMiddleware)

// It demonstrates how to start a Node.js server using the listen method provided by Express.
// It ensures your application is actively listening for HTTP requests on the specified port, enabling communication with clients. 
// It starts the server and binds it to the specified port. 
// app.listen(port, callback)
// The port parameter specifies the port number on which the server will listen for incoming requests.
// The callback is an optional function that gets executed once the server starts successfully.
app.listen(port, () => {
    console.log(`Server is working on http://localhost:${port}`)
})