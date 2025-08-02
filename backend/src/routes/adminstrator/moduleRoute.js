import express from "express";
import { isAuthenticated } from "@middlewares/authMiddleware.js";
import ModuleController from "@controller/adminstrator/ModuleController.js";

const router = express.Router();

router.use(isAuthenticated);

router.get("/find-all", ModuleController.findAllModules);
router.post("/create", ModuleController.createModule);
router.post("/update", ModuleController.updateModule);

export default router;


