// src/config/config.js
const config = {
  files: {
    urls: 'urls.csv',
    selectors: 'selectors.csv'
  },
  output: {
    dir: process.env.OUTPUT_DIR || 'screenshots',
    fileTypes: {
      initial: 'initial',
      clicked: 'clicked'
    }
  },
  browser: {
    viewport: {
      width: parseInt(process.env.VIEWPORT_WIDTH) || 1280,
      height: parseInt(process.env.VIEWPORT_HEIGHT) || 800
    },
    credentials: {
      username: process.env.BASIC_AUTH_USERNAME || '',
      password: process.env.BASIC_AUTH_PASSWORD || ''
    }
  },
  timing: {
    defaultWait: 1000,
    scrollDelay: 100,
    pageLoad: 2000
  }
};

module.exports = config;