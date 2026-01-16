import express from "express";
import cors from "cors";
import morgan from "morgan"; // Highly recommended for debugging 404s
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

// 1. Request Logger (Helpful to see incoming URLs in terminal)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 2. CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// 3. Built-in Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. API Health Check (Optional but good practice)
app.get("/api/health", (req, res) => res.status(200).json({ status: "OK" }));

// 5. Routes (DO NOT CHANGE THESE PREFIXES)
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// 6. 404 Catch-all (SDE-2 Tip: Catch undefined routes before they hit error handler)
app.use((req, res) => {
  res
    .status(404)
    .json({
      success: false,
      message: `Route ${req.originalUrl} not found on this server`,
    });
});

// 7. Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export default app;
