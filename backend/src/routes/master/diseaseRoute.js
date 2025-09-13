import { isAuthenticated } from "@middlewares/authMiddleware.js";
import express from "express";
import DiseaseController from "@controller/master/DiseaseController.js";

const router = express.Router();
router.use(isAuthenticated);

router.get("/fetch-all", DiseaseController.getAll);
router.post("/create", DiseaseController.create);
router.post("/update", DiseaseController.update);

export default router;