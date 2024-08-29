import mongoose from "mongoose";

// Token History Schema
const tokenHistorySchema = new mongoose.Schema(
  {
    // tokenOwner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    tokenValue: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "Transaction",
    },
    status: {
      type: String,
      enum: ["active", "inActive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Main Token Schema
const tokenSchema = new mongoose.Schema(
  {
    // tokenOwner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    tokenValue: {
      type: Number,
      required: true,
      default: 10,
    },
    tokenHistory: {
      type: [tokenHistorySchema],
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "inActive"],
      default: "active",
    },
    expirationDate: {
      type: Date,
      default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
    description: {
      type: String,
      default: "Token management for user",
    },
  },
  { timestamps: true }
);

const Token = mongoose.model("Token", tokenSchema);

export default Token;
