
class PatientMapper {

    /**
     * Maps patient details from request to DAO format
     * @param {Object} request - Incoming request data
     * @param {string} userId - Creating user ID
     * @param {string} orgCode - Organization code
     * @returns {PatientDetails} - Mapped patient details object
     */
    static patientDetailsMapper(request, userId, orgCode) {
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
            createId: userId,
            orgCode
        };
    }

    /**
     * Maps patient contact information from request to DAO format
     * @param {Object} request - Incoming request data
     * @param {string} caseId - Patient case ID
     * @param {string} userId - Creating user ID
     * @returns {PatientContact} - Mapped patient contact object
     */
    static patientContactMapper(request, userId) {
        const { phone1, phone2, whatsappPref, email } = request;
        return {
            phone1,
            phone2,
            whatsappPref,
            email,
            createId: userId
        };
    }

    /**
     * Maps patient address from request to DAO format
     * @param {Object} request - Incoming request data
     * @param {string} caseId - Patient case ID
     * @param {string} userId - Creating user ID
     * @returns {PatientAddress} - Mapped patient address object
     */
    static patientAddressMapper(request, userId) {
        const { addr1, addr2, state, city, pincode, country } = request;
        return {
            addr1,
            addr2,
            state,
            city,
            pincode,
            country,
            createId: userId
        };
    }

    /**
     * Maps alignment patient DTO to DAO format
     * @param {Object} alignPatientDto - Data transfer object
     * @param {string} userId - Creating user ID
     * @returns {Object} - Mapped alignment object
     */
    static initiateConsultMapper(initiateConsultDto, userId) {
        const { caseId, assignDoc: docId, fee, payMode: payTag, transId, publishReceipt } = initiateConsultDto;
        return { caseId, docId, fee, payTag, transId, publishReceipt, createId: userId };
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