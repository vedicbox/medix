import PatientMapper from "@mapper/PatientMapper.js";
import PatientRepo from "@repo/PatientRepo.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { ServiceResponse } from "@utils/responseHandler.js";
import STATUS_CODES from "@utils/statusCodes.js";

/**
 * Service for patient management operations.
 * Handles creation, search, validation, assignment, and status updates for patients.
 */
export default class PatientService {
  /**
   * Creates a new patient with details, contact, and address.
   * @param {Object} input - { patientRequestDTO, authentication }
   * @returns {Promise<ServiceResponse>}
   */
  static async createPatientService({ packet, authentication }) {
    const { userRef, orgRef } = authentication;

    const patientDetails = PatientMapper.patientDetailsMapper(packet, userRef, orgRef);
    const patientContact = PatientMapper.patientContactMapper(packet);
    const patientAddress = PatientMapper.patientAddressMapper(packet);

    await PatientRepo.createPatient(
      patientDetails,
      patientContact,
      patientAddress
    );

    return new ServiceResponse(STATUS_CODES.OK, formatMsg(MESSAGES.CREATE, { label: "Patient" }), null);
  }

  static async editPatientService({ caseId, authentication }) {
    const { orgRef } = authentication;

    const payload = await PatientRepo.editPatient(caseId, orgRef, true);

    return new ServiceResponse(STATUS_CODES.OK, null, payload);

  }


  /**
   * Update a patient.
   * @param {Object} input - { patientRequestDTO, authentication }
   * @returns {Promise<ServiceResponse>}
   */
  static async updatePatientService({ packet, authentication }) {
    const { userRef, orgRef } = authentication;

    const patientDetails = PatientMapper.patientDetailsMapper(packet, userRef, orgRef);
    const patientContact = PatientMapper.patientContactMapper(packet);
    const patientAddress = PatientMapper.patientAddressMapper(packet);

    await PatientRepo.updatePatient(packet.caseId, patientDetails, patientContact, patientAddress);
    return new ServiceResponse(STATUS_CODES.OK, formatMsg(MESSAGES.UPDATE, { label: "Patient" }), null);
  }

  /**
   * Search patients by either caseId or phone number.
   * @param {Object} input - { searchVal, authentication }
   * @returns {Promise<ServiceResponse>}
   */
  static async searchPatientService({ searchVal, authentication }) {
    const { orgRef } = authentication;

    const patientData = await PatientRepo.searchPatient(searchVal, orgRef);
    if (!patientData.length) {
      return new ServiceResponse(STATUS_CODES.NOT_FOUND, formatMsg(MESSAGES.NOT_FOUND, { label: "Patient" }));
    }
    return new ServiceResponse(STATUS_CODES.OK, null, patientData);
  }

  /**
   * Validate patient by caseId.
   * @param {Object} input - { caseId }
   * @returns {Promise<ServiceResponse>}
   */
  static async validatePatientService(input) {
    const { caseId } = input;

    const validatePatient = await PatientRepo.validatePatientById(caseId);
    if (!validatePatient) {
      return new ServiceResponse(STATUS_CODES.NOT_FOUND, formatMsg(MESSAGES.NOT_FOUND, { label: "Patient" }));
    }
    return new ServiceResponse(STATUS_CODES.OK, null, validatePatient);

  }

  /**
   * Initiate consultation for a patient.
   * @param {Object} input - { consultationDTO, authentication }
   * @returns {Promise<ServiceResponse>}
   */
  static async initiateConsultationService({ packet, authentication }) {

    const assignPatientDao = PatientMapper.initiateConsultMapper(packet, authentication);
    await PatientRepo.initiateConsult(assignPatientDao);

    return new ServiceResponse(STATUS_CODES.OK, MESSAGES.PATIENT_ASSIGNED, null);

  }

  /**
   * Get list of align patients with status 0.
   * @param {Object} input - { authentication }
   * @returns {Promise<ServiceResponse>}
   */
  static async getAlignmentListService({ authentication }) {
    const alignPatients = await PatientRepo.getAlignPatientList();
    const responseData = PatientMapper.alignResponseMapper(alignPatients);
    return new ServiceResponse(STATUS_CODES.OK, null, responseData);

  }

  /**
   * Change status of an align patient.
   * @param {Object} input - { alignPatientId, status }
   * @returns {Promise<ServiceResponse>}
   */
  static async updateStatusService(input) {
    const { alignPatientId, status } = input;

    try {
      const updated = await PatientRepo.changeAlignPatientStatus(alignPatientId, status);
      if (!updated) {
        return new ServiceResponse(STATUS_CODES.NOT_FOUND, MESSAGES.ALIGN_PATIENT_NOT_FOUND);
      }
      return new ServiceResponse(STATUS_CODES.OK, MESSAGES.STATUS_UPDATED, updated);
    } catch (error) {
      console.error("Error updating align patient status:", error);
      return new ServiceResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.FAILED_TO_UPDATE_STATUS);
    }
  }


}