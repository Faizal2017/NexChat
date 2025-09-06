import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
dotenv.config();
const app = express();

app.use("/api/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT} ✅`);
});

