/**
 * Contact routes.
 *
 * Responsibilities:
 * - Define endpoint paths and attach middleware chain.
 * - Keep `app.js` clean and focused on app wiring.
 */

import { Router } from "express";
import { contactController } from "../controllers/contactController.js";
import { validateContact } from "../middleware/validationMiddleware.js";
import { contactRateLimiter } from "../middleware/rateLimiter.js";

export const contactRoutes = Router();

// POST /api/contact
contactRoutes.post("/contact", contactRateLimiter, validateContact, contactController);

