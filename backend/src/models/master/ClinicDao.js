import mongoose from "mongoose";

/**
 * ClinicMaster Model
 * @typedef {Object} ClinicMaster
 * @property {ObjectId} _id - Auto-generated MongoDB ID (Primary Key)
 * @property {string} name - Unique clinic name (required)
 * @property {string} [shortDesc] - Short description
 * @property {string} [address] - Physical address
 * @property {string} [email] - Validated email format
 * @property {string} [phone1] - Primary contact (10-15 digits)
 * @property {string} [phone2] - Secondary contact (10-15 digits)
 * @property {string} [country] - Country name
 * @property {string} [state] - State/Province
 * @property {string} [city] - City
 * @property {string} [pincode] - Postal code
 * @property {string} [shiftFrom] - Opening time (HH:MM)
 * @property {string} [shiftTo] - Closing time (HH:MM)
 * @property {string} [weekOff] - Day of weekly closure
 * @property {string} [gstNo] - Valid GST number format
 * @property {number} [isActive=1] - 1=active, 0=inactive
 * @property {Date} createdAt - Auto-created timestamp
 * @property {Date} updatedAt - Auto-updated timestamp
 */
const ClinicSchema = new mongoose.Schema(
  {
    orgCode: {
      type: String,
      required: [true, "Organization code is required"],
      trim: true,
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
