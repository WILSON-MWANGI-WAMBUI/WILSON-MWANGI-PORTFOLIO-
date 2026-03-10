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
});

export async function sendContactEmail({ name, email, message }) {
  // For Gmail deliverability, the "from" must typically match the authenticated account.
  // Use replyTo so that replying goes to the visitor.
  const subject = `New portfolio contact from ${name}`;

  const textBody = `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`;

  await transporter.sendMail({
    from: env.SMTP_USER,
    to: env.RECEIVER_EMAIL,
    replyTo: `"${name}" <${email}>`,
    subject,
    text: textBody,
  });
}

