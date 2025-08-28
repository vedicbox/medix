import AuthController from "@controller/auth/AuthController.js";
import { isAuthenticated } from "@middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();

// User login
router.post("/login", AuthController.login);

router.use(isAuthenticated);

// // Validate authentication
router.get("/validate", AuthController.authCheck);

export default router;