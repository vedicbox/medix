import AlignPatientDao from "../models/patient/AlignPatientDao.js";
import PatientAddressDao from "../models/patient/PatientAddressDao.js";
import PatientContactDao from "../models/patient/PatientContactDao.js";
import PatientDetailDao from "../models/patient/PatientDetailDao.js";


export default class PatientRepo {

    static async createPatient(patientDetails, patientContact, patientAddress) {
        const patientDetailDao = new PatientDetailDao(patientDetails);
        const patientDetailResult = await patientDetailDao.save();

        patientContact.caseId = patientDetailResult._id;
        patientAddress.caseId = patientDetailResult._id;

        const patientContactDao = new PatientContactDao(patientContact);
        const patientAddressDao = new PatientAddressDao(patientAddress);

        await patientContactDao.save();
        await patientAddressDao.save();

        return patientDetailResult;

    }

    static async findByPhone(phoneNumber) {
        return PatientContactDao.aggregate([
            {
                $match: {
                    $or: [{ phone1: phoneNumber }, { phone2: phoneNumber }],
                },
            },
            {
                $lookup: {
                    from: "patient_details",
                    localField: "caseId",
                    foreignField: "_id",
                    as: "details",
                },
            },
            {
                $unwind: {
                    path: "$details",
                    preserveNullAndEmptyArrays: false,
                },
            },
            {
                $project: {
                    _id: 0,
                    caseId: "$caseId",
                    gender: "$details.gender",
                    age: "$details.age",
                    patientName: {
                        $trim: {
                            input: {
                                $concat: ["$details.firstName", " ", "$details.lastName"],
                            },
                        },
                    },

                },
            },
        ]);
    }

    static async validatePatientById(caseId) {
        const patient = await PatientDetailDao.findOne(
            { _id: caseId },
            { firstName: 1, lastName: 1 }
        ).lean(); // Using `.lean()` for faster plain JS object

        if (!patient) return null; // Early return if no patient found

        const { _id, ...rest } = patient;
        return { ...rest, caseId: _id }; // Destructure and rename _id → caseId
    }

    /**
     * Get contact details by caseId
     * @param {string} caseId - The case ID of the patient
     * @returns {Promise<Object|null>}
     */
    static async getContactByCaseId(caseId) {
        return PatientContactDao.findOne({ caseId }).lean();
    }

    /**
     * Update contact details by caseId
     * @param {Object} contactData - The updated contact data
     * @returns {Promise<Object|null>}
     */
    static async updateContactByCaseId(contactData) {
        const { caseId, ...updateFields } = contactData;

        return PatientContactDao.findOneAndUpdate(
            { caseId },
            { $set: updateFields },
            { new: true } // Return the updated document
        ).lean();
    }

    /**
     * Get patient details by caseId
     * @param {string} caseId - The case ID of the patient
     * @returns {Promise<Object|null>}
     */
    static async getPatientDetailsByCaseId(caseId) {
        return PatientDetailDao.findOne({ _id: caseId }).lean();
    }

    /**
     * Update patient details by caseId
     * @param {Object} patientData - The updated patient data
     * @returns {Promise<Object|null>}
     */
    static async updatePatientDetailsByCaseId(patientData) {
        const { caseId, ...updateFields } = patientData;

        return PatientDetailDao.findOneAndUpdate(
            { _id: caseId },
            { $set: updateFields },
            { new: true,runValidators: true } // Return the updated document
        ).lean();
    }

    /**
     * Save patient assignment to the database
     * @param {Object} alignPatientDao - DAO object for patient assignment
     * @returns {Promise<void>}
     */
    static async alignPatient(assignPatientDao) {
        const assignPatient = new AlignPatientDao(assignPatientDao);
        await assignPatient.save();
    }

    /**
     * Get list of align patients with status 0, populate doctor name and patient name
     * @returns {Promise<Array>}
     */
    static async getAlignPatientList() {
        return AlignPatientDao.aggregate([
            { $match: { status: 0 } },
            {
                $lookup: {
                    from: "users",
                    localField: "docId",
                    foreignField: "_id",
                    as: "doctor"
                }
            },
            { $unwind: "$doctor" },
            {
                $lookup: {
                    from: "patient_details",
                    localField: "caseId",
                    foreignField: "_id",
                    as: "patient"
                }
            },
            { $unwind: "$patient" },
            {
                $lookup: {
                    from: "patient_contacts",
                    localField: "caseId",
                    foreignField: "caseId", // <-- corrected field
                    as: "contact"
                }
            },
            { $unwind: { path: "$contact", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    _id: 1,
                    caseId: "$caseId",
                    docId: "$docId",
                    fee: 1,
                    payTag: 1,
                    status: 1,
                    created_at: 1,
                    updated_at: 1,
                    patientName: {
                        $concat: [
                            { $ifNull: ["$patient.firstName", ""] },
                            " ",
                            { $ifNull: ["$patient.lastName", ""] }
                        ]
                    },
                    doctorName: {
                        $concat: [
                            { $ifNull: ["$doctor.firstName", ""] },
                            " ",
                            { $ifNull: ["$doctor.lastName", ""] }
                        ]
                    },
                    phone1: "$contact.phone1"
                }
            }
        ]);
    }


    /**
     * Change status of an align patient by _id
     * @param {string} alignPatientId
     * @param {number|string} status
     * @returns {Promise<Object|null>}
     */
    static async changeAlignPatientStatus(alignPatientId, status) {
        return AlignPatientDao.findByIdAndUpdate(
            alignPatientId,
            { $set: { status } },
            { new: true }
        ).lean();
    }

}


