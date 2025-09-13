import mongoose from "mongoose";

// Allows letters, spaces, hyphens
const nameRegex = /^[A-Za-z\s\-]+$/;

const SpecsSchema = new mongoose.Schema(
    {
        orgRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "organization",
            required: true,
        },
        name: {
            type: String,
            required: [true, "Specialization name is required"],
            uppercase: true,
            trim: true,
            validate: {
                validator: function (value) {
                    return nameRegex.test(value);
                },
                message:
                    "Specialization name must contain only letters, spaces, or hyphens",
            },
            set: (value) =>
                value.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()),
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Unique name per organization
SpecsSchema.index({ orgRef: 1, name: 1 }, { unique: true });

// For active/inactive filtering
SpecsSchema.index({ orgRef: 1, status: 1 });

const SpecsDao = mongoose.model("specializations", SpecsSchema);

export default SpecsDao;