import express from "express";
import RoleController from "../../controller/auth/RoleController.js";
import { isAuthenticated } from "@middlewares/authMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(isAuthenticated);

/**
 * Route to fetch roles
 * @route GET /fetch/roles
 */
router.get("/fetch/roleNames", RoleController.fetchRoleNames);

/**
 * Route to create a new role
 * @route POST /create/role
 */
router.post("/create", RoleController.createRole);

/**
 * Route to update an existing role
 */
router.post("/update", RoleController.updateRole);

/**
 * Route to update permissions for a role
 * @route POST /update/permissions
 */
router.post("/update/permissions", RoleController.updateRolePermissions);

/**
 * Route to fetch available roles (active roles)
 * @route GET /fetch/availableRoles
 */
router.get("/fetchAll", RoleController.fetchAll);



export default router;