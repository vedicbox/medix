import SpecsDao from "../../models/master/SpecsDao.js";
import { parseToMongoId } from "@utils/parse.js";
import { DATE_TIME_ENUM } from "../../enum/parserEnum.js";
export default class SpecsRepo {

    static async getAll(orgRef) {
        return await SpecsDao.aggregate([
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
                    createdAt: { $dateToString: { format: DATE_TIME_ENUM.DEFAULT, date: "$createdAt" } },
                }
            }
        ]);
    }

    static async isExists(query) {
        const finalQuery = { ...query };
        return SpecsDao.exists(finalQuery);
    }

    /**
     * Get only specialization names and IDs for dropdowns
    */
    static async getNames(orgRef) {
     return SpecsDao.find({ orgRef, status: 1 })
      .select('name _id')
      .lean();
    }

    /**
     * Create a new specialization
     */
    static async create(specsData) {
        return SpecsDao.create(specsData);
    }

     /**
     * Update a new specialization
     */
    static async update(id, updateData) {
        return SpecsDao.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
    }

    /**
     * Find Specialization by ID
     * @param {string} specsId - Specialization ID
     * @returns {Promise<Object|null>} Specialization object or null
     */
    static async findSpecsById(specsRef, orgRef) {
        return await SpecsDao.findOne({
            _id: specsRef,
            orgRef,
            status: 1
        })
            .lean()
            .exec();
    }
}