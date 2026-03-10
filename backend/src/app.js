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

// CORS - restrict to your Vercel domain in production
app.use(
  cors({
    origin: env.FRONTEND_ORIGIN,
  })
);

// Health check endpoint for Render / monitoring
app.get("/", (req, res) => {
  res.status(200).json({ status: "API running" });
});

// Mount API routes
app.use("/api", contactRoutes);

// 404 handler
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

