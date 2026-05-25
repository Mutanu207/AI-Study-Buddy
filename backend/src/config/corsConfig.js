// allowed origins (use FRONTEND_URL or a comma-separated ALLOWED_ORIGINS in .env)
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const allowedOrigins = (process.env.ALLOWED_ORIGINS || FRONTEND_URL).split(",");

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow server-to-server / same-origin requests (no origin)
    return allowedOrigins.includes(origin)
      ? callback(null, true)
      : callback(new Error("Not allowed by CORS"));
  },
  credentials: true, // allow cookies / auth headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};