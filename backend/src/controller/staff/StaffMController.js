import StaffMService from "@service/staff/StaffMService.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { HttpHandler } from "@utils/responseHandler.js";

const STAFF_MEETING_OPERATIONS = {
    CREATE_MEETING: {
        serviceMethod: 'create',
        inputExtractor: (req) => ({ packet: req.body, authentication: req.auth }),
        operationName: 'Create staff meeting'
    },
    FETCH_ALL_MEETINGS: {
        serviceMethod: 'fetchAll',
        inputExtractor: (req) => ({ packet: req.query, authentication: req.auth }),
        operationName: 'Fetch all staff meetings'
    }
};

export default class StaffMController {
    /**
     * Generic request handler with enhanced error handling and performance
     * @private
     */
    static async #handleRequest(req, res, operationConfig) {
        try {
            const input = operationConfig.inputExtractor(req);
            const result = await StaffMService[operationConfig.serviceMethod](input);
            return HttpHandler.send(res, result);
        } catch (error) {
            console.error(`${operationConfig.operationName} Error:`, error);
            return HttpHandler.error(res, error, formatMsg(MESSAGES.TRY_AGAIN, { label: operationConfig.operationName }));
        }
    }

    /**
     * Create a new staff meeting
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {ResponseHandler}
     */
    static async create(req, res) {
        return StaffMController.#handleRequest(req, res, STAFF_MEETING_OPERATIONS.CREATE_MEETING);
    }

    /**
     * Fetch all staff meetings for tabular view
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {ResponseHandler}
     */
    static async fetchAll(req, res) {
        return StaffMController.#handleRequest(req, res, STAFF_MEETING_OPERATIONS.FETCH_ALL_MEETINGS);
    }
}