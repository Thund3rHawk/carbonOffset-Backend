import express from "express";
import cors from "cors";
import app from "./src/app.js"; // Ensure the path to your app file is correct
import { v2 as cloudinary } from "cloudinary"; // Import cloudinary correctly

const PORT = process.env.PORT || 5000;

const server = express();

server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware for parsing JSON and URL-encoded form data
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Mount the app routes
server.use("/", app);

// Global error handling middleware
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: "An internal server error occurred",
    error: err.message,
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
