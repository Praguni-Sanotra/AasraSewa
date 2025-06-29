import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDb.js";
import userRoute from "./routes/user.route.js";
import propertRoute from "./routes/property.route.js";
import { setupSecurity, authLimiter } from "./middlewares/security.js";
import { setupCORS } from "./middlewares/cors.js";
import { setupErrorHandlers } from "./middlewares/errorHandlers.js";

console.log("[DEBUG] Starting server setup");

// Load environment variables from .env file
dotenv.config();

const app = express();
console.log("[DEBUG] Express app created");

// Get port from environment variables or fallback to 3000
const PORT = process.env.PORT || 3000;

// Setup security middleware
setupSecurity(app);

// Setup CORS
setupCORS(app);

// Basic middleware
console.log("[DEBUG] Adding basic middleware");
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
console.log("[DEBUG] Health check endpoint added");

// API routes
console.log("[DEBUG] Registering routes");
app.use("/api/v1/user", authLimiter, userRoute);
app.use("/api/v1/property", propertRoute);
console.log("[DEBUG] Routes registered");

// Setup error handlers
setupErrorHandlers(app);

// Connect to MongoDB and start server
console.log("[DEBUG] Connecting to MongoDB");
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  });
