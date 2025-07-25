import RoleService from "../../service/auth/RoleService.js";
import MESSAGES from "../../utils/message.js";
import { HttpHandler } from "../../utils/responseHandler.js";

/**
 * Controller for role management endpoints.
 * Handles fetching, creating, updating, and editing roles and their permissions.
 */
export default class RoleController {
  /**
   * Fetch all role names.
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @returns {Promise<void>}
   */
  static async fetchRoleNames(req, res) {
    try {
      const response = await RoleService.fetchRoleNames();
      return HttpHandler.send(res, response);
    } catch (error) {
      return HttpHandler.error(res, error, MESSAGES.GENERIC_ERROR);
    }
  }

  /**
   * Create a new role.
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @returns {Promise<void>}
   */
  static async createRole(req, res) {
    try {
      const response = await RoleService.createRole(req.body);
      return HttpHandler.send(res, response);
    } catch (error) {
      return HttpHandler.error(res, error, MESSAGES.GENERIC_ERROR);
    }
  }

  /**
   * Update an existing role.
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @returns {Promise<void>}
   */
  static async updateRole(req, res) {
    try {
      const response = await RoleService.updateRole(req.body);
      return HttpHandler.send(res, response);
    } catch (error) {
      return HttpHandler.error(res, error, MESSAGES.GENERIC_ERROR);
    }
  }

  /**
   * Fetch the list of available roles (active roles).
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @returns {Promise<void>}
   */
  static async fetchTableRoles(req, res) {
    try {
      const response = await RoleService.fetchTableRoles();
      return HttpHandler.send(res, response);
    } catch (error) {
      return HttpHandler.error(res, error, MESSAGES.GENERIC_ERROR);
    }
  }

  /**
   * Update permissions for a role.
   * @param {import('express').Request} req - Express request object
   * @param {import('express').Response} res - Express response object
   * @returns {Promise<void>}
   */
  static async updateRolePermissions(req, res) {
    try {
      const { roleId, permissions } = req.body;
      const response = await RoleService.updateRolePermissions(roleId, permissions);
      return HttpHandler.send(res, response);
    } catch (error) {
      return HttpHandler.error(res, error, MESSAGES.GENERIC_ERROR);
    }
  }
}
