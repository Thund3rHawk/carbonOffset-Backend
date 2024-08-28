import projectModel from "../models/project.model.js";
import { getDataUri } from "../utils/feature.js";
import { v2 as cloudinary } from "cloudinary";
import crypto from "crypto";

// Create a new project
export const createProject = async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  try {
    let userImg = {};

    if (req.file) {
      try {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const stringToSign = `timestamp=${timestamp}`;
        const signature = crypto
          .createHash("sha1")
          .update(stringToSign + process.env.CLOUDINARY_API_SECRET)
          .digest("hex");

        const result = await cloudinary.uploader.upload(req.file.path, {
          timestamp: timestamp,
          api_key: process.env.CLOUDINARY_API_KEY,
          signature: signature,
        });
        userImg.public_id = result.public_id;
        userImg.secure_url = result.secure_url;
      } catch (error) {
        console.error("Cloudinary upload failed:", error);
        // Handle the error, possibly returning a response indicating failure
      }
    }

    const project = await projectModel.create({
      name: req.body.name,
      location: req.body.location,
      userCount: req.body.userCount,
      details: req.body.details,
      image: userImg,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Get project by ID

export const getProjectById = async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get all projects

export const getAllProjects = async (req, res) => {
  try {
    const projects = await projectModel.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await projectModel.findByIdAndDelete(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
