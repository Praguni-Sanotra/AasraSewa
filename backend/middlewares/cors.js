import cors from "cors";

// Define allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173", // Vite frontend development server
  process.env.FRONTEND_URL, // Production frontend URL
].filter(Boolean);

// CORS configuration
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

export const setupCORS = (app) => {
  console.log("[DEBUG] Adding CORS middleware");
  app.use(cors(corsOptions));
  console.log("[DEBUG] CORS middleware added");
}; 