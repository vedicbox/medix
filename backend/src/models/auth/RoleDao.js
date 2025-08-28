import mongoose from "mongoose";

const roleNameRegex = /^[a-zA-Z]+$/;

const RoleSchema = new mongoose.Schema(
  {
    orgRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Role name is required"],
      uppercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          return roleNameRegex.test(value);
        },
        message: "Role name must contain only letters (A–Z or a–z)",
      },
      set: (value) => value.toUpperCase()
    },
    status: {
      type: Boolean,
      default: true,
    },
    type: {
      type: Number,
      default: 1
    },
    permission: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true,
  }
);

// 1. Unique compound index for organization + role name (most critical)
RoleSchema.index({ orgRef: 1, name: 1 }, { unique: true });

// 2. Compound index for the most common query pattern: orgRef + status
RoleSchema.index({ orgRef: 1, status: 1 });

const RoleDao = mongoose.model("roles", RoleSchema);

export default RoleDao;