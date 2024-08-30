import { Router } from "express";
import {
  createCheckoutSession,
  createCheckoutSessionForTokenPurchase,
} from "../controllers/createCheckoutSession.controllers.js";
import { verifyJWT } from "../middleware/verifyUser.js";

const router = Router();

router.post("/", createCheckoutSession);
router.post(
  "/token-purchase",
  verifyJWT,
  createCheckoutSessionForTokenPurchase
);

export default router;
