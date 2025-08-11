import mongoose from "mongoose";

const PatientAddressSchema = new mongoose.Schema(
    {
        caseId: {
            type: mongoose.Schema.Types.ObjectId,
            unique: true,
            ref: "patient_details",
            required: true,
        },
        addr1: {
            type: String,
            required: [true, "Address line 1 is required"],
            maxlength: [100, "Address line 1 cannot exceed 100 characters"],
            trim: true,
        },
        addr2: {
            type: String,
            maxlength: [100, "Address line 2 cannot exceed 100 characters"],
            trim: true,
        },
        state: {
            type: String,
            required: [true, "State is required"],
            maxlength: [50, "State cannot exceed 50 characters"],
            trim: true,
        },
        city: {
            type: String,
            required: [true, "City is required"],
            maxlength: [50, "City cannot exceed 50 characters"],
            trim: true,
        },
        pincode: {
            type: String,
            required: [true, "Pincode is required"],
            match: [/^[0-9]{6}$/, "Please provide a valid 6-digit pincode"],
            trim: true,
        },
        country: {
            type: String,
            required: [true, "Country is required"],
            default: "India", // Set default country if appropriate
            maxlength: [50, "Country cannot exceed 50 characters"],
            trim: true,
        }
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);
const PatientAddressDao = mongoose.model("patient_address", PatientAddressSchema);
export default PatientAddressDao;
