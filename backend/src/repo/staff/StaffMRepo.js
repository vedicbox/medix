import StaffMeetingDao from "@models/staff/StaffMeetingDao.js";
import { parseToMongoId } from "@utils/parse.js";
import { DATE_TIME_ENUM } from "../../enum/parserEnum.js";

export default class StaffMeetingRepo {

    /**
     * Create a new meeting
     * @param {Object} meetingData - Clinic data
     * @returns {Promise<Object>} Created meeting object
     */
    static async create(meetingData) {
        const meeting = new StaffMeetingDao(meetingData);
        return await meeting.save();
    }

    /**
     * Fetch all active roles
     * @returns {Promise<Array<Object>>}
     */
    static async findAll(staffRef, orgRef) {
        return await StaffMeetingDao.aggregate([
            {
                $match: {
                    orgRef: parseToMongoId(orgRef),
                    staffRef: parseToMongoId(staffRef),
                }
            },
            {
                $project: {
                    _id: 1,
                    dtFrom: 1,
                    dtTo: 1,
                    meetingFrom: 1,
                    meetingTo: 1,
                    createdAt: { $dateToString: { format: DATE_TIME_ENUM.DEFAULT, date: "$createdAt" } },

                }
            }
        ]);
    }
}