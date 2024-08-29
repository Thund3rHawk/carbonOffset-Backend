import { Router } from "express";
import { generateToken } from "../controllers/token.controllor.js";

const router = Router();

router.post("/", generateToken);

export default router;
