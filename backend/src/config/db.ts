import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
        console.error("Error: MONGODB_URI is not defined in .env");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected ✅");
    } catch (error: any) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};
