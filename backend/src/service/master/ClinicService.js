
import ClinicMapper from "@mapper/master/ClinicMapper.js";
import ClinicRepo from "@repo/master/ClinicRepo.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
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
    static async getAllClinics({ authentication }) {
        const { orgRef } = authentication;
        const clinics = await ClinicRepo.findAllClinics(orgRef);

        return new ServiceResponse(STATUS_CODES.OK, null, {
            clinics
        });

    }

    /**
     * Fetch clinic by ID
     * @param {string} clinicId - Clinic ID
     * @returns {Promise<ServiceResponse>}
     */
    static async getClinicById({ id, authentication }) {
        const { orgRef } = authentication;

        const clinic = await ClinicRepo.findClinicById(id, orgRef);

        if (!clinic) {
            return new ServiceResponse(STATUS_CODES.NOT_FOUND, formatMsg(MESSAGES.NOT_FOUND, { label: "Clinic" }));
        }

        return new ServiceResponse(STATUS_CODES.OK, null, clinic);

    }

    /**
     * Create a new clinic
     * @param {Object} clinicData - Clinic data
     * @param {Object} authentication - Auth context containing orgCode
     * @returns {Promise<ServiceResponse>}
     */
    static async createClinic({ packet, authentication }) {
        const { orgRef } = authentication;

        const clinicData = ClinicMapper.createClinicMapper(packet, orgRef);

        await ClinicRepo.createClinic(clinicData);
        return new ServiceResponse(STATUS_CODES.OK, formatMsg(MESSAGES.CREATE, { label: "Clinic" }), null);

    }

    /**
     * Update clinic by ID
     * @param {string} clinicId - Clinic ID
     * @param {Object} updateData - Update data
     * @returns {Promise<ServiceResponse>}
     */
    static async updateClinic({ packet, authentication }) {
        const { orgRef } = authentication;

        const clinicData = ClinicMapper.updateClinicMapper(packet, orgRef);
        const updatedClinic = await ClinicRepo.updateClinic(packet.clinicId, clinicData);

        if (!updatedClinic) {
            return new ServiceResponse(STATUS_CODES.NOT_FOUND, formatMsg(MESSAGES.NOT_FOUND, { label: "Clinic" }));
        }

        return new ServiceResponse(STATUS_CODES.OK,formatMsg(MESSAGES.UPDATE, { label: "Clinic" }), null);

    }

    static async getNames({ authentication }) {
        const { orgRef } = authentication;
        const roles = await ClinicRepo.getNames(orgRef);
        return new ServiceResponse(
            STATUS_CODES.OK,
            null,
            roles
        );
    }


}
