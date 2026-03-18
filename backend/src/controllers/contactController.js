/**
 * Contact controller.
 *
 * Responsibilities:
 * - Handle HTTP request/response.
 * - Delegate business logic to services.
 */

import { sendContactEmail } from "../services/mailService.js";
import { logger } from "../utils/logger.js";

export async function contactController(req, res, next) {
  try {
    const { name, email, subject, message } = req.body ?? {};

    logger.info("Incoming contact request", {
      name,
      email,
      subject,
      messageLength: typeof message === "string" ? message.length : undefined,
    });

    await sendContactEmail({ name, email, subject, message });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (err) {
    logger.error("Contact email send failed", {
      message: err?.message,
      responseBody: err?.response?.body,
    });
    return next(err);
  }
}

