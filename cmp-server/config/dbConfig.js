import mongoose from "mongoose";
import { config } from "dotenv";
config()

export const connectDB=async()=>{
    try
    {
        await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log("DB is ready to connect...")
    }
    catch(err)
    {
        console.log("Mongo Error", err)
    }
}

export default connectDB