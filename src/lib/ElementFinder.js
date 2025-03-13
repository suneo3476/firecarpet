// src/lib/ElementFinder.js
const logger = require('../utils/logger');

class ElementFinder {
  constructor(page, selectors) {
    this.page = page;
    this.selectors = selectors;
  }

  async findClickableElements() {
    logger.info('クリック可能な要素の検索を開始します...');
    
    const allElements = [];
    
    // 各セレクタについて要素を検索
    for (const selectorConfig of this.selectors) {
      const { selector, description, waitTime } = selectorConfig;
      
      logger.info(`"${selector}" (${description})の検索中...`);
      
      const elements = await this.findElementsBySelector(selector, description, waitTime);
      allElements.push(...elements);
      
      logger.info(`"${selector}" で ${elements.length}個の要素が見つかりました`);
    }
    
    this.logElementsFound(allElements);
    return allElements;
  }
  
  async findElementsBySelector(selector, description, waitTime) {
    const elements = await this.page.evaluate(async (data) => {
      // ページ内の指定セレクタに一致する要素を検索
      const matches = [];
      const nodeList = document.querySelectorAll(data.selector);
      
      // 見えている要素だけを選別
      for (let i = 0; i < nodeList.length; i++) {
        const element = nodeList[i];
        const rect = element.getBoundingClientRect();
        
        // 要素が可視状態かチェック
        if (rect.width > 0 && rect.height > 0) {
          // 除外要素（ヘッダー内など）をスキップ
          const isExcluded = 
            element.closest('header') !== null || 
            element.closest('.fixed-navigation') !== null;
            
          if (!isExcluded) {
            matches.push({
              selector: data.selector,
              description: data.description,
              waitTime: data.waitTime,
              text: element.innerText?.trim() || element.id || 'unnamed-element',
              boundingBox: {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height
              },
              attributes: {
                id: element.id || '',
                class: element.className || '',
                type: element.getAttribute('type') || ''
              }
            });
          }
        }
      }
      
      return matches;
    }, { selector, description, waitTime });
    
    return elements;
  }

  logElementsFound(elements) {
    logger.info(`=== 検出結果: ${elements.length}個のクリック可能要素 ===`);
    
    // セレクタごとの要約
    const selectorCounts = {};
    elements.forEach(el => {
      selectorCounts[el.selector] = (selectorCounts[el.selector] || 0) + 1;
    });
    
    Object.entries(selectorCounts).forEach(([selector, count]) => {
      logger.info(`- "${selector}": ${count}個`);
    });
  }
}

module.exports = ElementFinder;