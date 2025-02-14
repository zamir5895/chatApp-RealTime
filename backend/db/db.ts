import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () =>{
    try{
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in the environment variables");
        }
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected");
    }catch(err){
        console.log("Error connecting to MongoDB");
        console.error(err);
        process.exit(1);
    }
}

export {connectDB, mongoose};