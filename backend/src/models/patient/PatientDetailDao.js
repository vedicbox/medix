import mongoose from "mongoose";

// Regex to allow only letters (no digits, no spaces, no special characters)
const nameRegex = /^[A-Za-z]+$/;

const PatientDetailSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            maxlength: [35, "First name cannot exceed 35 characters"],
            trim: true,
            required: [true, "First name is required"],
            validate: {
                validator: function (value) {
                    return nameRegex.test(value);
                },
                message: "First name must contain only letters",
            },
            set: (value) =>
                value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
        },
        lastName: {
            type: String,
            maxlength: [35, "Last name cannot exceed 35 characters"],
            trim: true,
            validate: {
                validator: function (value) {
                    return nameRegex.test(value);
                },
                message: "Last name must contain only letters",
            },
            set: (value) =>
                value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
        },
        dob: {
            type: Date,
            required: [true, "Date of birth is required"],
            validate: {
                validator: function (value) {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return value < today;
                },
                message: "Date of birth must be in the past",
            }
        },
        age: {
            type: Number,
            required: [true, "Age is required"],
            min: [0, "Age cannot be negative"],
            max: [150, "Age seems unrealistic"],
        },
        weight: {
            type: Number,
            required: [true, "Weight is required"],
            min: [0, "Weight cannot be negative"],
        },
        height: {
            type: String,
        },
        gender: {
            required: [true, "Gender is required"],
            type: String,
            uppercase: true,
        },
        martial: {
            required: [true, "Martial status is required"],
            type: String,
        },
        orgRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "organization",
            required: true,
        },
        createId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        }
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);

const PatientDetailDao = mongoose.model("patient_details", PatientDetailSchema);
export default PatientDetailDao;
