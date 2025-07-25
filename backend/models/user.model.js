import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, min: 18, required: true },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    },
    address: { type: String, required: true },
    aadhaarImage: { type: String, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    face: { type: String },
    isHost: { type: Boolean, default: false },
    // Emergency Contact
    emergencyContact: {
      phone: { type: String },
      state: { type: String },
    },
    // Location
    location: {
      house: { type: String },
      street: { type: String },
      area: { type: String },
      city: { type: String },
      pincode: { type: String },
      landmark: { type: String },
      coordinates: { type: String },
      sharing: { type: Boolean, default: false },
    },
    // Medical Info
    medical: {
      problem: { type: String },
      doctor: { type: String },
      medicines: { type: String },
      allergies: { type: String },
      chronicDiseases: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Method to compare plain password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
