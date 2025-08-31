import AlignPatientDao from "@models/patient/AlignPatientDao.js";
import PatientAddressDao from "@models/patient/PatientAddressDao.js";
import PatientContactDao from "@models/patient/PatientContactDao.js";
import PatientDetailDao from "@models/patient/PatientDetailDao.js";
import { parseToMongoId } from "@utils/parse.js";
import { DATE_TIME_ENUM } from "../enum/parserEnum.js";

export default class PatientRepo {
    /**
     * Create a new patient with details, contact, and address
     */
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

    /**
     * Update an existing patient
     */
    static async updatePatient(caseId, patientDetails, patientContact, patientAddress) {
        // Update patient details
        const updatedPatient = await PatientDetailDao.findByIdAndUpdate(
            caseId,
            { $set: patientDetails },
            { new: true, runValidators: true }
        );

        if (!updatedPatient) {
            throw new Error('Patient not found');
        }

        // Prepare secondary updates
        const secondaryUpdates = [];

        if (patientContact) {
            secondaryUpdates.push(
                PatientContactDao.findOneAndUpdate(
                    { caseId },
                    { $set: patientContact },
                    { new: true, runValidators: true }
                ).catch(error => {
                    throw new Error(`Failed to update contact: ${error.message}`);
                })
            );
        }

        if (patientAddress) {
            secondaryUpdates.push(
                PatientAddressDao.findOneAndUpdate(
                    { caseId },
                    { $set: patientAddress },
                    { new: true, runValidators: true }
                ).catch(error => {
                    throw new Error(`Failed to update address: ${error.message}`);
                })
            );
        }

        // Execute secondary updates
        if (secondaryUpdates.length > 0) {
            await Promise.all(secondaryUpdates);
        }

        return updatedPatient;
    }

    /**
     * Find patients by phone number
     */
    static async searchPatient(phoneNumber, orgRef) {
        return PatientContactDao.aggregate([
            {
                $match: {
                    $or: [{ phone1: phoneNumber }, { phone2: phoneNumber }]
                }
            },
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
                $match: {
                    "patient.orgRef": parseToMongoId(orgRef)
                }
            },
            {
                $project: {
                    _id: 0,
                    caseId: "$patient._id",
                    gender: "$patient.gender",
                    age: "$patient.age",
                    patientName: {
                        $concat: ["$patient.firstName", " ", "$patient.lastName"]
                    }
                }
            }
        ]);
    }

    /**
     * Validate patient by ID
     */
    static async validatePatientById(caseId) {
        const patient = await PatientDetailDao.findOne(
            { _id: caseId },
            { firstName: 1, lastName: 1 }
        ).lean();

        if (!patient) return null;

        const { _id, ...rest } = patient;
        return { ...rest, caseId: _id };
    }

    /**
     * Get contact by case ID
     */
    static async getContactByCaseId(caseId) {
        return PatientContactDao.findOne({ caseId }).lean();
    }

    /**
     * Update contact by case ID
     */
    static async updateContactByCaseId(contactData) {
        const { caseId, ...updateFields } = contactData;

        return PatientContactDao.findOneAndUpdate(
            { caseId },
            { $set: updateFields },
            { new: true }
        ).lean();
    }

    /**
     * Get patient details by case ID
     */
    static async getPatientDetailsByCaseId(caseId) {
        return PatientDetailDao.findOne({ _id: caseId }).lean();
    }

    /**
     * Update patient details by case ID
     */
    static async updatePatientDetailsByCaseId(patientData) {
        const { caseId, ...updateFields } = patientData;

        return PatientDetailDao.findOneAndUpdate(
            { _id: caseId },
            { $set: updateFields },
            { new: true, runValidators: true }
        ).lean();
    }

    /**
     * Initiate consultation for a patient
     */
    static async initiateConsult(assignPatientDao) {
        const existing = await AlignPatientDao.findOne({
            caseId: assignPatientDao.caseId,
            status: { $ne: 0 }
        });

        if (existing) {
            return null;
        }

        const assignPatient = new AlignPatientDao(assignPatientDao);
        return await assignPatient.save();
    }

    static async editPatient(caseId, orgRef, includeContact = false) {
        const parsedCaseId = parseToMongoId(caseId);
        const parsedOrgRef = parseToMongoId(orgRef);

        const aggregationPipeline = [
            {
                $match: {
                    _id: parsedCaseId,
                    orgRef: parsedOrgRef
                }
            },
            {
                $lookup: {
                    from: "patient_addresses",
                    localField: "_id",
                    foreignField: "caseId",
                    as: "address"
                }
            },
            {
                $unwind: {
                    path: "$address",
                    preserveNullAndEmptyArrays: true
                }
            }
        ];

        if (includeContact) {
            aggregationPipeline.push(
                {
                    $lookup: {
                        from: "patient_contacts",
                        localField: "_id",
                        foreignField: "caseId",
                        as: "contact"
                    }
                },
                {
                    $unwind: {
                        path: "$contact",
                        preserveNullAndEmptyArrays: true
                    }
                }
            );
        }

        // Merge all objects into one using $mergeObjects
        aggregationPipeline.push({
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [
                        // Base patient document
                        "$$ROOT",
                        // Address object (remove if null)
                        { $ifNull: ["$address", {}] },
                        // Contact object (only if includeContact is true)
                        {
                            $cond: {
                                if: { $eq: [includeContact, true] },
                                then: { $ifNull: ["$contact", {}] },
                                else: {}
                            }
                        }
                    ]
                }
            }
        });

        // Remove the nested objects that were merged
        aggregationPipeline.push({
            $project: {
                address: 0,
                contact: 0
            }
        });

        const result = await PatientDetailDao.aggregate(aggregationPipeline);

        if (result.length === 0) {
            throw new Error('Patient not found or does not belong to this organization');
        }

        return result[0];
    }


    /**
     * Get alignment patient list
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
                    foreignField: "caseId",
                    as: "contact"
                }
            },
            { $unwind: { path: "$contact", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    _id: 1,
                    caseId: 1,
                    docId: 1,
                    fee: 1,
                    status: 1,
                    createdAt: { $dateToString: { format: DATE_TIME_ENUM.DEFAULT, date: "$createdAt" } },
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
     * Change alignment patient status
     */
    static async changeAlignPatientStatus(alignPatientId, status) {
        return AlignPatientDao.findByIdAndUpdate(
            alignPatientId,
            { $set: { status } },
            { new: true }
        ).lean();
    }
}