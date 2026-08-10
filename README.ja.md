# JsonXcel Learn

**[JsonXcel](https://www.jsonxcel.com/)** のハンズオンチュートリアルです。JSON と Excel テンプレートから `POST /api/convert` で Excel / PDF を生成します。

このリポジトリは次の両方です。

- **多言語ラーニングパス**（9 モジュール · 30+ レッスン）
- ローカル実行や公開が可能な **Hugo サイト**（例: GitHub Pages）

**言語:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

---

## リンク

| | |
|---|---|
| Learn サイト | [learn.jsonxcel.com](https://learn.jsonxcel.com/) |
| 製品 / ドキュメント | [www.jsonxcel.com](https://www.jsonxcel.com/) |
| 本リポジトリ | [github.com/jsonxcel/learn-jsonxcel](https://github.com/jsonxcel/learn-jsonxcel) |
| サーバー配布 | [Releases](https://github.com/jsonxcel/learn-jsonxcel/releases) |

---

## JsonXcel サーバーのダウンロード

レッスンデモにはローカルまたはホストされた **JsonXcel.WebServer** が必要です。ビルド済みパッケージは GitHub Releases に公開します（対応プラットフォームは今後追加予定）。

| プラットフォーム | パッケージ | ダウンロード |
|------------------|------------|--------------|
| Windows x64 | `JsonXcel-win-x64.zip` | [最新](https://github.com/jsonxcel/learn-jsonxcel/releases/latest/download/JsonXcel-win-x64.zip) |
| Linux x64 | `JsonXcel-linux-x64.zip` | [最新](https://github.com/jsonxcel/learn-jsonxcel/releases/latest/download/JsonXcel-linux-x64.zip) |

全バージョン: <https://github.com/jsonxcel/learn-jsonxcel/releases>

展開後にサーバーを起動し（既定 `http://127.0.0.1:5000`）、レッスン用テンプレートを `Templates/{language}/` に配置してから、レッスンページで **Generate Excel** を使います。

> 上記ファイル名が「最新」直リンクの契約です。Release 添付時は**同じ名前**を使うか、本 README と `hugo.toml` の URL を更新してください。

---

## チュートリアルを見る

サイト起動後、または本番 URL で:

- English: `/en/learn/`
- 简体中文: `/zh-cn/learn/`
- 繁體中文: `/zh-tw/learn/`
- 日本語: `/ja/learn/`
- 한국어: `/ko/learn/`

技術本文の正本は当面 **英語** と **簡体中国語** です。マーカー・JSON キー・`template_name` は全言語で共通です。

---

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

---

## リポジトリ構成

```text
content/{lang}/learn/       # レッスン Markdown
assets/templates/{BCP-47}/  # lesson_*.xlsx
assets/samples/{BCP-47}/    # デモ用 JSON
assets/previews/{BCP-47}/   # template.png + result.png
hugo.toml                   # サイト設定
```

---

## 関連

- 製品サイト / API: [www.jsonxcel.com](https://www.jsonxcel.com/)
- メンテナー向け: [DEVELOPING.md](DEVELOPING.md)

---

## ライセンス

公開時の `LICENSE` を参照してください。教材とサンプルは JsonXcel 学習用です。
