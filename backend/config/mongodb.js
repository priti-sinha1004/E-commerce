import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Mongoose v6+ automatically uses new URL parser and unified topology
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
