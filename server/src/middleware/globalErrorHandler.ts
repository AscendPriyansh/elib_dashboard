import { config } from "../config/config.ts";
import { type NextFunction, type Request, type Response } from "express";
import createHttpError, { HttpError } from "http-errors";

const globalErrorHandler = ((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        message: err.message,
        errorStack: config.env === "development" ? err.stack : ""
    });
});

export default globalErrorHandler;