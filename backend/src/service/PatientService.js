import PatientMapper from "../mapper/PatientMapper.js";
import PatientRepo from "../repo/PatientRepo.js";
import MESSAGES from "../utils/message.js";
import { ServiceResponse } from "../utils/responseHandler.js";
import STATUS_CODES from "../utils/statusCodes.js";
import { generateRecept } from "../generator/recept/index.js";

/**
 * Service for patient management operations.
 * Handles creation, search, validation, assignment, and status updates for patients.
 */
export default class PatientService {
  /**
   * Creates a new patient with details, contact, and address.
   * @param {Object} request - Patient data
   * @param {Object} authentication - Auth context containing userId
   * @returns {Promise<ServiceResponse>}
   */
  static async createPatientService(request, authentication) {

    const { userId, orgCode } = authentication;

    const patientDetails = PatientMapper.patientDetailsMapper(request, userId, orgCode);
    const patientContact = PatientMapper.patientContactMapper(request, userId);
    const patientAddress = PatientMapper.patientAddressMapper(request, userId);

    const response = await PatientRepo.createPatient(patientDetails, patientContact, patientAddress);

    return new ServiceResponse(STATUS_CODES.OK, MESSAGES.PATIENT_REGISTERED, response);


  }

  /**
   * Update a patient.
   * @param {Object} request - Patient data
   * @param {Object} authentication - Auth context containing userId
   * @returns {Promise<ServiceResponse>}
   */
  static async updatePatientService(request, authentication) {
    const { userId, orgCode } = authentication;
    const patientDetails = PatientMapper.patientDetailsMapper(request, userId, orgCode);
    const patientContact = PatientMapper.patientContactMapper(request, userId);
    const patientAddress = PatientMapper.patientAddressMapper(request, userId);
    const response = await PatientRepo.updatePatient(patientDetails, patientContact, patientAddress);
    return new ServiceResponse(STATUS_CODES.OK, MESSAGES.PATIENT_UPDATED, response);
  }

  /**
   * Search patients by either caseId or phone number.
   * @param {string} searchValue - The value to search for
   * @returns {Promise<ServiceResponse>}
   */
  static async searchPatientService(searchValue) {
    try {
      const patientData = await PatientRepo.findByPhone(searchValue);
      if (!patientData.length) {
        return new ServiceResponse(STATUS_CODES.NOT_FOUND, MESSAGES.NO_PATIENTS_FOUND);
      }
      return new ServiceResponse(STATUS_CODES.OK, null, patientData);
    } catch (error) {
      console.error("Search patient error:", error);
      return new ServiceResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.PATIENT_SEARCH_FAILED);
    }
  }

  /**
   * Validate patient by caseId.
   * @param {string} caseId - The case ID of the patient
   * @returns {Promise<ServiceResponse>}
   */
  static async validatePatientService(caseId) {
    try {
      const validatePatient = await PatientRepo.validatePatientById(caseId);
      if (!validatePatient) {
        return new ServiceResponse(STATUS_CODES.NOT_FOUND, MESSAGES.PATIENT_NOT_FOUND);
      }
      return new ServiceResponse(STATUS_CODES.OK, null, validatePatient);
    } catch (error) {
      console.error("Validate patient error:", error);
      return new ServiceResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.PATIENT_VALIDATE_FAILED);
    }
  }

  /**
   * Assign a patient to a doctor.
   * @param {Object} alignPatientDTO - Data transfer object for assigning a patient
   * @param {Object} authentication - Auth context containing userId
   * @returns {Promise<ServiceResponse>}
   */
  static async initiateConsultService(alignPatientDTO, authentication) {
    try {
      const { userId } = authentication;
      // Map DTO to DAO
      const assignPatientDao = PatientMapper.initiateConsultMapper(
        alignPatientDTO,
        userId
      );
    
      // Save the assignment in the database
      const savedResponse = await PatientRepo.initiateConsult(assignPatientDao);

      if (savedResponse && savedResponse.publishReceipt) {
        const recept = generateRecept(savedResponse);
      }

      return new ServiceResponse(STATUS_CODES.OK, MESSAGES.PATIENT_ASSIGNED, null);
    } catch (error) {
      console.error("Error assigning patient:", error);
      return new ServiceResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.PATIENT_ASSIGN_FAILED);
    }
  }

  /**
   * Get list of align patients with status 0.
   * @returns {Promise<ServiceResponse>}
   */
  static async getAlignPatientListService() {
    try {
      const alignPatients = await PatientRepo.getAlignPatientList();

      const responseData = PatientMapper.alignResponseMapper(alignPatients);

      return new ServiceResponse(STATUS_CODES.OK, null, responseData);
    } catch (error) {
      console.error("Error fetching align patient list:", error);
      return new ServiceResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, MESSAGES.FETCH_ALIGN_PATIENT_LIST_FAILED);
    }
  }

  /**
   * Change status of an align patient.
   * @param {string} alignPatientId - Align patient ID
   * @param {number|string} status - New status value
   * @returns {Promise<ServiceResponse>}
   */
  static async changeAlignPatientStatusService(alignPatientId, status) {
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
