import type { NextFunction, Request, Response } from "express";
import { BookModel } from "./bookModel.ts";
import createHttpError from "http-errors";

const createBook = async(req: Request, res: Response, next: NextFunction) {
    const { title, description, author, genre, coverImage, file } = req.body;

    if(!title || !description || !author || !genre || !coverImage || !file) {
        return next(createHttpError(400, "Credentials required."));
    }
}

export { createBook };