import patientService from "@service/PatientService.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { HttpHandler } from "@utils/responseHandler.js";

const PATIENT_OPERATIONS = {
    SEARCH: {
        serviceMethod: 'searchPatientService',
        inputExtractor: (req) => ({
            searchVal: req.query.searchVal,
            authentication: req.auth
        }),
        operationName: 'Patient search'
    },
    CREATE: {
        serviceMethod: 'createPatientService',
        inputExtractor: (req) => ({
            packet: req.body,
            authentication: req.auth
        }),
        operationName: 'Patient creation'
    },
    UPDATE: {
        serviceMethod: 'updatePatientService',
        inputExtractor: (req) => ({
            packet: req.body,
            authentication: req.auth
        }),
        operationName: 'Patient update'
    },
    EDIT: {
        serviceMethod: 'editPatientService',
        inputExtractor: (req) => ({
            caseId: req.query.caseId,
            authentication: req.auth
        }),
        operationName: 'Patient update'
    },
    VALIDATE: {
        serviceMethod: 'validatePatientService',
        inputExtractor: (req) => ({
            caseId: req.query.caseId
        }),
        operationName: 'Patient validation'
    },
    INITIATE_CONSULTATION: {
        serviceMethod: 'initiateConsultationService',
        inputExtractor: (req) => ({
            packet: req.body,
            authentication: req.auth
        }),
        operationName: 'Consultation initiation'
    },
    GET_ALIGNMENT_LIST: {
        serviceMethod: 'getAlignmentListService',
        inputExtractor: (req) => ({
            authentication: req.auth
        }),
        operationName: 'Alignment list retrieval'
    },
    UPDATE_STATUS: {
        serviceMethod: 'updateStatusService',
        inputExtractor: (req) => ({
            alignPatientId: req.body.alignPatientId,
            status: req.body.status
        }),
        operationName: 'Status update'
    },
};

export default class PatientController {
    /**
     * Generic request handler with enhanced error handling and performance
     * @private
     */
    static async #handleRequest(req, res, operationConfig) {
        try {
            const input = operationConfig.inputExtractor(req);
            const result = await patientService[operationConfig.serviceMethod](input);

            return HttpHandler.send(res, result);
        } catch (error) {
            console.error(`${operationConfig.operationName} Error:`, error);
            return HttpHandler.error(res, error, formatMsg(MESSAGES.TRY_AGAIN, { label: operationConfig.operationName }));
        }
    }

    /**
     * Search patients by value (caseId or phone)
     */
    static async searchPatient(req, res) {
        return PatientController.#handleRequest(req, res, PATIENT_OPERATIONS.SEARCH);
    }

    /**
     * Create a new patient
     */
    static async createPatient(req, res) {
        return PatientController.#handleRequest(req, res, PATIENT_OPERATIONS.CREATE);
    }

    /**
     * Update a patient
     */
    static async updatePatient(req, res) {
        return PatientController.#handleRequest(req, res, PATIENT_OPERATIONS.UPDATE);
    }

    static async editPatient(req, res) {
        return PatientController.#handleRequest(req, res, PATIENT_OPERATIONS.EDIT);
    }

    /**
     * Validate a patient by caseId
     */
    static async validatePatient(req, res) {
        return PatientController.#handleRequest(req, res, PATIENT_OPERATIONS.VALIDATE);
    }

    /**
     * Initiate a consultation for a patient
     */
    static async initiateConsultation(req, res) {
        return PatientController.#handleRequest(req, res, PATIENT_OPERATIONS.INITIATE_CONSULTATION);
    }

    /**
     * Get list of align patients
     */
    static async getAlignmentList(req, res) {
        return PatientController.#handleRequest(req, res, PATIENT_OPERATIONS.GET_ALIGNMENT_LIST);
    }

    /**
     * Update status of an align patient
     */
    static async updateStatus(req, res) {
        return PatientController.#handleRequest(req, res, PATIENT_OPERATIONS.UPDATE_STATUS);
    }
}