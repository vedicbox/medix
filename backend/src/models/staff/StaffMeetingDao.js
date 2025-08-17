import mongoose from "mongoose";

const StaffMeetingSchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "staff_profiles", // Linking staff
      required: true,
    },
    dateFrom: {
      type: Date,
      required: [true, "Meeting start date is required"],
    },
    dateTo: {
      type: Date,
      required: [true, "Meeting end date is required"],
    },
    meetingFrom: {
      type: String, // "09:15 AM"
      required: [true, "Meeting start time is required"],
    },
    meetingTo: {
      type: String, // "10:15 AM"
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
