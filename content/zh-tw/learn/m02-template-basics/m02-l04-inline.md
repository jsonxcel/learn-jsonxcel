---
title: "內聯文字中的標記"
description: "在句子中嵌入 {{欄位}}，讓一個單元格同時包含固定文案與繫結值。"
lesson_id: m02-l04
module: m02
weight: 40
level: beginner
template_name: lesson_m02_inline
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m02_inline/template.png"
  result: "/previews/zh-TW/lesson_m02_inline/result.png"
---

## 學習目標

- 編寫內聯標記，例如 `尊敬的 {{ds.contact}}，`（靜態文案 + 一個標記）
- 混排文案時優先 **每格一個標記** — 同一格多個標記不可靠
- 儘量把標點與本地化文案留在 Excel，而不是塞進 JSON

{{< lesson_demo template_name="lesson_m02_inline" >}}

## 模板要點

`lesson_m02_inline` 演示 **內聯** mustache：單元格同時包含敘述文字與標記。

示例：

```text
尊敬的 {{ds.contact}}，
感谢您的订单 {{ds.orderNo}}。
发往 {{ds.city}}
计划于 {{ds.shipDate}} 发出。
```

與整格標記（單元格里只有 `{{ds.contact}}`）對比：

| 風格 | 適用 |
|------|------|
| 整格 | 乾淨的資料列、數字、編碼 |
| 內聯（每格一個標記） | 句子、郵件式行、頁尾說明 |

按需在 Excel 中設定自動換行 / 富文字。一句話需要兩個值時，拆成多格或改用整格標記。

> 模板二進位制由 P05 提供。以下 JSON 鍵為繫結契約。

## JSON 結構說明

```json
{
  "contact": "Ada Lovelace",
  "orderNo": "SO-10042",
  "city": "London",
  "shipDate": "2026-07-20"
}
```

| 欄位 | 典型內聯用途 |
|------|----------------|
| `contact` | 稱呼 |
| `orderNo` | 句中的單號 |
| `city` | 目的地短語 |
| `shipDate` | 計劃日期句（格式可在 Excel 中設定） |

## API 呼叫示例

```javascript
const API = "http://127.0.0.1:5000";

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m02_inline",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      contact: "Ada Lovelace",
      orderNo: "SO-10042",
      city: "London",
      shipDate: "2026-07-20"
    })
  })
});
```

## 常見錯誤

| 錯誤 | 修正 |
|------|------|
| 整句都放進 JSON | 固定文案留在 Excel；只繫結變數 |
| 括號不配對（`{{ name }` / `{{name}}}`） | 成對的 `{{` / `}}`；引擎嚴格時勿多空格 |
| 靠改 JSON 鍵做本地化 | 在 `Templates/{lang}/` 翻譯句子；鍵名保持穩定 |
| 用內聯標記做長表 | 改用列 + 擴充套件（模組 04） |

## 模組檢查點

你已能繫結扁平欄位、巢狀路徑、公式輸入與內聯敘述。模組 03 聚焦資料來源與 API 響應模式。

## 下一步

- 模組 03 — [單資料來源 ds](../../m03-datasource-api/m03-l01-single-ds/)（後續批次）
