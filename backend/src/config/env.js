/**
 * Environment configuration (single source of truth).
 *
 * Why this file exists:
 * - Centralizes reading + validating environment variables.
 * - Keeps the rest of the app free from `process.env` scattered everywhere.
 * - Fails fast in production when critical config is missing.
 */
import dotenv from "dotenv";

// Load environment variables from .env (local dev). In Render, env vars are injected by the platform.
dotenv.config();

/**
 * Helper to read environment variables with optional "required" behavior.
 * This is intentionally small and explicit for maintainability.
 */
function readEnv(key, { required = true, defaultValue } = {}) {
  const value = process.env[key] ?? defaultValue;
  if (required && (value === undefined || value === "")) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  // Server
  PORT: Number(readEnv("PORT", { required: false, defaultValue: "5000" })),

  // Security / CORS
  FRONTEND_ORIGIN: readEnv("FRONTEND_ORIGIN"),

  // SMTP (Gmail SMTP by default, but configurable)
  SMTP_HOST: readEnv("SMTP_HOST", { required: false, defaultValue: "smtp.gmail.com" }),
  SMTP_PORT: Number(readEnv("SMTP_PORT", { required: false, defaultValue: "587" })),
  SMTP_USER: readEnv("SMTP_USER"),
  SMTP_PASS: readEnv("SMTP_PASS"),

  // Recipient
  RECEIVER_EMAIL: readEnv("RECEIVER_EMAIL"),
};

