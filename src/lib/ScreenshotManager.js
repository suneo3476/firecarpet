// src/lib/ScreenshotManager.js
const { chromium } = require('playwright');
const config = require('../config/config');
const ElementFinder = require('./ElementFinder');
const PageInteractor = require('./PageInteractor');
const FileManager = require('./FileManager');
const logger = require('../utils/logger');

class ScreenshotManager {
  constructor() {
    this.fileManager = new FileManager();
    this.results = [];
  }

  async captureUrl(browser, url, selectors) {
    const context = await browser.newContext({
      viewport: config.browser.viewport,
      httpCredentials: config.browser.credentials.username ? config.browser.credentials : undefined
    });

    try {
      logger.info(`\n=== URLの処理を開始: ${url} ===`);
      const page = await context.newPage();
      
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      const pageInteractor = new PageInteractor(page);
      await pageInteractor.autoScroll();
      await page.waitForTimeout(config.timing.pageLoad);

      // 初期状態のスクリーンショット
      const initialPath = this.fileManager.getOutputPath(url, config.output.fileTypes.initial);
      await pageInteractor.takeScreenshot(initialPath);
      logger.info(`初期状態のスクリーンショットを保存: ${initialPath}`);
      
      // クリック可能な要素を検索
      const elementFinder = new ElementFinder(page, selectors);
      const elements = await elementFinder.findClickableElements();
      
      // 各要素をクリックして状態をキャプチャ
      const results = {
        elements: []
      };
      
      for (let i = 0; i < elements.length; i++) {
        logger.info(`\n要素 ${i + 1}/${elements.length} の処理中...`);
        if (i > 0) {
          // 前の状態をリセットするためにページを再読み込み
          await page.reload();
          await pageInteractor.autoScroll();
          await page.waitForTimeout(config.timing.pageLoad);
        }
        
        const element = elements[i];
        const identifier = this.sanitizeIdentifier(element.text || `element-${i}`);
        const outputPath = this.fileManager.getOutputPath(url, config.output.fileTypes.clicked, identifier);
        
        const result = await pageInteractor.captureClickableElement(element, outputPath);
        results.elements.push({
          selector: element.selector,
          description: element.description,
          text: element.text,
          status: result.status,
          path: result.path,
          error: result.error
        });
      }

      await context.close();
      return { 
        url, 
        status: 'success',
        initialScreenshot: initialPath,
        elementsFound: elements.length,
        elementResults: results.elements
      };

    } catch (error) {
      logger.error(`エラー: ${url}`, error);
      await context.close();
      return { url, status: 'error', error: error.message };
    }
  }

  sanitizeIdentifier(text) {
    // ファイル名に使えない文字を置換
    return text.replace(/[^a-z0-9]/gi, '_').substring(0, 30);
  }

  async run() {
    try {
      await this.fileManager.initialize();
      const urls = await this.fileManager.loadUrls();
      const selectors = await this.fileManager.loadSelectors();
      
      logger.info(`設定を読み込みました:`);
      logger.info(`- ${urls.length}件のURL`);
      logger.info(`- ${selectors.length}種類のセレクタ`);

      const browser = await chromium.launch({
        headless: true
      });
      
      try {
        for (const row of urls) {
          const result = await this.captureUrl(browser, row.url, selectors);
          this.results.push(result);
        }
      } finally {
        await browser.close();
      }

      await this.fileManager.saveResults(this.results);

      logger.info('\n処理が完了しました。');
      this.logSummary();

    } catch (error) {
      logger.error('プログラムの実行中にエラーが発生しました:', error);
      throw error;
    }
  }

  logSummary() {
    const summary = {
      total: this.results.length,
      success: 0,
      error: 0,
      elementsTotal: 0,
      elementsSuccess: 0,
      elementsError: 0
    };
    
    this.results.forEach(r => {
      summary[r.status] += 1;
      
      if (r.status === 'success' && r.elementResults) {
        summary.elementsTotal += r.elementsFound || 0;
        
        r.elementResults.forEach(er => {
          summary[`elements${er.status.charAt(0).toUpperCase() + er.status.slice(1)}`] += 1;
        });
      }
    });
    
    logger.info('結果の概要:');
    logger.info(`- 処理したURL: ${summary.total}件 (成功: ${summary.success}件, エラー: ${summary.error}件)`);
    logger.info(`- 検出した要素: ${summary.elementsTotal}個 (成功: ${summary.elementsSuccess}個, エラー: ${summary.elementsError}個)`);
  }
}

module.exports = ScreenshotManager;