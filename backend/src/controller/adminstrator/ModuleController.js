import ModuleService from "@service/adminstrator/ModuleService.js";
import { HttpHandler } from "@utils/responseHandler.js";

export default class ModuleController {
  /**
   * Find all modules
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {ResponseHandler}
   */
  static async findAllModules(req, res) {
    try {
      const response = await ModuleService.findAllModules();
      return HttpHandler.send(res, response);
    } catch (error) {
      return HttpHandler.error(res, error);
    }
  }

  /**
   * Create a new module
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {ResponseHandler}
   */
  static async createModule(req, res) {
    try {
      const response = await ModuleService.createModule(req.body);
      return HttpHandler.send(res, response);
    } catch (error) {
      return HttpHandler.error(res, error);
    }
  }

  /**
   * Update a module
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @returns {ResponseHandler}
   */
  static async updateModule(req, res) {
    try {
      const moduleId = req.params.id;
      const response = await ModuleService.updateModule(moduleId, req.body);
      return HttpHandler.send(res, response);
    } catch (error) {
      return HttpHandler.error(res, error);
    }
  }
}
