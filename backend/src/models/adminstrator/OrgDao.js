import mongoose from "mongoose";

const OrgSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        orgCode: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            index: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
    }
);

const OrgDao = mongoose.model("organization", OrgSchema);

export default OrgDao;