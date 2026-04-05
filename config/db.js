import mongoose from "mongoose";

const connectToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGO_URI from env:", process.env.MONGO_URI);
        console.log("Connect With MongoDB");   
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    }
}
export default connectToDB 