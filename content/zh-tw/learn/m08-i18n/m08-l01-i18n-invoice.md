---
title: "同一 template_name，多語言目錄"
description: "在 Templates/{lang}/ 下放本地化 xlsx，標記鍵保持一致。"
lesson_id: m08-l01
module: m08
weight: 10
level: intermediate
template_name: lesson_m08_i18n_invoice
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m08_i18n_invoice/template.png"
  result: "/previews/zh-TW/lesson_m08_i18n_invoice/result.png"
---

## 學習目標

- 每種語言複用 `lesson_m08_i18n_invoice`
- 只本地化標籤；ds 欄位名保持穩定
- convert 時傳 `language` 選擇目錄

{{< lesson_demo template_name="lesson_m08_i18n_invoice" >}}

## 模板要點

主路徑先交付 en-US + zh-CN；zh-TW/ja-JP/ko-KR 在 P08 用同名檔案補齊。

## JSON 結構說明

```json
{
  "customer": "Contoso Ltd",
  "invoiceNo": "INV-1001",
  "invoiceDate": "2026-07-16",
  "lines": [
    {"sku": "A-100", "qty": 2, "price": 40},
    {"sku": "B-200", "qty": 1, "price": 120}
  ]
}
```

## API 呼叫示例

```javascript
const API = "http://127.0.0.1:5000";
await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m08_i18n_invoice",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"customer\": \"Contoso Ltd\", \"invoiceNo\": \"INV-1001\", \"invoiceDate\": \"2026-07-16\", \"lines\": [ {\"sku\": \"A-100\", \"qty\": 2, \"price\": 40}, {\"sku\": \"B-200\", \"qty\": 1, \"price\": 120} ] }"
  })
});
```

## 下一步

[本地化策略](../m08-l02-i18n-strategy/)
