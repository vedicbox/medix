import ClinicDao from "@models/master/ClinicDao.js";
import { parseToMongoId } from "@utils/parse.js";
import { DATE_TIME_ENUM } from "../../enum/parserEnum.js";

export default class ClinicRepo {
    /**
     * Find clinics by organization code
     * @param {string} orgCode - Organization code
     * @returns {Promise<Array<Object>>} Array of clinic objects
     */
    static async findActiveClinics(orgRef) {
        return await ClinicDao.find({ orgRef, status: true })
            .select('name _id')
            .lean()
            .exec();
    }

    /**
     * Find all clinics
     * @returns {Promise<Array<Object>>} Array of all clinic objects
     */
    static async findAllClinics(orgRef) {

        return await ClinicDao.aggregate([
            {
                $match: {
                    orgRef: parseToMongoId(orgRef)
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    status: 1,
                    email: 1,
                    phone1: 1,
                    createdAt: { $dateToString: { format: DATE_TIME_ENUM.DEFAULT, date: "$createdAt" } },

                }
            }
        ]);

    }

    /**
     * Find clinic by ID
     * @param {string} clinicId - Clinic ID
     * @returns {Promise<Object|null>} Clinic object or null
     */
    static async findClinicById(clinicRef, orgRef) {
        return await ClinicDao.findOne({
            _id: clinicRef,
            orgRef,
            status: 1
        })
            .lean()
            .exec();
    }

    /**
     * Create a new clinic
     * @param {Object} clinicData - Clinic data
     * @returns {Promise<Object>} Created clinic object
     */
    static async createClinic(clinicData) {
        const clinic = new ClinicDao(clinicData);
        return await clinic.save();
    }

    /**
     * Update clinic by ID
     * @param {string} clinicId - Clinic ID
     * @param {Object} updateData - Update data
     * @returns {Promise<Object|null>} Updated clinic object or null
     */
    static async updateClinic(clinicRef, updateData) {
        return await ClinicDao.findByIdAndUpdate(clinicRef, updateData, {
            new: true,
            runValidators: true
        });
    }

    static async getNames(orgRef) {
        return ClinicDao.find({ orgRef, status: 1 })
            .select('name _id')
            .lean();
    }

    static async isExists(query) {
        const finalQuery = { ...query };
        return ClinicDao.exists(finalQuery);
    }


}
