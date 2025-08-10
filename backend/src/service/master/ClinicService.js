
import ClinicMapper from "@mapper/ClinicMapper.js";
import ClinicRepo from "@repo/master/ClinicRepo.js";
import MESSAGES from "@utils/message.js";
import { ServiceResponse } from "@utils/responseHandler.js";
import STATUS_CODES from "@utils/statusCodes.js";

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

        const { orgRef } = authentication;
        const clinics = await ClinicRepo.findActiveClinics(orgRef);

        return new ServiceResponse(STATUS_CODES.OK, MESSAGES.CLINICS_FETCHED_SUCCESSFULLY, clinics);

    }

    /**
     * Fetch all clinics
     * @returns {Promise<ServiceResponse>}
     */
    static async getAllClinics(authentication) {
        const { orgRef } = authentication;
        const clinics = await ClinicRepo.findAllClinics(orgRef);

        return new ServiceResponse(STATUS_CODES.OK, MESSAGES.CLINICS_FETCHED_SUCCESSFULLY, {
            clinics
        });

    }

    /**
     * Fetch clinic by ID
     * @param {string} clinicId - Clinic ID
     * @returns {Promise<ServiceResponse>}
     */
    static async getClinicById(clinicId, authentication) {

        const { orgRef } = authentication;
        if (!clinicId) {
            return new ServiceResponse(STATUS_CODES.BAD_REQUEST, "Clinic ID is required");
        }

        const clinic = await ClinicRepo.findClinicById(clinicId, orgRef);

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

        const { orgRef } = authentication;

        const clinicData = ClinicMapper.createClinicMapper(rawData, orgRef);

        const newClinic = await ClinicRepo.createClinic(clinicData);

        return new ServiceResponse(STATUS_CODES.OK, MESSAGES.CLINIC_CREATED_SUCCESSFULLY, newClinic);

    }

    /**
     * Update clinic by ID
     * @param {string} clinicId - Clinic ID
     * @param {Object} updateData - Update data
     * @returns {Promise<ServiceResponse>}
     */
    static async updateClinic(rawData, authentication) {
        const { orgRef } = authentication;

        if (!rawData.clinicId) {
            return new ServiceResponse(STATUS_CODES.BAD_REQUEST, "Clinic ID is required");
        }

        const clinicData = ClinicMapper.updateClinicMapper(rawData, orgRef);

        const updatedClinic = await ClinicRepo.updateClinic(rawData.clinicId, clinicData);

        if (!updatedClinic) {
            return new ServiceResponse(STATUS_CODES.NOT_FOUND, "Clinic not found");
        }

        return new ServiceResponse(STATUS_CODES.OK, MESSAGES.CLINIC_UPDATED_SUCCESSFULLY, updatedClinic);

    }


}
