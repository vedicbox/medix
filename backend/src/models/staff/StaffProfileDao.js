import mongoose from "mongoose";

const phoneRegex = /^[0-9]{10}$/;
const nameRegex = /^[A-Za-z\s]+$/;
const pinCodeRegex = /^[1-9][0-9]{5}$/;

const StaffProfileSchema = new mongoose.Schema(
  {
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the User model
      required: true,
    },
    phone1: {
      type: String,
      required: [true, "Phone number is required"],
      match: [phoneRegex, "Phone number must be 10 digits"],
      trim: true
    },
    phone2: {
      type: String,
      validate: {
        validator: function (value) {
          if (!value) return true; // allow empty value
          return phoneRegex.test(value); // validate only if value is provided
        },
        message: "WhatsApp number must be a valid 10-digit number",
      },
    },
    whatsappPref: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
      validate: {
        validator: function (value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          console.log("DOB Validation:", value, "<", today, "=>", value < today);
          return value < today;
        },
        message: "Date of birth must be in the past",
      }
    },
    country: {
      type: String,
      required: [true, "State is required"],
      trim: true
    },
    state: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      match: [pinCodeRegex, "Pincode must be a valid 6-digit number"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      minlength: [5, "Address must be at least 5 characters long"],
      maxlength: [250, "Address cannot exceed 250 characters"],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set the creation timestamp
      immutable: true, // Prevent updates to this field
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically set the update timestamp
    },
  },
  {
    timestamps: true, // Automatically manage `createdAt` and `updatedAt`
  }
);

const StaffProfileDao = mongoose.model("staff_profiles", StaffProfileSchema);

export default StaffProfileDao;
