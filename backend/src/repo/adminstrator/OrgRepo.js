import OrgDao from "@models/adminstrator/OrgDao.js";
import { DATE_TIME_ENUM } from "../../enum/parserEnum.js";

export default class OrgRepo {
    /**
     * Create a new organization
     */
    static async create(entity) {
        const org = new OrgDao(entity);
        return await org.save();
    }

    /**
     * Get all organizations
     */
    static async getAll() {
        return await OrgDao.aggregate([
            {
                $match: {
                    orgCode: { $ne: "vedicmedix" }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    orgCode: 1,
                    category: 1,
                    status: 1,
                    createdAt: { $dateToString: { format: DATE_TIME_ENUM.DEFAULT, date: "$createdAt" } },
                }
            }
        ]);
    }

    /**
     * Get organization by ID
     */
    static async getById(orgId) {
        return await OrgDao.findById(orgId).lean();
    }

    /**
     * Update organization details
     */
    static async update(orgId, updateData) {
        return await OrgDao.findByIdAndUpdate(
            orgId,
            updateData,
            { new: true, runValidators: true }
        ).lean();
    }

    /**
     * Find organization by fields
     */
    static async findByFields(queryFields, selectFields = null) {
        const query = OrgDao.findOne(queryFields);
        if (selectFields) {
            query.select(selectFields);
        }
        return query.exec();
    }

}