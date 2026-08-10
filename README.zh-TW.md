# JsonXcel 教程（Learn）

面向 **[JsonXcel](https://www.jsonxcel.com/)** 的動手教程——用 JSON 資料與 Excel 範本，透過 `POST /api/convert` 產生 Excel 或 PDF。

本倉庫同時是：

- 一條**多語言學習路徑**（9 個模組 · 30+ 課時），以及
- 一個可本機執行或發布的 **Hugo 網站**（例如 GitHub Pages）。

**語言：** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

---

## 連結

| | |
|---|---|
| 線上教程站 | [learn.jsonxcel.com](https://learn.jsonxcel.com/) |
| 產品 / 文件 | [www.jsonxcel.com](https://www.jsonxcel.com/) |
| 本倉庫 | [github.com/jsonxcel/learn-jsonxcel](https://github.com/jsonxcel/learn-jsonxcel) |
| 伺服器下載 | [Releases](https://github.com/jsonxcel/learn-jsonxcel/releases) |

---

## 下載 JsonXcel 伺服器

課時示範需要本機或託管的 **JsonXcel.WebServer**。預編譯套件發布於 GitHub Releases（之後會增加更多平台）。

| 平台 | 套件名稱 | 下載 |
|------|----------|------|
| Windows x64 | `JsonXcel-win-x64.zip` | [最新版](https://github.com/jsonxcel/learn-jsonxcel/releases/latest/download/JsonXcel-win-x64.zip) |
| Linux x64 | `JsonXcel-linux-x64.zip` | [最新版](https://github.com/jsonxcel/learn-jsonxcel/releases/latest/download/JsonXcel-linux-x64.zip) |

全部版本：<https://github.com/jsonxcel/learn-jsonxcel/releases>

解壓後啟動服務（預設 `http://127.0.0.1:5000`），將課時範本放到 `Templates/{language}/`，再開啟課時頁面使用「產生 Excel」。

> 上表檔名即「最新版」直連約定。發布 Release 時請使用**完全相同**的附件名（或同步修改本 README 與 `hugo.toml` 中的連結）。

---

## 瀏覽教程

網站執行後或線上造訪：

- English: `/en/learn/`
- 简体中文: `/zh-cn/learn/`
- 繁體中文: `/zh-tw/learn/`
- 日本語: `/ja/learn/`
- 한국어: `/ko/learn/`

技術正文以 **英文** 與 **簡體中文** 為主；其他語言共用相同的標記、JSON 鍵與 `template_name`。

---

## 本機執行本 Hugo 站

需要：[Hugo Extended](https://gohugo.io/installation/)（建議 0.120+）、Node.js 20+（主題 CSS）。

```bash
# 主題 CSS（首次或樣式變更時）
cd hugo-theme-ete   # 單體倉庫中多為 ../hugo_template/hugo-theme-ete
npm install
npm run build:css

# 在教程站根目錄（本目錄）
hugo server -D --port 1313
# 例如開啟 http://localhost:1313/zh-tw/learn/
```

請勿用 `file://` 直接開啟 `public/index.html`——需要 HTTP 服務，且根頁會導向語言子目錄（`/en/`、`/zh-tw/` 等）。

部署建置（換成真實公開網址）：

```bash
hugo --minify -b https://learn.jsonxcel.com/
# 或 GitHub Pages，例如 https://jsonxcel.github.io/learn-jsonxcel/
```

---

## 倉庫結構

```text
content/{lang}/learn/       # 課時 Markdown
assets/templates/{BCP-47}/  # lesson_*.xlsx
assets/samples/{BCP-47}/    # 示範用 JSON
assets/previews/{BCP-47}/   # template.png + result.png
hugo.toml                   # 網站設定（baseURL、API、官網連結、下載）
```

資源目錄 BCP-47：`en-US`、`zh-CN`、`zh-TW`、`ja-JP`、`ko-KR`。

---

## 相關

- 產品站與 API 文件：[www.jsonxcel.com](https://www.jsonxcel.com/)
- 維護者 / 單體倉庫說明：[DEVELOPING.md](DEVELOPING.md)

---

## 授權

詳見倉庫發布後的 `LICENSE`。教程內容與範例活頁簿供學習 JsonXcel 使用。
