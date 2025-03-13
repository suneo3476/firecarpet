# Web Page Screenshot Tool - 初心者向けガイド

## このツールでできること
Webページの以下の部分を自動でキャプチャするツールです：
- ページの初期状態
- モーダルウィンドウを開いた状態
- アコーディオンメニューをすべて開いた状態

ID/パスワードによるBasic認証が必要なページにも対応しています。

## 準備するもの
- MacまたはWindowsのパソコン
- インターネット接続

## インストール手順

### 1. ターミナル（コマンドプロンプト）を開く

**Macの場合:**
1. Spotlightを開く（画面右上の🔍アイコンまたは⌘ + Spaceキー）
2. "ターミナル"と入力
3. Enterキーを押す

**Windowsの場合:**
1. スタートメニューを開く（画面左下のWindowsアイコン）
2. "コマンドプロンプト"と入力
3. Enterキーを押す

### 2. Node.jsのインストール

**Macの場合:**
1. まず、nvmというツールをインストール
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```
2. ターミナルを一度閉じて、再度開く
3. Node.jsをインストール
   ```bash
   nvm install --lts
   ```
4. インストールの確認
   ```bash
   node --version
   ```
   （バージョン番号が表示されればOK）

**Windowsの場合:**
1. [Node.js公式サイト](https://nodejs.org/)を開く
2. LTS（推奨版）のダウンロードボタンをクリック
3. ダウンロードしたファイルを実行
4. インストーラーの指示に従ってインストール
   - 全ての画面で「次へ」を選択
5. コマンドプロンプトを開き、以下を入力して確認
   ```bash
   node --version
   ```
   （バージョン番号が表示されればOK）

### 3. ツールのセットアップ

1. デスクトップに作業フォルダを作成
   
   **Macの場合:**
   ```bash
   cd ~/Desktop
   mkdir screenshot-tool
   cd screenshot-tool
   ```

   **Windowsの場合:**
   ```bash
   cd %USERPROFILE%\Desktop
   mkdir screenshot-tool
   cd screenshot-tool
   ```

2. リポジトリをクローン
   ```bash
   git clone https://github.com/your-username/web-screenshot-tool.git .
   ```

3. 必要なプログラムのインストール
   ```bash
   npm install
   ```

4. Playwrightブラウザのインストール（重要）
   ```bash
   npx playwright install
   ```
   このステップで、スクリーンショット撮影に必要なブラウザがインストールされます。

5. 環境変数の設定（必要な場合）
   ```bash
   cp .env.example .env
   ```
   .envファイルを編集して認証情報を設定

## URLリストの準備
`urls.csv` ファイルに以下の形式でURLを記載します：
```csv
url
https://example.com/page1/
https://example.com/page2/
```

## 設定の変更方法
`src/config/config.js` で以下の設定を変更できます：
- Basic認証のID/パスワード
- 画面サイズ
- 待機時間
- 出力フォルダ

## 実行方法
ターミナル（コマンドプロンプト）で以下のコマンドを実行：
```bash
npm start
```

## 出力結果の確認
`specific_screenshots` フォルダに以下のファイルが作成されます：
- `[ページ名]_initial.png` - ページの初期状態
- `[ページ名]_modal_[modalId].png` - モーダルウィンドウを開いた状態
- `[ページ名]_dropdown_[index].png` - アコーディオンメニューをすべて開いた状態
- `specific_results.csv` - 実行結果のサマリー