import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import addProject from "./routes/addProject.routes.js";
import createCheckoutSession from "./routes/createCheckoutSession.routes.js";
import dashBoard from "./routes/dashboard.routes.js";
import token from "./routes/token.routes.js";
import user from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

// Connect to the database
connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Use the imported routes
app.use("/api/add-project", addProject);
app.use("/api/create-checkout-session", createCheckoutSession);
app.use("/api/token", token);
app.use("/api/user", user);
app.use("/api/dashboard", dashBoard);

export default app;
