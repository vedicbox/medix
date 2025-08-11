import AlignPatientDao from "@models/patient/AlignPatientDao.js";
import PatientAddressDao from "@models/patient/PatientAddressDao.js";
import PatientContactDao from "@models/patient/PatientContactDao.js";
import PatientDetailDao from "@models/patient/PatientDetailDao.js";
import { parseToMongoId } from "@utils/parse.js";


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

    static async updatePatient(patientDetails, patientContact, patientAddress) {


        return patientDetailDao;
    }

    static async findByPhone(phoneNumber, orgRef) {
        return PatientContactDao.aggregate([
            {
                $match: {
                    $or: [
                        { phone1: phoneNumber },
                        { phone2: phoneNumber }
                    ]
                }
            },
            {
                $lookup: {
                    from: "patient_details",
                    let: { caseId: "$caseId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$caseId"] },
                                orgRef: parseToMongoId(orgRef)
                            }
                        },
                        { $limit: 1 }
                    ],
                    as: "patient"
                }
            },
            {
                $unwind: {
                    path: "$patient",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $project: {
                    _id: 0,
                    caseId: "$patient._id",
                    gender: "$patient.gender",
                    age: "$patient.age",
                    patientName: {
                        $trim: {
                            input: {
                                $concat: [
                                    "$patient.firstName",
                                    " ",
                                    "$patient.lastName"
                                ]
                            }
                        }
                    }
                }
            }
        ]);
    }
    static async validatePatientById(caseId) {
        const patient = await PatientDetailDao.findOne(
            { _id: caseId },
            { firstName: 1, lastName: 1 }
        ).lean();

        if (!patient) return null;

        const { _id, ...rest } = patient;
        return { ...rest, caseId: _id }; 
    }


    static async getContactByCaseId(caseId) {
        return PatientContactDao.findOne({ caseId }).lean();
    }

    static async updateContactByCaseId(contactData) {
        const { caseId, ...updateFields } = contactData;

        return PatientContactDao.findOneAndUpdate(
            { caseId },
            { $set: updateFields },
            { new: true }
        ).lean();
    }


    static async getPatientDetailsByCaseId(caseId) {
        return PatientDetailDao.findOne({ _id: caseId }).lean();
    }

    static async updatePatientDetailsByCaseId(patientData) {
        const { caseId, ...updateFields } = patientData;

        return PatientDetailDao.findOneAndUpdate(
            { _id: caseId },
            { $set: updateFields },
            { new: true, runValidators: true }
        ).lean();
    }

    static async initiateConsult(assignPatientDao) {
        const existing = await AlignPatientDao.findOne({ caseId: assignPatientDao.caseId, status: { $ne: 0 } });
        if (existing) {
            return null;
        }
        const assignPatient = new AlignPatientDao(assignPatientDao);
        return await assignPatient.save();
    }

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

    static async changeAlignPatientStatus(alignPatientId, status) {
        return AlignPatientDao.findByIdAndUpdate(
            alignPatientId,
            { $set: { status } },
            { new: true }
        ).lean();
    }

}


