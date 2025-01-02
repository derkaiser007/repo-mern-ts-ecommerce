import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class.js";
import { ControllerType } from "../types/types.js";

export const errorMiddleware = (
    err: ErrorHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    
    err.message ||= "Internal Server Error";
    err.statusCode ||= 500;

    if (err.name === "CastError") err.message = "Invalid ID";
  
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
};

export const TryCatch = (func: ControllerType) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};
/*
Without TryCatch:
app.get("/example", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await someAsyncOperation();
        res.json({ success: true, data });
    } catch (error) {
        next(error); // Explicitly pass the error to the error-handling middleware
    }
});


With TryCatch:
app.get("/example", TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const data = await someAsyncOperation();
    res.json({ success: true, data });
}));

In an Express application, asynchronous route handlers often use async/await. 
If an error occurs within an async function, it results in an unhandled Promise rejection unless explicitly caught. 
This utility eliminates the need to write repetitive try-catch blocks for every route and reduces boilerplate code and ensures consistency.
*/