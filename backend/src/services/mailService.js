/**
 * Mail service (business logic layer).
 *
 * Responsibilities:
 * - Configure Nodemailer transport using env vars.
 * - Compose and send the contact email.
 */

import nodemailer from "nodemailer";
import { env } from "../config/env.js";

// Create the SMTP transporter once at startup.
// This avoids re-creating the transport for every request.
const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465, // true for 465, false for 587/other ports
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
  // Bypasses TLS verification (safe for portfolio development/demo deployments)
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendContactEmail({ name, email, subject, message }) {
  // Dev bypass: skip sending when using placeholder SMTP (avoids 500 on local test)
  const isPlaceholder =
    env.SMTP_USER === "yourgmail@gmail.com" ||
    !env.SMTP_PASS ||
    env.SMTP_PASS === "your_gmail_app_password";
  if (process.env.NODE_ENV !== "production" && isPlaceholder) {
    console.log("[DEV] Skipping email send - using placeholder SMTP. Add real Gmail credentials to backend/.env for real delivery.");
    return;
  }

  // Use visitor's subject if provided, otherwise default
  const emailSubject = (subject && String(subject).trim())
    ? `[Portfolio] ${String(subject).trim()}`
    : `New portfolio contact from ${name}`;

  const textBody = `Name: ${name}\nEmail: ${email}\nSubject: ${emailSubject}\n\nMessage:\n${message}`;

  try {
    await transporter.sendMail({
      from: env.SMTP_USER,
      to: env.RECEIVER_EMAIL,
      replyTo: `"${name}" <${email}>`,
      subject: emailSubject,
      text: textBody,
    });
  } catch (err) {
    // Log SMTP response for debugging (e.g. 535 auth failed)
    const smtpCode = err?.responseCode ?? err?.code;
    const smtpMsg = err?.response ?? err?.message;
    console.error("[Mail] SMTP error:", smtpCode, smtpMsg);
    throw err;
  }
}

