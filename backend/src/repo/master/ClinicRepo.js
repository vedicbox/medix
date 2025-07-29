import ClinicDao from "../../models/master/ClinicDao.js";

export default class ClinicRepo {
    /**
     * Find clinics by organization code
     * @param {string} orgCode - Organization code
     * @returns {Promise<Array<Object>>} Array of clinic objects
     */
    static async findClinicsByOrgCode(orgCode) {

        return await ClinicDao.find({ orgCode, status: true })
            .select('name _id')
            .lean()
            .exec();

    }

    /**
     * Find all clinics
     * @returns {Promise<Array<Object>>} Array of all clinic objects
     */
    static async findAllClinics(orgCode) {

        return await ClinicDao.find({ orgCode })
            .lean()
            .exec();

    }

    /**
     * Find clinic by ID
     * @param {string} clinicId - Clinic ID
     * @returns {Promise<Object|null>} Clinic object or null
     */
    static async findClinicById(clinicId) {
        try {
            return await ClinicDao.findById(clinicId)
                .lean()
                .exec();
        } catch (error) {
            console.error("Error fetching clinic by ID:", error);
            throw error;
        }
    }

    /**
     * Create a new clinic
     * @param {Object} clinicData - Clinic data
     * @returns {Promise<Object>} Created clinic object
     */
    static async createClinic(clinicData) {
        try {
            const clinic = new ClinicDao(clinicData);
            return await clinic.save();
        } catch (error) {
            console.error("Error creating clinic:", error);
            throw error;
        }
    }

    /**
     * Update clinic by ID
     * @param {string} clinicId - Clinic ID
     * @param {Object} updateData - Update data
     * @returns {Promise<Object|null>} Updated clinic object or null
     */
    static async updateClinic(clinicId, updateData) {
        try {
            return await ClinicDao.findByIdAndUpdate(clinicId, updateData, {
                new: true,
                runValidators: true
            });
        } catch (error) {
            console.error("Error updating clinic:", error);
            throw error;
        }
    }

    /**
     * Delete clinic by ID
     * @param {string} clinicId - Clinic ID
     * @returns {Promise<Object|null>} Deleted clinic object or null
     */
    static async deleteClinic(clinicId) {
        try {
            return await ClinicDao.findByIdAndDelete(clinicId);
        } catch (error) {
            console.error("Error deleting clinic:", error);
            throw error;
        }
    }
}
