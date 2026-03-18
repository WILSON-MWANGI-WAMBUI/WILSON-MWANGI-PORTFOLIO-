/**
 * Mail service (business logic layer).
 *
 * Responsibilities:
 * - Configure SendGrid using env vars.
 * - Compose and send the contact email.
 */

import sgMail from "@sendgrid/mail";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

// Configure SendGrid once at startup.
sgMail.setApiKey(env.SENDGRID_API_KEY);

export async function sendContactEmail({ name, email, subject, message }) {
  const safeName = String(name ?? "").trim();
  const safeEmail = String(email ?? "").trim();
  const safeSubject = String(subject ?? "").trim();
  const safeMessage = String(message ?? "");

  const emailSubject = safeSubject ? safeSubject : "Portfolio Contact";

  const textBody = `Name: ${safeName}\nEmail: ${safeEmail}\n\nMessage:\n${safeMessage}`;

  try {
    const msg = {
      to: env.RECEIVER_EMAIL,
      from: env.SENDER_EMAIL,
      subject: emailSubject,
      text: textBody,
      ...(safeEmail
        ? {
            replyTo: {
              name: safeName || undefined,
              email: safeEmail,
            },
          }
        : {}),
    };

    await sgMail.send(msg);
    logger.info("Contact email sent successfully", {
      to: env.RECEIVER_EMAIL,
      from: env.SENDER_EMAIL,
    });
  } catch (err) {
    // SendGrid provides useful error response bodies
    const statusCode = err?.code ?? err?.response?.statusCode;
    const responseBody = err?.response?.body;
    logger.error("SendGrid email send failed", {
      statusCode,
      responseBody,
      message: err?.message,
    });
    throw err;
  }
}

