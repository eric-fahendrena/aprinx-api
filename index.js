import dotenv from "dotenv";
import { start } from "./server.js";

dotenv.config();
const PORT = process.env.PORT | 8000;
start(PORT);
