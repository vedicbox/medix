import mongoose from "mongoose";

const phoneRegex = /^[0-9]{10}$/;

const PatientContactSchema = new mongoose.Schema(
  {
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      ref: "patient_details",
      required: [true, "Case ID is required"],
      trim:true
    },
    phone1: {
      type: String,
      required: [true, "Phone number is required"],
      match: [phoneRegex, "Phone number must be 10 digits"],
      trim: true,
    },
    phone2: {
      type: String,
      validate: {
        validator: function (value) {
          if (!value) return true; // allow empty value
          return phoneRegex.test(value); // validate only if value is provided
        },
        message: "Phone2 must be a valid 10-digit number",
      },
      trim:true
    },
    whatsappPref: {
      type: Number,
      default: 0,
      validator: function (value) {
        if(value!=="-") return true;
      },
      message: "Whatsapp No is required",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      maxlength: [45, "Email cannot exceed 45 characters"],
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
      lowercase: true,
      trim: true,
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toObject: { virtuals: true },
  }
);

const PatientContactDao = mongoose.model("patient_contacts", PatientContactSchema);
export default PatientContactDao;
