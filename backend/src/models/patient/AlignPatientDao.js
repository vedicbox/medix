
import mongoose from "mongoose";

const AlignPatientSchema = new mongoose.Schema(
    {
        caseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "patient_details",
            required: [true, "Case ID is required"],
        },
        docId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "doctors", // Reference to the Doctor model
            required: [true, "Doctor ID is required"],
        },
        fee: {
            type: Number,
            required: [true, "Fee is required"],
             min: [0, "Fee must be a positive number"],
             trim:true
        },
        payTag: {
            type: String,
            required: [true, "Payment type is required"],
            trim: true,
        },
        transId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "transactions",
        },
        status: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const AlignPatientDao = mongoose.model("align_patients", AlignPatientSchema);

export default AlignPatientDao;