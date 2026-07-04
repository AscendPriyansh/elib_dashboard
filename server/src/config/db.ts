import mongoose from "mongoose";
import { config } from "./config.ts";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Connected to database successfully.");
        });

        mongoose.connection.on("error", (e) => {
            console.log("Error in connecting database.", e);
        });

        await mongoose.connect(config.db_uri as string)

    } catch(e) {
        console.error("Failed to connect to database.", e);
        process.exit(1);
    }
}

export default connectDB;