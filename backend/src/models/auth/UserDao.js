import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Regex to allow only letters (adjust as needed for your requirements)
const nameRegex = /^[A-Za-z]+$/;

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      validate: {
        validator: function (value) {
          return nameRegex.test(value);
        },
        message: "First name must contain only letters",
      },
      set: (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      validate: {
        validator: function (value) {
          return nameRegex.test(value);
        },
        message: "Last name must contain only letters",
      },
      set: (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    orgRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
      required: true,
    },
    roleRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles",
      required: false,
    },
    clinicRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clinic_masters",
      required: false,
    },
    specsRef: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "specializations"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Password hashing middleware
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (err) {
    next(err);
  }
});

const UserDao = mongoose.model("users", UserSchema);

export default UserDao;
