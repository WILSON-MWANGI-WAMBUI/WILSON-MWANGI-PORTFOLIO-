/**
 * Minimal logger utility.
 *
 * In production systems you might use pino/winston, but for a small portfolio API
 * we keep it dependency-free and structured.
 */

function formatMeta(meta) {
  if (!meta) return "";
  try {
    return " " + JSON.stringify(meta);
  } catch {
    return "";
  }
}

export const logger = {
  info(message, meta) {
    console.log(`[INFO] ${message}${formatMeta(meta)}`);
  },
  warn(message, meta) {
    console.warn(`[WARN] ${message}${formatMeta(meta)}`);
  },
  error(message, meta) {
    console.error(`[ERROR] ${message}${formatMeta(meta)}`);
  },
};

