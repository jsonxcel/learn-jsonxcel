---
title: "同一 template_name・5言語フォルダ"
description: "Ship localized xlsx under Templates/{lang}/ with identical marker keys."
lesson_id: m08-l01
module: m08
weight: 10
level: intermediate
template_name: lesson_m08_i18n_invoice
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ja-JP/lesson_m08_i18n_invoice/template.png"
  result: "/previews/ja-JP/lesson_m08_i18n_invoice/result.png"
---

> このページは日本語の入口です。詳細な技術説明は当面英語／簡体中国語が正本です。マーカー・JSON キー・`template_name` は全言語で共通です。


## Learning objectives

- Reuse `lesson_m08_i18n_invoice` for every language
- Localize labels only; keep ds field names stable
- Pass `language` on convert to pick the folder

{{< lesson_demo template_name="lesson_m08_i18n_invoice" >}}

## Template highlights

Primary pipelines ship en-US + zh-CN; zh-TW/ja-JP/ko-KR follow the same file name in P08.

## JSON structure

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

## API call example

```javascript
const API = "http://127.0.0.1:5000";
await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m08_i18n_invoice",
    language: "ja-JP",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"customer\": \"Contoso Ltd\", \"invoiceNo\": \"INV-1001\", \"invoiceDate\": \"2026-07-16\", \"lines\": [ {\"sku\": \"A-100\", \"qty\": 2, \"price\": 40}, {\"sku\": \"B-200\", \"qty\": 1, \"price\": 120} ] }"
  })
});
```

## Next

[Localization strategy](../m08-l02-i18n-strategy/)
