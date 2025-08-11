
import OrgService from "@service/adminstrator/OrgService.js";
import MESSAGES from "@utils/message.js";
import { HttpHandler } from "@utils/responseHandler.js";
import STATUS_CODES from "@utils/statusCodes.js";

export default class OrgController {

    static async create(req, res) {
        try {
            const authentication = req.auth;
            const response = await OrgService.create(req.body, authentication);
            return HttpHandler.send(res, response);
        } catch (error) {
            return HttpHandler.error(res, error, MESSAGES.GENERIC_ERROR);
        }
    }

    /**
 * Get all clinics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
    static async findAll(req, res) {
        try {
            const response = await OrgService.findAll();
            HttpHandler.send(res, response);
        } catch (error) {
            console.error("Error in Org controller:", error);
            HttpHandler.error(res, STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
        }
    }


}
