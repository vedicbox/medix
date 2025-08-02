
import ClinicService from "../../service/master/ClinicService.js";
import MESSAGES from "../../utils/message.js";
import { HttpHandler } from "../../utils/responseHandler.js";
import STATUS_CODES from "../../utils/statusCodes.js";

/**
 * Controller for clinic management endpoints.
 * Handles clinic creation, retrieval, update, and deletion.
 */
export default class ClinicController {

    /**
     * Get clinics by organization code
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async getClinicList(req, res) {
        try {
            const authentication = req.auth;
            const response = await ClinicService.getClinicList(authentication);
            HttpHandler.send(res, response);
        } catch (error) {
            console.error("Error in getClinicList controller:", error);
            HttpHandler.error(res, STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get all clinics
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async fetchAll(req, res) {
        try {
            const authentication = req.auth;
            const response = await ClinicService.getAllClinics(authentication);
            HttpHandler.send(res, response);
        } catch (error) {
            console.error("Error in getAllClinics controller:", error);
            HttpHandler.error(res, STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Get clinic by ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async fetchById(req, res) {
        try {
            const authentication = req.auth;
            const { clinicId } = req.params;
            const response = await ClinicService.getClinicById(clinicId, authentication);
            HttpHandler.send(res, response);
        } catch (error) {
            console.error("Error in getClinicById controller:", error);
            HttpHandler.error(res, STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Create a new clinic
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async create(req, res) {
        try {
            const clinicData = req.body;
            const authentication = req.auth;
            const response = await ClinicService.createClinic(clinicData, authentication);
            HttpHandler.send(res, response);
        } catch (error) {
            console.error("Error in createClinic controller:", error);
            HttpHandler.error(res, STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update clinic by ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async update(req, res) {
        try {
            const updateData = req.body;
            const authentication = req.auth;
            const response = await ClinicService.updateClinic(updateData, authentication);
            HttpHandler.send(res, response);
        } catch (error) {
            console.error("Error in updateClinic controller:", error);
            HttpHandler.error(res, STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.INTERNAL_SERVER_ERROR);
        }
    }


}
