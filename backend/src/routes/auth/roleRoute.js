import RoleController from "@controller/auth/RoleController.js";
import { isAuthenticated } from "@middlewares/authMiddleware.js";
import express from "express";

const router = express.Router();
router.use(isAuthenticated);

// Get all roles
router.get("/fetch-all", RoleController.getAll);

//  Get role names only
router.get("/names", RoleController.getNames);

//  Get admin roles
router.get("/admin-list", RoleController.getAdminList);

//  Create a new role
router.post("/create", RoleController.create);

//  Update role
router.post("/update", RoleController.update);

//  Update role permissions
router.post("/update-permissions", RoleController.updatePermissions);

export default router;