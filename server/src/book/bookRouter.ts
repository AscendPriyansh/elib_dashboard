import express from "express";
import { createBook } from "./bookController.ts";
import multer from "multer";
import path from "node:path";
import authenticate from "../middleware/authentication.ts";

const bookRouter = express.Router();

const directory = import.meta.dirname;
const upload = multer({
    dest: path.resolve(directory, "../../public/data/uploads"),
    limits: { fileSize: 3e7 }
});

bookRouter.post("/", authenticate, upload.fields([
    {name: "coverImage", maxCount: 1},
    {name: "file", maxCount: 1},
]), createBook);

export default bookRouter;