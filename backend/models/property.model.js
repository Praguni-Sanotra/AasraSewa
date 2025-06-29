import mongoose from "mongoose";
const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    landmark: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },
    fullAddress: { type: String, required: true, trim: true },
    pricePerNight: { type: Number, required: true, min: 0 },
    description: { type: String, required: true, maxlength: 500, trim: true },
    capacity: { type: Number, required: true, min: 1 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    propertyImage: {
      type: String,
      default:
        "https://images.icon-icons.com/3761/PNG/512/house_building_home_icon_231030.png",
    },
    images: {
      frontWall: { type: String, required: true, trim: true },
      backWall: { type: String, required: true, trim: true },
      leftWall: { type: String, required: true, trim: true },
      rightWall: { type: String, required: true, trim: true },
    },
    disasterFree: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    star: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    isBooked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Property", propertySchema);
