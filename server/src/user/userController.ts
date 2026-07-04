import type { NextFunction, Request, Response } from "express";
import { UserModel } from "./userModel.ts";
import bcrypt from "bcrypt";
import { config } from "../config/config.ts";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

const Register = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required");
        return next(error);
    }
    try {

        const userExist = await UserModel.findOne({ email: email });

        if (userExist) {
            const error = createHttpError(400, "User already exists with this email.");
            return next(error);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        const { password: _, ...userWithoutPassword } = user.toObject();

        return res.status(201).json({
            message: "User created successfully.",
            user: userWithoutPassword
        });

    } catch (err) {
        return next(createHttpError(500, "Internal Server Error."));
    }
}

const Login = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = createHttpError(400, "All fields are required");
            return next(error);
        }

    try {
        const userExist = await UserModel.findOne({ email: email });

        if (!userExist) {
            return res.status(404).json({
                message: "User doesn't exist."
            });
        }

        const isPasswordValid = await bcrypt.compare(password, userExist.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials."
            });
        }

        const token = jwt.sign({ id: userExist._id.toString() }, config.jwt_secret as string, { expiresIn: "7d" });

        return res.status(200).json({
            message: "Login successful.",
            token: token
        });

    } catch (err) {
        return next(createHttpError(400, "Internal Server Error."));
    }
}

export { Register, Login };