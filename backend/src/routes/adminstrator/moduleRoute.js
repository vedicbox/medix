import ModuleController from "@controller/adminstrator/ModuleController.js";
import { isAuthenticated } from "@middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();
router.use(isAuthenticated);

router.get("/fetch-all", ModuleController.getAll);
router.post("/create", ModuleController.create);
router.post("/update", ModuleController.update);
router.get("/json", ModuleController.getJson);

export default router;