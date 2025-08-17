import StaffMeetingService from "../service/StaffMeetingService.js";
import { HttpHandler } from "../utils/responseHandler.js";

export default class StaffMeetingController {
    /**
     * Create a new staff meeting
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {ResponseHandler}
    */
    static async create(req, res) {
        try {
            const authentication = req.auth;
            const response = await StaffMeetingService.create(req.body, authentication);
            return HttpHandler.send(res, response);
        } catch (error) {
            return HttpHandler.error(res, error);
        }
    }

    /**
      * Fetch all staff meeting for tabular view
      * @param {Object} req - Express request object
      * @param {Object} res - Express response object
      * @returns {ResponseHandler}
      */
    static async fetchAll(req, res) {
        try {
            const authentication = req.auth;
            const response = await StaffMeetingService.fetchAll();
            return HttpHandler.send(res, response);
        } catch (error) {
            return HttpHandler.error(res, error);
        }
    }
}