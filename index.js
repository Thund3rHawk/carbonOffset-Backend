import express from "express";
import cors from "cors";
import app from "./src/app.js"; // Ensure the path to your app file is correct
import { v2 as cloudinary } from "cloudinary"; // Import cloudinary correctly

const PORT = process.env.PORT || 5000;

const server = express();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const allowedOrigins = ["http://localhost:5173"];

server.use(cors());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/", app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
