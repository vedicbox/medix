import ClinicService from "@service/master/ClinicService.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { HttpHandler } from "@utils/responseHandler.js";

const CLINIC_OPERATIONS = {
    GET_LIST: {
        serviceMethod: 'getClinicList',
        inputExtractor: (req) => ({ authentication: req.auth }),
        operationName: 'Get clinic list',
    },
    GET_ALL: {
        serviceMethod: 'getAllClinics',
        inputExtractor: (req) => ({ authentication: req.auth }),
        operationName: 'Get all clinics',
    },
    GET_BY_ID: {
        serviceMethod: 'getClinicById',
        inputExtractor: (req) => ({ id: req.query.clinicId, authentication: req.auth }),
        operationName: 'Get clinic by ID',
    },
    CREATE: {
        serviceMethod: 'createClinic',
        inputExtractor: (req) => ({ packet: req.body, authentication: req.auth }),
        operationName: 'Create clinic',
    },
    UPDATE: {
        serviceMethod: 'updateClinic',
        inputExtractor: (req) => ({ packet: req.body, authentication: req.auth }),
        operationName: 'Update clinic',
    },
    GET_NAMES: {
        serviceMethod: 'getNames',
        inputExtractor: (req) => ({ authentication: req.auth }),
        operationName: 'Get clinic names'
    },
};

export default class ClinicController {
    /**
     * Generic request handler for ClinicController
     * @private
     */
    static async #handleRequest(req, res, operationConfig) {
        try {
            const input = operationConfig.inputExtractor(req);
            const result = await ClinicService[operationConfig.serviceMethod](input);

            return HttpHandler.send(res, result);
        } catch (error) {
            console.error(`${operationConfig.operationName} Error:`, error);
            return HttpHandler.error(
                res,
                error,
                formatMsg(MESSAGES.TRY_AGAIN, { label: operationConfig.operationName })
            );
        }
    }

    static async getClinicList(req, res) {
        return ClinicController.#handleRequest(req, res, CLINIC_OPERATIONS.GET_LIST);
    }

    static async fetchAll(req, res) {
        return ClinicController.#handleRequest(req, res, CLINIC_OPERATIONS.GET_ALL);
    }

    static async getClinicById(req, res) {
        return ClinicController.#handleRequest(req, res, CLINIC_OPERATIONS.GET_BY_ID);
    }

    static async create(req, res) {
        return ClinicController.#handleRequest(req, res, CLINIC_OPERATIONS.CREATE);
    }

    static async update(req, res) {
        return ClinicController.#handleRequest(req, res, CLINIC_OPERATIONS.UPDATE);
    }

    static async getNames(req, res) {
        return ClinicController.#handleRequest(req, res, CLINIC_OPERATIONS.GET_NAMES);
    }

}
