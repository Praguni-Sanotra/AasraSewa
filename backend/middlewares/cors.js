import cors from "cors";

// Define allowed origins for CORS
const allowedOrigins = [
<<<<<<< HEAD
  'https://aasrasewa-frontend-vsxu.onrender.com',
  'https://admin-41w7.onrender.com',
  "http://localhost:5173", // Vite frontend development server
  "http://localhost:5174", // Admin frontend development server
  process.env.FRONTEND_URL?.trim(), // Production frontend URL from .env
  process.env.ADMIN_URL?.trim(), // Production ADMIN URL from .env
=======
  "http://localhost:5173", // Vite frontend development server
  "http://localhost:5174", // Admin frontend development server
  process.env.FRONTEND_URL?.trim(), // Production frontend URL from .env
>>>>>>> d39ecafc5e287c027907a6c3b60849c13bf46702
].filter(Boolean); // Remove undefined or empty values

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., Postman, curl, server-to-server)
    if (!origin) {
      console.log("[DEBUG] No origin present in request — allowing (Postman, server-to-server)");
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      console.log(`[DEBUG] CORS allowed for origin: ${origin}`);
      return callback(null, true);
    } else {
      console.warn(`[DEBUG] CORS rejected for origin: ${origin}`);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Enable cookies and credentials
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const setupCORS = (app) => {
  console.log("[DEBUG] Adding CORS middleware");
  app.use(cors(corsOptions));
  console.log("[DEBUG] CORS middleware added");
};
