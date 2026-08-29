# JsonXcel

**セルフホスト Excel テンプレートエンジン。JSON in, Excel/PDF out.**

JsonXcel は多言語 Excel テンプレートと JSON を、1 回の `POST /api/convert` で結合します。レイアウトは Excel に残り、データはあなたのネットワークに残ります。

**言語:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

![30 秒デモ: 受注 Excel テンプレート + JSON → 完成ブック](docs/media/json-in-excel-out.gif)

## まずここから

| | |
|---|---|
| 製品サイト | [jsonxcel.com/ja/](https://www.jsonxcel.com/ja/) |
| Learn | [jsonxcel.com/ja/learn/](https://www.jsonxcel.com/ja/learn/) |
| ダウンロード | [jsonxcel.com/ja/download/](https://www.jsonxcel.com/ja/download/) |

このリポジトリは **Learn** サイトです（9 モジュール · 30+ レッスン）。GitHub Pages: [jsonxcel.github.io/learn-jsonxcel/ja/](https://jsonxcel.github.io/learn-jsonxcel/ja/)。英語入口: [jsonxcel.com/en/](https://www.jsonxcel.com/en/)、[/en/learn/](https://www.jsonxcel.com/en/learn/)、[/en/download/](https://www.jsonxcel.com/en/download/)。

## クイックスタート

**JsonXcel.WebServer** をローカルで起動し（既定 `http://127.0.0.1:5000`）、ワークブックを `Templates/{language}/` に置いてから変換します。

```javascript
const res = await fetch("http://127.0.0.1:5000/api/convert", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m01_first_convert",
    language: "ja-JP",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({ name: "Ada", age: 36 })
  })
});
const blob = await res.blob(); // .xlsx として保存
```

同じ呼び出しを curl で:

```bash
curl -X POST http://127.0.0.1:5000/api/convert \
  -H "Content-Type: application/json" \
  -d "{\"template_name\":\"lesson_m01_first_convert\",\"language\":\"ja-JP\",\"output_format\":\"excel\",\"return_file_stream\":true,\"ds\":\"{\\\"name\\\":\\\"Ada\\\",\\\"age\\\":36}\"}"
```

`ds` は **JSON 文字列** である必要があります（オブジェクトを `stringify`）。ネストしたオブジェクトとして送らないでください。印刷用は `output_format: "pdf"`。上の GIF は [受注レッスン](https://jsonxcel.github.io/learn-jsonxcel/ja/learn/m09-practical/m09-l01-sales-order/) です。契約は同じで、テンプレートがより実務的です。

## ライセンス

どのエディションも**フル機能**です。ライセンスが変えるのは、未ライセンス表示の有無とキーの有効期間だけです。

| エディション | 価格 | 出力 |
|---|---|---|
| **Unlicensed** | 無料ダウンロード | 機能制限なし。Excel に未ライセンス sheet、PDF ヘッダーに表示 |
| **1-month licensed** | 無料評価キー | 未ライセンス表示なし。1 台のマシンコードに紐付け、1 か月で期限切れ |
| **Lifetime licensed** | **$900** 一括 | 未ライセンス表示なし。1 台のマシンコード。サーバー変更時は新しいキー |

キーは [料金](https://www.jsonxcel.com/ja/pricing/) から。デジタル商品: 生涯キー発行後は返金しません。

## JsonXcel.WebServer のダウンロード

自己完結パッケージ（.NET SDK 不要）:

| プラットフォーム | パッケージ | ダウンロード |
|------------------|------------|--------------|
| Windows x64 | `JsonXcel-win-x64.zip` | [最新](https://github.com/jsonxcel/learn-jsonxcel/releases/latest/download/JsonXcel-win-x64.zip) |
| Linux x64 | `JsonXcel-linux-x64.zip` | [最新](https://github.com/jsonxcel/learn-jsonxcel/releases/latest/download/JsonXcel-linux-x64.zip) |

全バージョン: <https://github.com/jsonxcel/learn-jsonxcel/releases>

展開後にサーバーを起動し、レッスン用テンプレートを `Templates/{language}/` に配置してから、レッスンページで **Generate Excel** を使います。

> 上記ファイル名が「最新」直リンクの契約です。Release 添付時は**同じ名前**を使うか、本 README と `hugo.toml` の URL を更新してください。

## チュートリアルを見る

- English: `/en/learn/`
- 简体中文: `/zh-cn/learn/`
- 繁體中文: `/zh-tw/learn/`
- 日本語: `/ja/learn/`
- 한국어: `/ko/learn/`

技術本文の正本は当面 **英語** と **簡体中国語** です。マーカー・JSON キー・`template_name` は全言語で共通です。

## この Hugo サイトをローカルで動かす

必要環境: [Hugo Extended](https://gohugo.io/installation/)（0.120+ 推奨）、Node.js 20+（テーマ CSS）。

```bash
# テーマ CSS（初回 / スタイル変更時）
cd hugo-theme-ete   # モノレポでは ../hugo_template/hugo-theme-ete など
npm install
npm run build:css

# チュートリアルサイトのルート（このディレクトリ）
hugo server -D --port 1313
# 例: http://localhost:1313/ja/learn/
```

`public/index.html` を `file://` で開かないでください。HTTP サーバーが必要で、ルートは言語サブディレクトリへリダイレクトします。

公開用ビルド:

```bash
hugo --minify -b https://learn.jsonxcel.com/
# または GitHub Pages 例: https://jsonxcel.github.io/learn-jsonxcel/
```

## リポジトリ構成

```text
content/{lang}/learn/       # レッスン Markdown
assets/templates/{BCP-47}/  # lesson_*.xlsx
assets/samples/{BCP-47}/    # デモ用 JSON
assets/previews/{BCP-47}/   # template.png + result.png
docs/media/                 # README デモ GIF
hugo.toml                   # サイト設定
```

## 関連

- 製品サイト / API: [www.jsonxcel.com](https://www.jsonxcel.com/)
- メンテナー向け: [DEVELOPING.md](DEVELOPING.md)

教材とサンプルは JsonXcel 学習用です。エンジン本体は商用ソフトウェアです（上記 [ライセンス](#ライセンス)）。
