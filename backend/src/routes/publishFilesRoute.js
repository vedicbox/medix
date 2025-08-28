// routes/patientRoutes.js
import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(isAuthenticated);

// router.post("/consult-recept", PublishFilesController.consultReceptHandler);

export default router;

