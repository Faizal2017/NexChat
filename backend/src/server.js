import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";
dotenv.config();

import path from "path";

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

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URI;
const __dirname = path.resolve();

// Routes
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/:catchAll(*)", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const startServer = async () => {
  try {
    await mongoose.connect(MONGOURL); // Connect to MongoDB
    console.log("✅ Database Connected Successfully");

    server.listen(PORT, () => {
      console.log(`🚀 Server is Running on Port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
