
import ClinicRepo from "../../repo/master/ClinicRepo.js";
import MESSAGES from "../../utils/message.js";
import { ServiceResponse } from "../../utils/responseHandler.js";
import STATUS_CODES from "../../utils/statusCodes.js";
import ClinicMapper from "../../mapper/ClinicMapper.js";

/**
 * Service for clinic management operations.
 * Handles creation, retrieval, update, and deletion of clinics.
 */
export default class ClinicService {

    /**
     * Fetch clinics by organization code
     * @param {string} orgCode - Organization code
     * @returns {Promise<ServiceResponse>}
     */
    static async getClinicList(authentication) {

        const { orgCode } = authentication;

        const clinics = await ClinicRepo.findClinicsByOrgCode(orgCode);

        return new ServiceResponse(STATUS_CODES.OK, MESSAGES.CLINICS_FETCHED_SUCCESSFULLY, clinics);

    }

    /**
     * Fetch all clinics
     * @returns {Promise<ServiceResponse>}
     */
    static async getAllClinics(authentication) {
        const { orgCode } = authentication;
        const clinics = await ClinicRepo.findAllClinics(orgCode);

        return new ServiceResponse(STATUS_CODES.OK, MESSAGES.CLINICS_FETCHED_SUCCESSFULLY, {
            clinics,
            count: clinics.length
        });

    }

    /**
     * Fetch clinic by ID
     * @param {string} clinicId - Clinic ID
     * @returns {Promise<ServiceResponse>}
     */
    static async getClinicById(clinicId, authentication) {

        const { orgCode } = authentication;
        if (!clinicId) {
            return new ServiceResponse(STATUS_CODES.BAD_REQUEST, "Clinic ID is required");
        }

        const clinic = await ClinicRepo.findClinicById(clinicId, orgCode);

        if (!clinic) {
            return new ServiceResponse(STATUS_CODES.NOT_FOUND, "Clinic not found");
        }

        return new ServiceResponse(STATUS_CODES.OK, MESSAGES.CLINIC_FETCHED_SUCCESSFULLY, clinic);

    }

    /**
     * Create a new clinic
     * @param {Object} clinicData - Clinic data
     * @param {Object} authentication - Auth context containing orgCode
     * @returns {Promise<ServiceResponse>}
     */
    static async createClinic(rawData, authentication) {

        const { orgCode } = authentication;

        if (!orgCode) {
            return new ServiceResponse(STATUS_CODES.BAD_REQUEST, "Organization code is required");
        }

        const clinicData = ClinicMapper.createClinicMapper(rawData, orgCode);    

        const newClinic = await ClinicRepo.createClinic(clinicData);

        return new ServiceResponse(STATUS_CODES.CREATED, MESSAGES.CLINIC_CREATED_SUCCESSFULLY, newClinic);

    }

    /**
     * Update clinic by ID
     * @param {string} clinicId - Clinic ID
     * @param {Object} updateData - Update data
     * @returns {Promise<ServiceResponse>}
     */
    static async updateClinic(clinicId, updateData) {

        if (!clinicId) {
            return new ServiceResponse(STATUS_CODES.BAD_REQUEST, "Clinic ID is required");
        }

        const clinicData = ClinicMapper.updateClinicMapper(updateData, orgCode);

        const updatedClinic = await ClinicRepo.updateClinic(clinicId, clinicData);

        if (!updatedClinic) {
            return new ServiceResponse(STATUS_CODES.NOT_FOUND, "Clinic not found");
        }

        return new ServiceResponse(STATUS_CODES.OK, MESSAGES.CLINIC_UPDATED_SUCCESSFULLY, updatedClinic);

    }


}
