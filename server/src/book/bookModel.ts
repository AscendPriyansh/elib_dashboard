import { Schema, model} from "mongoose";
import type { Book } from "./bookTypes.ts";
import { string } from "zod";

const bookSchema = new Schema<Book>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true
    },
    file: {
        type: String,
        requied: true,
    }
}, {timestamps: true});

export const BookModel = model<Book>('Book', bookSchema);