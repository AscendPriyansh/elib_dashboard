import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { config } from "../config/config.ts";

export interface AuthRequest extends Request {
    userId: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const header = req.header("Authorization");
    if(!header) {
        return next(createHttpError(401, "Authorization token is required."));
    }

    try {
        const parsedToken = header.startsWith("Bearer ") ? header.split(" ")[1] : header;
        const decoded = jwt.verify(parsedToken as string, config.jwt_secret as string);
        const _req = req as AuthRequest;
        if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
            _req.userId = String((decoded as jwt.JwtPayload).id);
        } else {
            return next(createHttpError(401, "Invalid token."));
        }

        next();
    } catch(err) {
        return next(createHttpError(401, "Token expired."));
    }
}

export default authenticate;