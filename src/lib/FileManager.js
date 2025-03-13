// src/lib/FileManager.js
const fs = require('fs').promises;
const path = require('path');
const Papa = require('papaparse');
const config = require('../config/config');
const logger = require('../utils/logger');

class FileManager {
  constructor() {
    this.outputDir = config.output.dir;
  }

  async initialize() {
    await fs.mkdir(this.outputDir, { recursive: true });
  }

  async loadUrls() {
    try {
      const csvContent = await fs.readFile(config.files.urls, 'utf-8');
      return new Promise((resolve) => {
        Papa.parse(csvContent, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => resolve(results.data)
        });
      });
    } catch (error) {
      logger.error(`URLsファイル読み込みエラー: ${error.message}`);
      throw new Error('URLリストの読み込みに失敗しました。urls.csvを確認してください。');
    }
  }

  async loadSelectors() {
    try {
      const csvContent = await fs.readFile(config.files.selectors, 'utf-8');
      
      return new Promise((resolve) => {
        Papa.parse(csvContent, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const selectors = results.data.map(row => ({
              selector: row.selector,
              description: row.description || '',
              waitTime: parseInt(row.wait_time) || config.timing.defaultWait
            }));
            
            resolve(selectors);
          }
        });
      });
    } catch (error) {
      logger.warn('セレクタCSVの読み込みに失敗しました。デフォルト値を使用します:', error);
      // デフォルトのセレクタを返す
      return [
        { selector: '.modal-trigger, [data-toggle="modal"]', description: 'Default modal triggers', waitTime: 1000 },
        { selector: '.accordion-header, .dropdown-toggle', description: 'Default accordion/dropdown', waitTime: 500 }
      ];
    }
  }

  getFilename(url, type, identifier = '') {
    const urlObj = new URL(url);
    const sanitizedPath = urlObj.pathname.replace(/[^a-z0-9]/gi, '_');
    const baseName = `${urlObj.hostname}${sanitizedPath}`.toLowerCase();
    
    return identifier 
      ? `${baseName}_${type}_${identifier}.png`
      : `${baseName}_${type}.png`;
  }

  getOutputPath(url, type, identifier = '') {
    const filename = this.getFilename(url, type, identifier);
    return path.join(this.outputDir, filename);
  }

  async saveResults(results) {
    const resultsCsv = Papa.unparse(results);
    const outputPath = path.join(this.outputDir, 'results.csv');
    await fs.writeFile(outputPath, resultsCsv);
    logger.info(`結果をCSVに保存しました: ${outputPath}`);
  }
}

module.exports = FileManager;