// src/index.js
require('dotenv').config();
const ScreenshotManager = require('./lib/ScreenshotManager');
const config = require('./config/config');
const logger = require('./utils/logger');

logger.info('ClickShot - Webページスクリーンショット自動化ツールを開始します');
logger.info('設定情報:', {
  urlsFile: config.files.urls,
  selectorsFile: config.files.selectors,
  outputDir: config.output.dir,
  credentials: {
    username: config.browser.credentials.username ? '********' : 'Not set',
    password: config.browser.credentials.password ? '********' : 'Not set'
  }
});

const manager = new ScreenshotManager();

manager.run()
  .then(() => {
    logger.info('処理が正常に完了しました');
    process.exit(0);
  })
  .catch(error => {
    logger.error('プログラムの実行中にエラーが発生しました:', error);
    process.exit(1);
  });