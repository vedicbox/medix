import OrgDao from "@models/adminstrator/OrgDao.js";

export default class OrgRepo {

    static async findOrgByFields(queryFields, selectFields = null) {
        const query = OrgDao.findOne(queryFields);

        if (selectFields) {
            query.select(selectFields);
        }

        return query.exec();
    }


    static async create(entity) {
        const module = new OrgDao(entity);
        return await module.save();
    }

    static async findAll() {
        return await OrgDao.find({}).lean();
    }


}
