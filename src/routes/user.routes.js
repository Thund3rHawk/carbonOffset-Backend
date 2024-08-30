import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUserById,
  loginUser,
  logOut,
  refreshToken,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/verifyUser.js";

const router = Router();

router.post("/create-user", createUser);
router.post("/login", loginUser);
router.get("/refresh-token", refreshToken);
router.get("/get-user", verifyJWT, getUser);
router.get("/:id", getUserById);
router.get("/get-all-users", getAllUsers);
router.post("/logout", logOut);
router.put("/update-user", updateUser);
router.delete("/delete-user", deleteUser);

export default router;
