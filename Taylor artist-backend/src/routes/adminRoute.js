import express from "express";
import { login, verifyToken, changePassword } from "../controllers/adminController.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/login", login);

// Protected routes
router.get("/verify", verifyAdmin, verifyToken);
router.post("/change-password", verifyAdmin, changePassword);

export default router;
