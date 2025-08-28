import OrgService from "@service/adminstrator/OrgService.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { HttpHandler } from "@utils/responseHandler.js";
import STATUS_CODES from "@utils/statusCodes.js";

const ORG_OPERATIONS = {
  GET_ALL: {
    serviceMethod: 'getAll',
    inputExtractor: (req) => ({}),
    operationName: 'Get all organizations'
  },
  CREATE: {
    serviceMethod: 'create',
    inputExtractor: (req) => ({ packet: req.body, authentication: req.auth }),
    operationName: 'Create organization'
  },
  UPDATE: {
    serviceMethod: 'update',
    inputExtractor: (req) => ({ packet: req.body }),
    operationName: 'Update organization'
  },
  UPDATE_ADMIN: {
    serviceMethod: 'updateAdmin',
    inputExtractor: (req) => ({ packet: req.body }),
    operationName: 'Update admin details'
  },
  GET_EDIT_DATA: {
    serviceMethod: 'getEditData',
    inputExtractor: (req) => ({ id: req.query.orgId }),
    operationName: 'Organization fetch'
  },
  GET_ADMIN_EDIT_DATA: {
    serviceMethod: 'getAdminEditData',
    inputExtractor: (req) => ({ id: req.query.id }),
    operationName: 'Get admin edit data'
  },
};

export default class OrgController {
  /**
   * Generic request handler with enhanced error handling and performance
   * @private
   */
  static async #handleRequest(req, res, operationConfig) {
    try {
      const input = operationConfig.inputExtractor(req);
      const result = await OrgService[operationConfig.serviceMethod](input);

      return HttpHandler.send(res, result);
    } catch (error) {
      console.error(`${operationConfig.operationName} Error:`, error);
      return HttpHandler.error(res, STATUS_CODES.INTERNAL_SERVER_ERROR, formatMsg(MESSAGES.TRY_AGAIN, { label: operationConfig.operationName }));
    }
  }

  /**
   * Get all organizations
   */
  static async getAll(req, res) {
    return OrgController.#handleRequest(req, res, ORG_OPERATIONS.GET_ALL);
  }

  /**
   * Get organization by ID
   */
  static async getById(req, res) {
    return OrgController.#handleRequest(req, res, ORG_OPERATIONS.GET_BY_ID);
  }

  /**
   * Create new organization
   */
  static async create(req, res) {
    return OrgController.#handleRequest(req, res, ORG_OPERATIONS.CREATE);
  }

  /**
   * Update organization details
   */
  static async update(req, res) {
    return OrgController.#handleRequest(req, res, ORG_OPERATIONS.UPDATE);
  }

  /**
   * Update admin details for organization
   */
  static async updateAdmin(req, res) {
    return OrgController.#handleRequest(req, res, ORG_OPERATIONS.UPDATE_ADMIN);
  }

  /**
   * Get organization data for editing
   */
  static async getEditData(req, res) {
    return OrgController.#handleRequest(req, res, ORG_OPERATIONS.GET_EDIT_DATA);
  }

  /**
   * Get admin data for editing
   */
  static async getAdminEditData(req, res) {
    return OrgController.#handleRequest(req, res, ORG_OPERATIONS.GET_ADMIN_EDIT_DATA);
  }
}