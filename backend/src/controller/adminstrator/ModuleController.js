import ModuleService from "@service/adminstrator/ModuleService.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { HttpHandler } from "@utils/responseHandler.js";

const MODULE_OPERATIONS = {
  GET_ALL: {
    serviceMethod: 'getAll',
    inputExtractor: () => ({}),
    operationName: 'Get all modules',
  },
  CREATE: {
    serviceMethod: 'create',
    inputExtractor: (req) => ({ packet: req.body }),
    operationName: 'Create module',
  },
  UPDATE: {
    serviceMethod: 'update',
    inputExtractor: (req) => ({ packet: req.body }),
    operationName: 'Update module',
  },
  GET_JSON: {
    serviceMethod: 'getJson',
    inputExtractor: () => ({}),
    operationName: 'Get modules JSON',
  }
};

export default class ModuleController {
  /**
   * Generic request handler
   * @private
   */
  static async #handleRequest(req, res, operationConfig) {
    try {
      const input = operationConfig.inputExtractor(req);
      const result = await ModuleService[operationConfig.serviceMethod](input);
      return HttpHandler.send(res, result);
    } catch (error) {
      console.error(`${operationConfig.operationName} Error:`, error);
      return HttpHandler.error(res, error, formatMsg(MESSAGES.TRY_AGAIN, { label: operationConfig.operationName }));
    }
  }

  static async getAll(req, res) {
    return ModuleController.#handleRequest(req, res, MODULE_OPERATIONS.GET_ALL);
  }

  static async create(req, res) {
    return ModuleController.#handleRequest(req, res, MODULE_OPERATIONS.CREATE);
  }

  static async update(req, res) {
    return ModuleController.#handleRequest(req, res, MODULE_OPERATIONS.UPDATE);
  }

  static async getJson(req, res) {
    return ModuleController.#handleRequest(req, res, MODULE_OPERATIONS.GET_JSON);
  }
}
