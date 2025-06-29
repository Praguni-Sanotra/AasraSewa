import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/connectDb.js";
import userRoute from "./routes/user.route.js";
// Load environment variables from .env file
dotenv.config();

const app = express();

// Get port from environment variables or fallback to 3000
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse URL-encoded data (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies from incoming requests
app.use(cookieParser());

// Define allowed origins for CORS (e.g., your frontend app URLs)
const allowedOrigins = [
  "http://localhost:5173", // Vite frontend development server
];

// CORS configuration to allow cross-origin requests only from allowedOrigins
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Reject requests from disallowed origins
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Enable cookies and credentials to be sent
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers in requests
};

// Apply CORS middleware with the specified options
app.use(cors(corsOptions));

// api's
app.use("/api/v1/user", userRoute);

// Connect to MongoDB, then start the Express server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    // Log database connection errors and exit process
    console.error("Failed to connect to DB", err);
    process.exit(1);
  });
