import patientService from "../service/PatientService.js";
import MESSAGES from "../utils/message.js";
import { HttpHandler } from "../utils/responseHandler.js";
import STATUS_CODES from "../utils/statusCodes.js";

/**
 * Controller for patient management endpoints.
 * Handles patient creation, search, validation, assignment, and status updates.
 */
export default class PatientController {
    /**
     * Create a new patient.
     * @param {import('express').Request} req - Express request object
     * @param {import('express').Response} res - Express response object
     * @returns {Promise<void>}
     */
    static async createPatient(req, res) {
        try {
            const patientRequestDTO = req.body;
            const authentication = req.auth;
            const response = await patientService.createPatientService(
                patientRequestDTO,
                authentication
            );
            return HttpHandler.send(res, response);
        } catch (error) {
            return HttpHandler.error(res, error, MESSAGES.GENERIC_ERROR);
        }
    }

    /**
     * Search patients by value (caseId or phone).
     * @param {import('express').Request} req - Express request object
     * @param {import('express').Response} res - Express response object
     * @returns {Promise<void>}
     */
    static async searchPatient(req, res) {
        const { searchVal } = req.query;
        if (!searchVal) {
            return HttpHandler.error(
                res,
                MESSAGES.VALIDATION_FAILED,
                STATUS_CODES.BAD_REQUEST
            );
        }
        try {
            const response = await patientService.searchPatientService(searchVal);
            return HttpHandler.send(res, response);
        } catch (error) {
            return HttpHandler.error(res, error, MESSAGES.GENERIC_ERROR);
        }
    }

    /**
     * Validate a patient by caseId.
     * @param {import('express').Request} req - Express request object
     * @param {import('express').Response} res - Express response object
     * @returns {Promise<void>}
     */
    static async validatePatient(req, res) {
        const { caseId } = req.query;
        if (!caseId) {
            return HttpHandler.error(res, MESSAGES.CASE_ID_REQUIRED, STATUS_CODES.BAD_REQUEST);
        }
        try {
            const response = await patientService.validatePatientService(caseId);
            return HttpHandler.send(res, response);
        } catch (error) {
            return HttpHandler.error(res, error, MESSAGES.GENERIC_ERROR);
        }
    }

    /**
     * Assign a patient to a doctor.
     * @param {import('express').Request} req - Express request object
     * @param {import('express').Response} res - Express response object
     * @returns {Promise<void>}
     */
    static async alignPatient(req, res) {
        try {
            const alignPatientDTO = req.body;
            const authentication = req.auth;
            const response = await patientService.alignToDocService(
                alignPatientDTO,
                authentication
            );
            return HttpHandler.send(res, response);
        } catch (error) {
            return HttpHandler.error(res, error, MESSAGES.GENERIC_ERROR);
        }
    }

    /**
     * Get list of align patients with status 0.
     * @param {import('express').Request} req - Express request object
     * @param {import('express').Response} res - Express response object
     * @returns {Promise<void>}
     */
    static async alignPatientList(req, res) {
        try {
            const response = await patientService.getAlignPatientListService();
            return HttpHandler.send(res, response);
        } catch (error) {
            return HttpHandler.error(res, error, MESSAGES.GENERIC_ERROR);
        }
    }

    /**
     * Change status of an align patient.
     * @param {import('express').Request} req - Express request object
     * @param {import('express').Response} res - Express response object
     * @returns {Promise<void>}
     */
    static async changeStatus(req, res) {
        const { alignPatientId, status } = req.body;
        if (!alignPatientId || typeof status === "undefined") {
            return HttpHandler.error(res, MESSAGES.ALIGN_PATIENT_ID_STATUS_REQUIRED, STATUS_CODES.BAD_REQUEST);
        }
        try {
            const response = await patientService.changeAlignPatientStatusService(alignPatientId, status);
            return HttpHandler.send(res, response);
        } catch (error) {
            return HttpHandler.error(res, error, MESSAGES.GENERIC_ERROR);
        }
    }
}
