import { Router } from "express";
import { createCheckoutSession } from "../controllers/createCheckoutSession.controllers.js";

const router = Router();

router.post("/", createCheckoutSession);

export default router;
