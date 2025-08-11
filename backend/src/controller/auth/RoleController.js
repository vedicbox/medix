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
      const authentication = req.auth;
      const response = await RoleService.findActiveRoles(authentication);
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
      const authentication = req.auth;
      const response = await RoleService.createRole(req.body, authentication);
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
      const authentication = req.auth;
      const response = await RoleService.updateRole(req.body, authentication);
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
  static async fetchAll(req, res) {
    try {
      const authentication = req.auth;
      const response = await RoleService.fetchAll(authentication);
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
      const authentication = req.auth;
      const response = await RoleService.updateRolePermissions(req.body, authentication);
      return HttpHandler.send(res, response);
    } catch (error) {
      return HttpHandler.error(res, error, MESSAGES.GENERIC_ERROR);
    }
  }
}
