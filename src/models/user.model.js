import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Token",
    },
    tokenCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
