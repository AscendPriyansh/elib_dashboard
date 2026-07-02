import express from "express";
import { createUser } from "./userController.ts";

const userRouter = express.Router();

userRouter.post("/register", createUser);

// userRouter.post("/login", );

export default userRouter;