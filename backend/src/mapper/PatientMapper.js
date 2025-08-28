class PatientMapper {
  /**
   * Maps patient details from request to DAO format
   * @param {Object} request - Incoming request data
   * @param {string} userRef - Creating user ID
   * @param {string} orgRef - Organization reference
   * @returns {Object} - Mapped patient details object
   */
  static patientDetailsMapper(request, userRef, orgRef) {
    const { firstName, lastName, dob, gender, height, weight, age, martial } = request;
    return {
      firstName,
      lastName,
      dob,
      gender,
      height,
      weight,
      age,
      martial,
      createId: userRef,
      orgRef
    };
  }

  /**
   * Maps patient contact information from request to DAO format
   * @param {Object} request - Incoming request data
   * @returns {Object} - Mapped patient contact object
   */
  static patientContactMapper(request) {
    const { phone1, phone2, whatsappPref, email } = request;
    return {
      phone1,
      phone2,
      whatsappPref,
      email
    };
  }

  /**
   * Maps patient address from request to DAO format
   * @param {Object} request - Incoming request data
   * @returns {Object} - Mapped patient address object
   */
  static patientAddressMapper(request) {
    const { addr1, addr2, state, city, pincode, country } = request;
    return {
      addr1,
      addr2,
      state,
      city,
      pincode,
      country
    };
  }

  /**
   * Maps consultation DTO to DAO format
   * @param {Object} consultationDto - Consultation data
   * @param {Object} authentication - Auth context
   * @returns {Object} - Mapped consultation object
   */
  static initiateConsultMapper(consultationDto, authentication) {
    const { userRef, clinicRef, orgRef } = authentication;
    const { caseId, assignDoc: docId, fee, payMode: payTag, transId, publishReceipt } = consultationDto;
    
    return { 
      caseId, 
      docId, 
      fee, 
      payTag, 
      transId, 
      publishReceipt, 
      createId: userRef, 
      clinicRef, 
      orgRef 
    };
  }

  /**
   * Formats alignment patient response for API output
   * @param {Array|Object} data - Data from DB
   * @returns {Array|Object} - Formatted response data
   */
  static alignResponseMapper(data) {
    const mapper = item => ({
      ...item,
      caseId: item.caseId?._id || item.caseId,
      status: item.status === 0 ? 'Pending' : item.status,
      docId: item.docId?._id || item.docId
    });

    return Array.isArray(data) ? data.map(mapper) : mapper(data);
  }
}

export default PatientMapper;