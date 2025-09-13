import DiseaseMapper from "@mapper/master/DiseaseMapper.js";
import DiseaseRepo from "@repo/master/DiseaseRepo.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { ServiceResponse } from "@utils/responseHandler.js";
import STATUS_CODES from "@utils/statusCodes.js";

export default class DiseaseService {
    /**
     * Create a new disease
     */
    static async create({ packet }) {
        const diseaseEntity = DiseaseMapper.toDiseaseEntity(packet);
        await DiseaseRepo.create(diseaseEntity);
        return new ServiceResponse(STATUS_CODES.OK, formatMsg(MESSAGES.CREATE, { label: "Disease" }), null);
    }

    /**
     * Get all diseases
     */
    static async getAll() {
        const diseases = await DiseaseRepo.getAll();
        return new ServiceResponse(STATUS_CODES.OK, null, DiseaseMapper.toDiseaseResponse(diseases));
    }

    /**
     * Update a module by ID
     */
    static async update({ packet }) {

        const exists = await DiseaseRepo.isExists({ _id: packet._id });
        if (!exists) {
            return new ServiceResponse(STATUS_CODES.NOT_FOUND, formatMsg(MESSAGES.NOT_FOUND, { label: "Disease", id }));
        }

        const diseaseEntity = DiseaseMapper.toDiseaseEntity(packet);
        await DiseaseRepo.update(packet._id, diseaseEntity);
        return new ServiceResponse(STATUS_CODES.OK, formatMsg(MESSAGES.UPDATE, { label: "Disease" }), null);

    }

    /**
     * Get modules as JSON
     */
    static async getJson() {
        try {
            const diseases = await DiseaseRepo.getAll();
            return new ServiceResponse(STATUS_CODES.OK, null, DiseaseMapper.toDiseaseJson(diseases));
        } catch (error) {
            throw new Error(MESSAGES.MODULE_JSON_FETCH_FAILED);
        }
    }
}