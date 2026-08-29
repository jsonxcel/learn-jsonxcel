# JsonXcel

**自託管 Excel 範本引擎。JSON 進去，Excel / PDF 出來。**

JsonXcel 用一次 `POST /api/convert`，把多語言 Excel 範本與 JSON 綁在一起。版式留在 Excel，資料留在你的網路。

**語言：** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

![30 秒示範：銷售訂單 Excel 範本 + JSON → 產生活頁簿](docs/media/json-in-excel-out.gif)

## 從這裡開始

| | |
|---|---|
| 產品官網 | [jsonxcel.com/zh-tw/](https://www.jsonxcel.com/zh-tw/) |
| 教程 Learn | [jsonxcel.com/zh-tw/learn/](https://www.jsonxcel.com/zh-tw/learn/) |
| 下載 | [jsonxcel.com/zh-tw/download/](https://www.jsonxcel.com/zh-tw/download/) |

本倉庫是 **Learn** 教程站（9 個模組 · 30+ 課時）。GitHub Pages 鏡像：[jsonxcel.github.io/learn-jsonxcel/zh-tw/](https://jsonxcel.github.io/learn-jsonxcel/zh-tw/)。英文入口見 [jsonxcel.com/en/](https://www.jsonxcel.com/en/)、[/en/learn/](https://www.jsonxcel.com/en/learn/)、[/en/download/](https://www.jsonxcel.com/en/download/)。

## 快速上手

本機執行 **JsonXcel.WebServer**（預設 `http://127.0.0.1:5000`），把活頁簿放到 `Templates/{language}/`，然後轉換：

```javascript
const res = await fetch("http://127.0.0.1:5000/api/convert", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m01_first_convert",
    language: "zh-TW",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({ name: "Ada", age: 36 })
  })
});
const blob = await res.blob(); // 存成 .xlsx
```

同樣的請求用 curl：

```bash
curl -X POST http://127.0.0.1:5000/api/convert \
  -H "Content-Type: application/json" \
  -d "{\"template_name\":\"lesson_m01_first_convert\",\"language\":\"zh-TW\",\"output_format\":\"excel\",\"return_file_stream\":true,\"ds\":\"{\\\"name\\\":\\\"Ada\\\",\\\"age\\\":36}\"}"
```

`ds` 必須是 **JSON 字串**（先 `JSON.stringify`），不能在請求體裡嵌套物件。需要印刷件時把 `output_format` 改成 `"pdf"`。上面的 GIF 用的是 [銷售訂單](https://jsonxcel.github.io/learn-jsonxcel/zh-tw/learn/m09-practical/m09-l01-sales-order/) 課時——同一套契約，範本更完整。

## 授權

每個版本都是**完整產品**。授權只決定匯出是否帶未授權標記，以及金鑰有效期。

| 版本 | 價格 | 匯出 |
|---|---|---|
| **Unlicensed（未授權）** | 免費下載 | 功能完整。Excel 多一個未授權 sheet；PDF 頁首有未授權提示 |
| **1-month licensed（評估）** | 免費領碼 | 無未授權標記。綁一台裝置碼，一個月到期 |
| **Lifetime licensed（終身）** | **$900** 一次 | 無未授權標記。綁一台裝置碼；換機需新金鑰 |

領碼與購買見 [定價](https://www.jsonxcel.com/zh-tw/pricing/)。數位商品：終身金鑰簽發後不退款。

## 下載 JsonXcel.WebServer

預編譯自包含套件（不要求安裝 .NET SDK）：

| 平台 | 套件名稱 | 下載 |
|------|----------|------|
| Windows x64 | `JsonXcel-win-x64.zip` | [最新版](https://github.com/jsonxcel/learn-jsonxcel/releases/latest/download/JsonXcel-win-x64.zip) |
| Linux x64 | `JsonXcel-linux-x64.zip` | [最新版](https://github.com/jsonxcel/learn-jsonxcel/releases/latest/download/JsonXcel-linux-x64.zip) |

全部版本：<https://github.com/jsonxcel/learn-jsonxcel/releases>

解壓後啟動服務，將課時範本放到 `Templates/{language}/`，再開啟課時頁面使用「產生 Excel」。

> 上表檔名即「最新版」直連約定。發布 Release 時請使用**完全相同**的附件名（或同步修改本 README 與 `hugo.toml` 中的連結）。

## 瀏覽教程

- English: `/en/learn/`
- 简体中文: `/zh-cn/learn/`
- 繁體中文: `/zh-tw/learn/`
- 日本語: `/ja/learn/`
- 한국어: `/ko/learn/`

技術正文以 **英文** 與 **簡體中文** 為主；其他語言共用相同的標記、JSON 鍵與 `template_name`。

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

## 倉庫結構

```text
content/{lang}/learn/       # 課時 Markdown
assets/templates/{BCP-47}/  # lesson_*.xlsx
assets/samples/{BCP-47}/    # 示範用 JSON
assets/previews/{BCP-47}/   # template.png + result.png
docs/media/                 # README 示範 GIF
hugo.toml                   # 網站設定（baseURL、API、官網連結、下載）
```

資源目錄 BCP-47：`en-US`、`zh-CN`、`zh-TW`、`ja-JP`、`ko-KR`。

## 相關

- 產品站與 API 文件：[www.jsonxcel.com](https://www.jsonxcel.com/)
- 維護者 / 單體倉庫說明：[DEVELOPING.md](DEVELOPING.md)

教程內容與範例活頁簿供學習 JsonXcel 使用。引擎本身是商業軟體（見上方[授權](#授權)）。
