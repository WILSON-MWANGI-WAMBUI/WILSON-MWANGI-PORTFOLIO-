/**
 * Request validation middleware for the contact endpoint.
 *
 * Validation rules:
 * - name: required
 * - email: must be valid
 * - message: minimum length 10
 */

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export function validateContact(req, res, next) {
  const { name, email, subject, message } = req.body ?? {};

  // Collect all validation errors to return a single response to the client.
  const errors = [];

  if (!name || String(name).trim().length === 0) {
    errors.push("Name is required.");
  }

  if (!email || String(email).trim().length === 0) {
    errors.push("Email is required.");
  } else if (!EMAIL_REGEX.test(String(email).trim())) {
    errors.push("Email must be a valid email address.");
  }

  if (!subject || String(subject).trim().length === 0) {
    errors.push("Subject is required.");
  }

  if (!message || String(message).trim().length === 0) {
    errors.push("Message is required.");
  } else if (String(message).trim().length < 10) {
    errors.push("Message must be at least 10 characters long.");
  }

  // If any validation error exists, stop the request here.
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: errors[0], // keep client response shape simple
      errors,
    });
  }

  return next();
}

