import express, { type NextFunction, type Request, type Response } from "express";
import globalErrorHandler from "./middleware/globalErrorHandler.ts";
import userRouter from "./user/userRouter.ts";
import bookRouter from "./book/bookRouter.ts";
import cors from "cors";
import { config } from "./config/config.ts"

const app = express();
app.use(express.json());
app.use(cors({
    origin: config.frontend_domain
}));

// routes
app.get("/", (req, res, next) => {
    return res.json({ message: "Welcome bro." });
});

// LOGIN / REGISTER ROUTE
app.use("/auth", userRouter);

// BOOK / CRUD
app.use("/api/book", bookRouter); 


// Global error handler
app.use(globalErrorHandler);

export default app;

