import { AUTH_ENUM } from "../enum/authEnum.js";

class SpecsMapper {
    /**
     * Maps Specialization data to a Specialization model instance
     * @param {Object} sepcsData - Input Specialization data
     * @param {string} sepcsData.name - Specialization name
     * @param {number|boolean} [sepcsData.status] - Specialization status (optional)
     * @throws {Error} If required name is missing or invalid
     */
    static createSpecsMapper(specsData) {
        return {
            name: specsData.name.trim(),
            status: specsData.status ?? 1
        };
    }

}

export default SpecsMapper;