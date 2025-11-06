import mongoose from "mongoose";
import { User } from "../models/user.js";

const MONGO_URI = process.env.MONGODB_URI

let isConnected = false;
export default async function dbConnection() {
    try {
        if (isConnected) {
            console.log("✅ MongoDB is already connected");
            return;
        }
        await mongoose.connect(MONGO_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        isConnected = true;
        console.log("✅ MongoDB connection successful");

        try {
            await User.init();
            console.log("User indexes ensured ✅");
        } catch (error) {
            console.error("Index creation error:", error);
        }
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
    }
};
