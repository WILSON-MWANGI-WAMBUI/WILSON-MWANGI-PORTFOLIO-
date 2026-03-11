/**
 * Express application wiring.
 *
 * Responsibilities:
 * - Register security middleware (helmet, CORS)
 * - Register body parsing
 * - Mount routes
 * - Provide health endpoint
 * - Register centralized error handlers
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";

import { env } from "./config/env.js";
import { contactRoutes } from "./routes/contactRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";

export const app = express();

// Security headers
app.use(helmet());

// JSON parsing for API requests
app.use(express.json({ limit: "10kb" }));

// CORS
// - In production: restrict to the deployed Vercel origin.
// - In development: also allow localhost for easier testing.
const allowedOrigins = new Set([env.FRONTEND_ORIGIN]);

if (process.env.NODE_ENV !== "production") {
  allowedOrigins.add("http://localhost:5173");
  allowedOrigins.add("http://localhost:5174");
  allowedOrigins.add("http://localhost:5175");
}

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser clients or same-origin requests with no Origin header
      if (!origin) return callback(null, true);
      if (allowedOrigins.has(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

// Health check endpoints for Render / monitoring
app.get("/", (req, res) => {
  res.status(200).json({ status: "API running" });
});
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

// Mount API routes
app.use("/api", contactRoutes);

// 404 handler
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

