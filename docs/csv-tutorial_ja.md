# CSV設定チュートリアル

## CSVファイルとは？

CSV（Comma-Separated Values）ファイルは、ExcelやGoogle Sheetsなどの表計算ソフトで編集できるシンプルなテキストファイルです。

## URLの設定

`urls.csv`ファイルはキャプチャするページを指定します：

```csv
url
https://example.com/page1
https://example.com/page2
```

Excelで編集する場合：
1. ファイルを開く
2. "url"ヘッダーの下に1行に1つのURLを追加
3. CSV形式で保存

## クリック可能な要素の設定

`selectors.csv`ファイルは操作する要素を定義します：

```csv
selector,description,wait_time
.button-menu,メニューボタン,500
.faq-question,よくある質問,1000
```

各行の内容：
- **selector**: 要素を見つけるためのCSSセレクタ（以下参照）
- **description**: 人間が読める名前（参照用）
- **wait_time**: クリック後に待機するミリ秒数（アニメーション/読み込み用）

## セレクタの見つけ方

Google Chromeを使用：

1. 対象ページにアクセス
2. キャプチャしたい要素を右クリック
3. "検証"を選択
4. ハイライトされたHTMLコードを確認
5. `class="..."`や`id="..."`などの属性を探す
6. セレクタを作成：
   - クラスの場合： `.class-name`（例：`.login-button`）
   - IDの場合： `#id-name`（例：`#menu-toggle`）
   - データ属性の場合： `[attribute="value"]`（例：`[data-modal="login"]`）

## セレクタの例

### 基本的なセレクタ
```csv
selector,description,wait_time
.button,すべてのボタン,500
#main-menu,メインメニュー,1000
[data-toggle="modal"],Bootstrapモーダル,1000
```

### 一般的なフレームワーク要素
```csv
selector,description,wait_time
.nav-link,ナビゲーションリンク,500
.accordion-header,Bootstrapアコーディオン,1000
.MuiButton-root,Material UIボタン,800
```

### 複数のセレクタの組み合わせ
カンマで複数の要素を対象にできます：
```csv
selector,description,wait_time
.btn-primary,.btn-secondary,すべての主要・副次ボタン,800
```

## ヒント

1. 仕組みを理解するまで、シンプルなセレクタから始める
2. `.button`や`.modal-trigger`などの一般的なクラスでテスト
3. 要素の読み込みに時間がかかる場合は`wait_time`を調整
4. 多くの類似要素がある場合は、セレクタをより具体的に
5. `screenshots`フォルダで結果を確認する