import mongoose from "mongoose";

// Only letters (uppercase/lowercase)
const roleNameRegex = /^[a-zA-Z]+$/;

const RoleSchema = new mongoose.Schema(
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
    status: {
      type: Number, 
      default: 1
    },
    permission: {
      type: [String], // Array of strings
      default: []
    }
  },
  {
    timestamps: true,
  }
);

const RoleDao = mongoose.model("roles", RoleSchema);

export default RoleDao;