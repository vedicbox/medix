import mongoose from "mongoose";

const StaffMeetingSchema = new mongoose.Schema(
    {
        staffRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "staff_profiles", 
            required: true,
        },
        orgRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "organization",
            required: true,
        },
        dtFrom: {
            type: String,
            required: [true, "Meeting start date is required"],
        },
        dtTo: {
            type: String,
            required: [true, "Meeting end date is required"],
        },
        meetingFrom: {
            type: String,
            required: [true, "Meeting start time is required"],
        },
        meetingTo: {
            type: String,
            required: [true, "Meeting end time is required"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
            immutable: true,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const StaffMeetingDao = mongoose.model("staff_meetings", StaffMeetingSchema);

export default StaffMeetingDao;