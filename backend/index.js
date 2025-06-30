import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDb.js";
import userRoutes from "./routes/user.route.js";
import propertyRoutes from "./routes/property.route.js";
import reportRoute from "./routes/report.js";
import { setupSecurity, authLimiter } from "./middlewares/security.js";
import { setupCORS } from "./middlewares/cors.js";
import { setupErrorHandlers } from "./middlewares/errorHandlers.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
setupSecurity(app);

// CORS setup
setupCORS(app);

// Basic parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// All API routes
app.use("/api/v1/user", authLimiter, userRoutes);
app.use("/api/v1/property", propertyRoutes);
app.use("/api/v1/report", reportRoute);  // ✅ NEW REPORT ROUTE

// Error handling
setupErrorHandlers(app);

// DB connection and server startup
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB", err);
    process.exit(1);
  });
