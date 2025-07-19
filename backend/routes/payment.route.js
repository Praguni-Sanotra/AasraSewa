import express from "express";
import {
  createPaymentIntent,
  confirmPayment,
  getPaymentStatus,
  getPaymentHistory,
  webhookHandler,
} from "../controllers/payment.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Webhook endpoint (no auth required)
<<<<<<< HEAD
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhookHandler
);
=======
router.post("/webhook", express.raw({ type: "application/json" }), webhookHandler);
>>>>>>> d39ecafc5e287c027907a6c3b60849c13bf46702

// Protected routes (require user authentication)
router.use(isAuthenticated);

// Create payment intent
<<<<<<< HEAD
router.post("/create-intent", isAuthenticated, createPaymentIntent);
=======
router.post("/create-intent", createPaymentIntent);
>>>>>>> d39ecafc5e287c027907a6c3b60849c13bf46702

// Confirm payment
router.post("/confirm", confirmPayment);

// Get payment status
router.get("/status/:paymentId", getPaymentStatus);

// Get payment history
router.get("/history", getPaymentHistory);

<<<<<<< HEAD
export default router;
=======
export default router; 
>>>>>>> d39ecafc5e287c027907a6c3b60849c13bf46702
