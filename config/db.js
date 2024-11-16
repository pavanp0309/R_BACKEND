import mongoose from "mongoose";
import dotenv from "dotenv"

// config the env
dotenv.config()

let connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb connected successfully")
    } catch (error) {
        console.log("mongodb failed to connect",error.name)
        process.exit(1)
    }
}

export default connectDB;