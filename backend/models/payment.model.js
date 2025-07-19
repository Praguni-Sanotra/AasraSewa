<<<<<<< HEAD
// models/payment.model.js (or wherever your schema is)

=======
>>>>>>> d39ecafc5e287c027907a6c3b60849c13bf46702
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
<<<<<<< HEAD
    propertyId: {
=======
    property: {
>>>>>>> d39ecafc5e287c027907a6c3b60849c13bf46702
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
<<<<<<< HEAD
    },
    status: {
      type: String,
      default: "pending",
    },
    // ...other fields
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
=======
      min: 1,
    },
    
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    stripeSessionId: {
      type: String,
      required: true,
    },
    stripePaymentIntentId: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", paymentSchema); 
>>>>>>> d39ecafc5e287c027907a6c3b60849c13bf46702
