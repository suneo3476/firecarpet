// src/lib/PageInteractor.js
const config = require('../config/config');
const logger = require('../utils/logger');

class PageInteractor {
  constructor(page) {
    this.page = page;
  }

  async autoScroll() {
    logger.info('ページをスクロールして読み込み...');
    
    await this.page.evaluate(async (scrollDelay) => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.documentElement.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, scrollDelay);
      });
    }, config.timing.scrollDelay);
    
    await this.page.waitForLoadState('networkidle');
    logger.info('スクロール完了');
  }

  async captureClickableElement(element, outputPath) {
    try {
      logger.info(`要素「${element.description || element.text}」の処理を開始します...`);
      
      await this.scrollToElement(element.boundingBox);
      
      // 要素のセレクタを特定
      await this.clickElementBySelectorAndCoordinates(element);
      
      logger.info(`要素をクリックしました。${element.waitTime}ms待機中...`);
      await this.page.waitForTimeout(element.waitTime);
      
      await this.takeScreenshot(outputPath);
      logger.info(`スクリーンショットを保存しました: ${outputPath}`);
      
      return { status: 'success', path: outputPath };
    } catch (error) {
      logger.error(`要素「${element.description || element.text}」の処理中にエラー:`, error);
      return { status: 'error', error: error.message };
    }
  }

  async clickElementBySelectorAndCoordinates(element) {
    // 特定の要素が見つからない場合に座標ベースでクリック
    try {
      // セレクタによる要素特定を試みる
      await this.page.evaluate((selector, text) => {
        // テキスト内容やその他の属性で要素を絞り込む
        const elements = Array.from(document.querySelectorAll(selector));
        const targetElement = elements.find(el => 
          el.innerText?.trim() === text || 
          el.id === text || 
          el.getAttribute('aria-label') === text
        );
        
        if (targetElement) {
          targetElement.click();
          return true;
        }
        return false;
      }, element.selector, element.text);
      
    } catch (error) {
      // セレクタでクリックできなかった場合、座標ベースでクリック
      logger.warn(`セレクタでのクリックに失敗。座標ベースでクリックします: ${error.message}`);
      const x = element.boundingBox.x + element.boundingBox.width / 2;
      const y = element.boundingBox.y + element.boundingBox.height / 2;
      await this.page.mouse.click(x, y);
    }
  }

  async scrollToElement(boundingBox) {
    await this.page.evaluate((box) => {
      window.scrollTo(0, Math.max(0, box.y - 100));
    }, boundingBox);
  }

  async takeScreenshot(outputPath) {
    await this.page.screenshot({
      path: outputPath,
      fullPage: true
    });
  }
}

module.exports = PageInteractor;