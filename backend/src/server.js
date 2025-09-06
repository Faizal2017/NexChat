import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import mongoose from "mongoose";
dotenv.config();
const app = express();

app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URI;
const startServer = async () => {
  try {
    await mongoose.connect(MONGOURL); // Connect to MongoDB
    console.log("✅ Database Connected Successfully");

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server is Running on Port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
  }
};

// Start the server
startServer();

