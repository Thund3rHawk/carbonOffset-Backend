import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || // Correct way to access cookies
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).send({
        status: 401,
        message: "Access denied. No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      return res.status(401).send({
        status: 401,
        message: "Access denied. Invalid token",
      });
    }

    const user = await User.findById(decoded._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(404).send({
        status: 404,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};

export { verifyJWT };
