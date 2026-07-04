import express from "express";
import { Register, Login } from "./userController.ts";

const userRouter = express.Router();

userRouter.post("/register", Register);
userRouter.post("/login", Login);

// userRouter.post("/login", );

export default userRouter;