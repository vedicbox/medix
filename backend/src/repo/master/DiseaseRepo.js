import DiseaseDao from "@models/master/DiseaseDao.js";

export default class DiseaseRepo {
    /**
     * Create a new module
     */
    static async create(diseaseEntity) {
        const disease = new DiseaseDao(diseaseEntity);
        return await disease.save();
    }

    /**
     * Get all modules
     */
    static async getAll() {
        return await DiseaseDao.find({}).lean();
    }

    /**
     * Update module by ID
     */
    static async update(diseaseId, diseaseEntity) {
        return await DiseaseDao.findByIdAndUpdate(
            diseaseId,
            diseaseEntity,
            { new: true, runValidators: true }
        ).lean();
    }

    static async isExists(query) {
        const finalQuery = { ...query };
        return DiseaseDao.exists(finalQuery);
    }


}