---
title: "キー固定・文言ローカライズ"
description: "Never translate JSON keys; put human text in the workbook per language folder."
lesson_id: m08-l02
module: m08
weight: 20
level: intermediate
template_name: lesson_m08_i18n_strategy
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ja-JP/lesson_m08_i18n_strategy/template.png"
  result: "/previews/ja-JP/lesson_m08_i18n_strategy/result.png"
---

> このページは日本語の入口です。詳細な技術説明は当面英語／簡体中国語が正本です。マーカー・JSON キー・`template_name` は全言語で共通です。


## Learning objectives

- Keep camelCase keys identical across locales
- Translate sheet labels / footers only
- Avoid embedding locale-specific sentences in JSON

{{< lesson_demo template_name="lesson_m08_i18n_strategy" >}}

## Template highlights

Demo sheet lists `productName` / `unitPrice` / `currency` with localized hint column.

## JSON structure

```json
{
  "productName": "Alpine Desk",
  "unitPrice": 249,
  "currency": "USD"
}
```

## API call example

```javascript
const API = "http://127.0.0.1:5000";
await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m08_i18n_strategy",
    language: "ja-JP",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"productName\": \"Alpine Desk\", \"unitPrice\": 249, \"currency\": \"USD\" }"
  })
});
```

## Next

Module 09 — [Sales order](../../m09-practical/)
