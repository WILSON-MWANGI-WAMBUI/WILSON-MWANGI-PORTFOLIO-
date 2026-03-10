/**
 * Centralized error handling middleware.
 *
 * Why:
 * - Keeps controller/service code clean.
 * - Ensures consistent error responses.
 * - Avoids leaking internal error details to clients.
 */

import { logger } from "../utils/logger.js";

export function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  logger.error("Unhandled error", {
    message: err?.message,
    stack: err?.stack,
  });

  const statusCode = Number(err?.statusCode) || 500;

  res.status(statusCode).json({
    success: false,
    message: statusCode >= 500 ? "Error sending message" : (err?.message || "Request failed"),
  });
}

