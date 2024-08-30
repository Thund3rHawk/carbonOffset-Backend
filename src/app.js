import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import addProject from "./routes/addProject.routes.js";
import createCheckoutSession from "./routes/createCheckoutSession.routes.js";
import token from "./routes/token.routes.js";
import user from "./routes/user.routes.js";

dotenv.config();

const app = express();

// Connect to the database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the imported routes
app.use("/add-project", addProject);
app.use("/create-checkout-session", createCheckoutSession);
app.use("/token", token);
app.use("/user", user);

export default app;
