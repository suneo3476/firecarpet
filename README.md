# Firecarpet

firecarpetは、以下を含むWebページのスクリーンショットを自動的に取得するツールです：
- ページの初期状態
- インタラクティブ要素（モーダル、ドロップダウン、アコーディオン）クリック後の状態

## 機能

- CSSセレクタに基づいてクリック可能な要素を自動検出
- Basic認証が必要なページにも対応
- シンプルなCSVベースの設定（プログラミング不要）
- CSVファイルを通じて完全にカスタマイズ可能
- 自動スクロールによる遅延読み込みコンテンツのサポート

## インストール

1. このリポジトリをクローン
```bash
git clone https://github.com/suneo3476/firecarpet.git
cd clickshot
```

2. 依存関係をインストール
```bash
npm install
```

3. 認証設定（必要な場合）
```bash
cp .env.example .env
# .envファイルを編集して認証情報を設定
```

## 使用方法

1. キャプチャするURLを`urls.csv`にリスト：
```csv
url
https://example.com/page1
https://example.com/page2
```

2. クリック可能な要素を`selectors.csv`で定義：
```csv
selector,description,wait_time
.modal-button,モーダルトリガー,1000
.accordion-header,アコーディオンヘッダー,500
```

3. ツールを実行：
```bash
npm start
```

4. `screenshots`ディレクトリにスクリーンショットが保存されます：
   - `[ドメイン]_[パス]_initial.png` - ページの初期状態
   - `[ドメイン]_[パス]_clicked_[要素].png` - 要素クリック後の状態

## ドキュメント

- [English Beginner's Guide](docs/beginner-guide-en.md)
- [日本語初心者ガイド](docs/beginner-guide-ja.md)
- [CSV設定チュートリアル](docs/csv-tutorial-ja.md)
- [CSV Configuration Tutorial (English)](docs/csv-tutorial.md)

## ライセンス

MITライセンス - 詳細は[LICENSE](LICENSE)ファイルをご覧ください。
