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
// - FRONTEND_ORIGIN supports comma-separated list (e.g. production + preview URLs)
// - In dev: also allow localhost
// - Vercel previews: allow any *.vercel.app subdomain matching the project
const allowedOrigins = new Set(Array.isArray(env.FRONTEND_ORIGIN) ? env.FRONTEND_ORIGIN : [env.FRONTEND_ORIGIN]);

if (process.env.NODE_ENV !== "production") {
  allowedOrigins.add("http://localhost:5173");
  allowedOrigins.add("http://localhost:5174");
  allowedOrigins.add("http://localhost:5175");
}

// Allow Vercel preview deployments (e.g. wilson-mwangi-portfolio-git-xxx.vercel.app)
const vercelPreviewRegex = /^https:\/\/wilson-mwangi-portfolio(-[a-z0-9-]+)?\.vercel\.app$/i;

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.has(origin)) return callback(null, true);
      if (vercelPreviewRegex.test(origin)) return callback(null, true);
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

