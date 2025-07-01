import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDb.js";
import userRoutes from "./routes/user.route.js";
import propertyRoutes from "./routes/property.route.js";
import reportRoute from "./routes/report.js"; // Included from version 1
import { setupSecurity, authLimiter } from "./middlewares/security.js";
import { setupCORS } from "./middlewares/cors.js";
import { setupErrorHandlers } from "./middlewares/errorHandlers.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log("[DEBUG] Starting server setup");

// Apply security middleware
setupSecurity(app);

// Setup CORS
setupCORS(app);

// Basic middleware
console.log("[DEBUG] Adding basic middleware");
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});
console.log("[DEBUG] Health check endpoint added");

// Register API routes
console.log("[DEBUG] Registering routes");
app.use("/api/v1/user", authLimiter, userRoutes);
app.use("/api/v1/property", propertyRoutes);
app.use("/api/v1/report", reportRoute); // Ensure this is defined
console.log("[DEBUG] Routes registered");

// Setup error handlers
setupErrorHandlers(app);

// Connect to DB and start server
console.log("[DEBUG] Connecting to MongoDB");
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `✅ Server is running on port ${PORT} in ${
          process.env.NODE_ENV || "development"
        } mode`
      );
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB", err);
    process.exit(1);
  });
