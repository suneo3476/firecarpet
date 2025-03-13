// src/utils/logger.js
class Logger {
  info(message, ...args) {
    console.log(`[INFO] ${message}`, ...args);
  }

  error(message, ...args) {
    console.error(`[ERROR] ${message}`, ...args);
  }

  warn(message, ...args) {
    console.warn(`[WARN] ${message}`, ...args);
  }

  debug(message, ...args) {
    if (process.env.DEBUG === 'true') {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
}

module.exports = new Logger();