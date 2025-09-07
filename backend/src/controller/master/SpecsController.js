import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { HttpHandler } from "@utils/responseHandler.js";
import SpecsService from "../../service/master/SpecsService.js";

const SPECS_OPERATIONS = {
  GET_ALL: {
    serviceMethod: 'getAll',
    inputExtractor: (req) => ({ authentication: req.auth }),
    operationName: 'Get all specialization'
  },
  CREATE: {
    serviceMethod: 'create',
    inputExtractor: (req) => ({ packet: req.body, authentication: req.auth }),
    operationName: 'Create specialization'
  },  
  GET_NAMES: {
    serviceMethod: 'getNames',
    inputExtractor: (req) => ({ authentication: req.auth }),
    operationName: 'Get specialization names'
  },
  UPDATE: {
    serviceMethod: 'update',
    inputExtractor: (req) => ({ packet: req.body, authentication: req.auth }),
    operationName: 'Specialization updation'
  }
};

export default class SpecsController {
  /**
   * Generic request handler with enhanced error handling and performance
   * @private
   */
  static async #handleRequest(req, res, operationConfig) {
    try {
      const input = operationConfig.inputExtractor(req);
      const result = await SpecsService[operationConfig.serviceMethod](input);

      return HttpHandler.send(res, result);
    } catch (error) {
      console.error(`${operationConfig.operationName} Error:`, error);
      return HttpHandler.error(res, error, formatMsg(MESSAGES.TRY_AGAIN, { label: operationConfig.operationName }));
    }
  }

  /**
   * Get all specialization
   */
  static async getAll(req, res) {
    return SpecsController.#handleRequest(req, res, SPECS_OPERATIONS.GET_ALL);
  }
  /**
   * Create a new specialization
   */
  static async create(req, res) {
    return SpecsController.#handleRequest(req, res, SPECS_OPERATIONS.CREATE);
  }
  
  /**
   * Get only specialization names (for dropdowns/selectors)
   */
  static async getNames(req, res) {
    return SpecsController.#handleRequest(req, res, SPECS_OPERATIONS.GET_NAMES);
  } 
  /**
   * Update specialization
   */
  static async update(req, res) {
        return SpecsController.#handleRequest(req, res, SPECS_OPERATIONS.UPDATE);
  }
}