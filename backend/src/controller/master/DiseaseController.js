import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { HttpHandler } from "@utils/responseHandler.js";
import DiseaseService from "../../service/master/DiseaseService.js";

const DISEASE_OPERATIONS = {
    GET_ALL: {
        serviceMethod: 'getAll',
        inputExtractor: () => ({}),
        operationName: 'Get all diseases',
    },
    CREATE: {
        serviceMethod: 'create',
        inputExtractor: (req) => ({ packet: req.body }),
        operationName: 'Create disease',
    },
    UPDATE: {
        serviceMethod: 'update',
        inputExtractor: (req) => ({ packet: req.body }),
        operationName: 'Update disease',
    }
};

export default class DiseaseController {
    /**
     * Generic request handler
     * @private
     */
    static async #handleRequest(req, res, operationConfig) {
        try {
            const input = operationConfig.inputExtractor(req);
            const result = await DiseaseService[operationConfig.serviceMethod](input);
            return HttpHandler.send(res, result);
        } catch (error) {
            console.error(`${operationConfig.operationName} Error:`, error);
            return HttpHandler.error(res, error, formatMsg(MESSAGES.TRY_AGAIN, { label: operationConfig.operationName }));
        }
    }

    static async getAll(req, res) {
        return DiseaseController.#handleRequest(req, res, DISEASE_OPERATIONS.GET_ALL);
    }

    static async create(req, res) {
        return DiseaseController.#handleRequest(req, res, DISEASE_OPERATIONS.CREATE);
    }

    static async update(req, res) {
        return DiseaseController.#handleRequest(req, res, DISEASE_OPERATIONS.UPDATE);
    }

}