import express, { type NextFunction, type Request, type Response } from "express";
import globalErrorHandler from "./middleware/globalErrorHandler.ts";

const app = express();

// routes
app.get("/", (req, res, next) => {
    return res.json({ message: "Welcome bro." });
});


// Global error handler
app.use(globalErrorHandler);

export default app;

