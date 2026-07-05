import type { NextFunction, Request, Response } from "express";
import { BookModel } from "./bookModel.ts";
import createHttpError from "http-errors";
import path from "node:path";
import cloudinary from "../config/cloudinary.ts";
import type { AuthRequest } from "../middleware/authentication.ts";

const directory = import.meta.dirname;

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, genre } = req.body;

    if (!title || !description || !genre) {
        return next(createHttpError(400, "Credentials required."));
    }

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    if (!files?.coverImage?.[0] || !files?.file?.[0]) {
        return next(createHttpError(400, "file is required."));
    }

    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(directory, "../../public/data/uploads", fileName);

    try {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: "book-covers",
        });

        const bookFileName = files.file[0].filename;
        const bookFilePath = path.resolve(directory, "../../public/data/uploads", bookFileName);

        const bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath, {
            resource_type: "raw",
            filename_override: bookFileName,
            folder: "book-pdfs",
            format: "pdf"
        });

        const _req = req as AuthRequest;

        const newBook = await BookModel.create({
            title: title,
            description: description,
            author: { _id: _req.userId },
            genre: genre,
            coverImage: uploadResult.secure_url,
            file: bookFileUploadResult.secure_url,
        });

        res.status(201).json({
            message: "Book created successfully.",
            id: newBook._id
        });
    } catch (err) {
        return next(createHttpError(500, (err as Error).message));
    }
}

export { createBook };