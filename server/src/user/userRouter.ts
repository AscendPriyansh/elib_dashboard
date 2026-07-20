import express from "express";
import { Register, Login, Profile } from "./userController.ts";
import authenticate from "../middleware/authentication.ts";

const userRouter = express.Router();

userRouter.post("/register", Register);
userRouter.post("/login", Login);

userRouter.post("/me", authenticate, Profile);
userRouter.patch("/profile", authenticate, Profile);

export default userRouter;