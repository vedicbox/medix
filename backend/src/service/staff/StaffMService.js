
import StaffMapper from "@mapper/StaffMapper.js";
import StaffMRepo from "@repo/staff/StaffMRepo.js";
import MESSAGES from "@utils/message.js";
import { formatMsg } from "@utils/parse.js";
import { ServiceResponse } from "@utils/responseHandler.js";
import STATUS_CODES from "@utils/statusCodes.js";

export default class StaffMService {
    /**
   * Create a new staff meeting.
   * @param {Object} meetingData - Staff profile data
   * @returns {Promise<ServiceResponse>}
   */
    static async create({ packet, authentication }) {
        const { orgRef } = authentication;
        const entityData = StaffMapper.toCreateStaffMeeting(packet, orgRef);
        const newMeeting = await StaffMRepo.create(entityData);
        return new ServiceResponse(STATUS_CODES.OK, formatMsg(MESSAGES.CREATE, { label: "Meeting" }), newMeeting);
    }

    /**
    * Fetch all staff details for tabular view.
    * @returns {Promise<Array<Object>>}
   */
    static async fetchAll({ packet, authentication }) {
        const { orgRef } = authentication;
        const payload = await StaffMRepo.findAll(packet.staffId, orgRef);
        return new ServiceResponse(STATUS_CODES.OK, null, payload);
    }
}