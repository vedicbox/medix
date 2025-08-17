import StaffMeetingDao from "../models/staff/StaffMeetingDao.js";


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
    static async findAll() {
        return await StaffMeetingDao.findAll();
    }
}
