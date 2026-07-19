import type { NextFunction, Request, Response } from "express";
import { UserModel } from "./userModel.ts";
import bcrypt from "bcrypt";
import { config } from "../config/config.ts";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

const Register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(createHttpError(400, "Invalid Credentials."));
        }

        const userExist = await UserModel.findOne({ email: email });

        if (userExist) {
            return next(createHttpError(409, "User with this email already exist."));
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
        return next(createHttpError(500, "Internal server error."));
    }
}

const Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(createHttpError(400, "Invalid Credentials."));
        }

        const userExist = await UserModel.findOne({ email: email });

        if (!userExist) {
            return next(createHttpError(400, "User doesn't exist."));
        }

        const isPasswordValid = await bcrypt.compare(password, userExist.password);

        if (!isPasswordValid) {
            return next(createHttpError(401, "Invalid Credentials."));
        }

        const token = jwt.sign({ id: userExist._id.toString() }, config.jwt_secret as string, { expiresIn: "7d" });

        return res.status(200).json({
            message: "Login successful.",
            token: token,
            user: {
                name: userExist.name,
                email: userExist.email
            }
        });

    } catch (err) {
        return next(createHttpError(500, "Internal server error."));
    }
}

export { Register, Login };