import PublicFilesService from "../service/PublicFilesService.js";
import { HttpHandler } from "../utils/responseHandler.js";
import MESSAGES from "../utils/message.js";

/**
 * Controller for patient management endpoints.
 * Handles patient creation, search, validation, assignment, and status updates.
 */
export default class PublishFilesController {
  /**
   * Generate a recept
   * @route POST /publish/generate-recept
   */
  static async consultReceptHandler(req, res) {
    try {
      const response = await PublicFilesService.consultRecept(req.body);
      return HttpHandler.send(res, response);
    } catch (error) {
      return HttpHandler.error(res, error, MESSAGES.GENERIC_ERROR);
    }
  }
}
