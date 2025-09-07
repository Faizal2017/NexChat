import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";
import cors from "cors";

dotenv.config();

const app = express();

// Parsers (place before routes)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend url
    credentials: true, // allow cookies
  })
);

// Routes
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URI;

const startServer = async () => {
  try {
    await mongoose.connect(MONGOURL); // Connect to MongoDB
    console.log("✅ Database Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server is Running on Port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
