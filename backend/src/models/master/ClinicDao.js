import mongoose from "mongoose";


const ClinicSchema = new mongoose.Schema(
  {
    orgRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Clinic name is required"],
      unique: true,
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    shortDesc: {
      type: String,
      trim: true,
      maxlength: [255, "Description cannot exceed 255 characters"],
    },
    address: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    phone1: {
      type: String,
      trim: true,
      match: [/^[0-9]{10,15}$/, "Phone must be 10-15 digits"],
    },
    phone2: {
      type: String,
      trim: true,
      match: [/^[0-9]{10,15}$/, "Phone must be 10-15 digits"],
    },
    country: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
    },
    shiftFrom: {
      type: String,
      match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Use HH:MM format"],
    },
    shiftTo: {
      type: String,
      match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Use HH:MM format"],
    },
    weekOff: {
      type: String,
    },
    gstNo: {
      type: String,
      trim: true,
      uppercase: true,
      match: [
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        "Invalid GST format (e.g. 12ABCDE1234F1Z1)",
      ],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const ClinicDao = mongoose.model("clinic_masters", ClinicSchema);

export default ClinicDao;
