/**
 * Environment configuration (single source of truth).
 *
 * Why this file exists:
 * - Centralizes reading + validating environment variables.
 * - Keeps the rest of the app free from `process.env` scattered everywhere.
 * - Fails fast in production when critical config is missing.
 */
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load backend/.env so it works whether started from project root (npm run dev) or backend dir
dotenv.config({ path: join(__dirname, "../../.env") });

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
  // Supports comma-separated origins (e.g. production + preview URLs)
  // Each is normalized (trailing slash stripped)
  FRONTEND_ORIGIN: readEnv("FRONTEND_ORIGIN")
    .split(",")
    .map((o) => String(o).trim().replace(/\/+$/, ""))
    .filter(Boolean),

  // SendGrid
  SENDGRID_API_KEY: readEnv("SENDGRID_API_KEY"),
  SENDER_EMAIL: readEnv("SENDER_EMAIL"),

  // Recipient
  RECEIVER_EMAIL: readEnv("RECEIVER_EMAIL"),
};

