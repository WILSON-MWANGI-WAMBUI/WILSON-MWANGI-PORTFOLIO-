/**
 * Rate limiter middleware.
 *
 * Purpose:
 * - Protect the email endpoint from spam / abuse.
 * - Keep the service reliable and prevent Gmail SMTP throttling.
 */
import rateLimit from "express-rate-limit";

export const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

