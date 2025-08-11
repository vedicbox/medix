import StaffService from "../service/StaffService.js";
import { HttpHandler } from "../utils/responseHandler.js";

export default class StaffController {
  /**
   * Create a new staff profile
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {ResponseHandler}
   */
  static async createStaffProfile(req, res) {
    try {
      const authentication = req.auth;
      const response = await StaffService.createStaffProfile(req.body, authentication);
      return HttpHandler.send(res, response);
    } catch (error) {
      return HttpHandler.error(res, error);
    }
  }

  /**
   * Edit an existing staff profile (fetch details for editing)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {ResponseHandler}
   */
  static async editStaffProfile(req, res) {
    try {
      const authentication = req.auth;
      const response = await StaffService.editStaffProfile(req.query.staffId, authentication);
      return HttpHandler.send(res, response);
    } catch (error) {
      return HttpHandler.error(res, error);
    }
  }

  /**
   * Update an existing staff profile
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {ResponseHandler}
   */
  static async updateStaffProfile(req, res) {
    try {
      const authentication = req.auth;
      const response = await StaffService.updateStaffProfile(req.body, authentication);
      return HttpHandler.send(res, response);
    } catch (error) {
      return HttpHandler.error(res, error);
    }
  }

  /**
   * Fetch all staff details for tabular view
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {ResponseHandler}
   */
  static async fetchAllStaff(req, res) {
    try {
      const authentication = req.auth;
      const response = await StaffService.fetchAll(authentication);
      return HttpHandler.send(res, response);
    } catch (error) {
      return HttpHandler.error(res, error);
    }
  }

  /**
 * Fetch staff list (name and ID) by role name
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {ResponseHandler}
 */
  static async fetchStaffListByRole(req, res) {
    try {
      const { roleName } = req.query;
      const response = await StaffService.fetchStaffListByRole(roleName);
      return HttpHandler.send(res, response);
    } catch (error) {
      return HttpHandler.error(res, error);
    }
  }
}
