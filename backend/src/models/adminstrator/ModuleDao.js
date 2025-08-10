import mongoose from "mongoose";

// Only letters (uppercase/lowercase)
const roleNameRegex = /^[a-zA-Z]+$/;

// SubModule schema for validation
const SubModuleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "SubModule name is required"],
        trim: true
    },
    tag: {
        type: String,
        required: [true, "SubModule tag is required"],
        trim: true
    },
    uuid: {
        type: String,
        required: [true, "SubModule UUID is required"],
        trim: true
    }
}, { _id: false });

const Modulechema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Role name is required"],
            unique: true,
            trim: true,
            validate: {
                validator: function (value) {
                    return roleNameRegex.test(value); // Only letters
                },
                message: "Module name must contain only letters (A–Z or a–z)",
            },
        },
        tag: {
            type: String,
            required: [true, "Tag is required"],
            unique: true,
            trim: true,
        },
        subModules: {
            type: [SubModuleSchema],
            default: []
        }
    },
    {
        timestamps: true,
    }
);

const ModuleDao = mongoose.model("modules", Modulechema);

export default ModuleDao;