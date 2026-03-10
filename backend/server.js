/**
 * Server entrypoint (Render start command: `node server.js`).
 *
 * Responsibilities:
 * - Import the configured Express app.
 * - Start the HTTP listener.
 */

import { app } from "./src/app.js";
import { env } from "./src/config/env.js";
import { logger } from "./src/utils/logger.js";

app.listen(env.PORT, () => {
  logger.info(`Server listening on port ${env.PORT}`);
});

