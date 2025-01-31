import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

export default app;
