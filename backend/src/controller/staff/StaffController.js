import StaffService from "@service/staff/StaffService.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { HttpHandler } from "@utils/responseHandler.js";

const STAFF_OPERATIONS = {
  CREATE_PROFILE: {
    serviceMethod: 'createStaffProfile',
    inputExtractor: (req) => ({ packet: req.body, authentication: req.auth }),
    operationName: 'Create staff profile'
  },
  GET_BY_ID: {
    serviceMethod: 'editStaffProfile',
    inputExtractor: (req) => ({ staffId: req.query.staffId, authentication: req.auth }),
    operationName: 'Get staff by ID'
  },
  UPDATE_PROFILE: {
    serviceMethod: 'updateStaffProfile',
    inputExtractor: (req) => ({ packet: req.body, authentication: req.auth }),
    operationName: 'Update staff profile'
  },
  FETCH_ALL_STAFF: {
    serviceMethod: 'fetchAllStaff',
    inputExtractor: (req) => ({ authentication: req.auth }),
    operationName: 'Fetch all staff'
  },
  FETCH_BY_ROLE: {
    serviceMethod: 'fetchStaffListByRole',
    inputExtractor: (req) => ({ roleName: req.query.roleName,authentication: req.auth }),
    operationName: 'Fetch staff by role'
  }
};

export default class StaffController {
  /**
   * Generic request handler with enhanced error handling and performance
   * @private
   */
  static async #handleRequest(req, res, operationConfig) {
    try {
      const input = operationConfig.inputExtractor(req);
      const result = await StaffService[operationConfig.serviceMethod](input);

      return HttpHandler.send(res, result);
    } catch (error) {
      console.error(`${operationConfig.operationName} Error:`, error);
      return HttpHandler.error(res, error, formatMsg(MESSAGES.TRY_AGAIN, { label: operationConfig.operationName }));
    }
  }

  /**
   * Create a new staff profile
   */
  static async createStaffProfile(req, res) {
    return StaffController.#handleRequest(req, res, STAFF_OPERATIONS.CREATE_PROFILE);
  }

  /**
   * Get staff details by ID
   */
  static async getStaffById(req, res) {
    return StaffController.#handleRequest(req, res, STAFF_OPERATIONS.GET_BY_ID);
  }

  /**
   * Update an existing staff profile
   */
  static async updateStaffProfile(req, res) {
    return StaffController.#handleRequest(req, res, STAFF_OPERATIONS.UPDATE_PROFILE);
  }

  /**
   * Fetch all staff details for tabular view
   */
  static async fetchAllStaff(req, res) {
    return StaffController.#handleRequest(req, res, STAFF_OPERATIONS.FETCH_ALL_STAFF);
  }

  /**
   * Fetch staff list by role name
   */
  static async fetchStaffListByRole(req, res) {
    return StaffController.#handleRequest(req, res, STAFF_OPERATIONS.FETCH_BY_ROLE);
  }
}