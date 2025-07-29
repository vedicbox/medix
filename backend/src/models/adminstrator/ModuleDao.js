import mongoose from "mongoose";

// Only letters (uppercase/lowercase)
const roleNameRegex = /^[a-zA-Z]+$/;

const Modulechema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Role name is required"],
            uppercase: true,
            unique: true,
            trim: true,
            validate: {
                validator: function (value) {
                    return roleNameRegex.test(value); // Only letters
                },
                message: "Role name must contain only letters (A–Z or a–z)",
            },
            set: (value) => value.toUpperCase()
        },
        desc: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const ModuleDao = mongoose.model("modules", Modulechema);

export default ModuleDao;