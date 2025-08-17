
import StaffMeetingRepo from "../repo/StaffMeetingRepo.js";
import MESSAGES from "../utils/message.js";
import { ServiceResponse } from "../utils/responseHandler.js";
import STATUS_CODES from "../utils/statusCodes.js";

export default class StaffMeetingService {
    /**
   * Create a new staff meeting.
   * @param {Object} meetingData - Staff profile data
   * @returns {Promise<ServiceResponse>}
   */
    static async create(meetingData,authentication) {
        const newMeeting = await StaffMeetingRepo.create(meetingData);
        return new ServiceResponse(STATUS_CODES.OK, MESSAGES.STAFF_MEETING_CREATED, newMeeting);
    }

    /**
    * Fetch all staff details for tabular view.
    * @returns {Promise<Array<Object>>}
   */
    static async fetchAll() {
        const meetingList = await StaffMeetingRepo.findAll();
         return new ServiceResponse(STATUS_CODES.OK, MESSAGES.STAFF_MEETING_FETCHED, {
                   meetingList
               });
    }
}