---
title: "欄位穩定、文案本地化策略"
description: "不要翻譯 JSON 鍵；把給人看的文案放進各語言工作簿。"
lesson_id: m08-l02
module: m08
weight: 20
level: intermediate
template_name: lesson_m08_i18n_strategy
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m08_i18n_strategy/template.png"
  result: "/previews/zh-TW/lesson_m08_i18n_strategy/result.png"
---

## 學習目標

- 各語言保持相同的 camelCase 鍵
- 只翻譯表內標籤/頁尾
- 避免把特定語言句子塞進 JSON

{{< lesson_demo template_name="lesson_m08_i18n_strategy" >}}

## 模板要點

演示表列出 `productName` / `unitPrice` / `currency`，提示列已本地化。

## JSON 結構說明

```json
{
  "productName": "Alpine Desk",
  "unitPrice": 249,
  "currency": "USD"
}
```

## API 呼叫示例

```javascript
const API = "http://127.0.0.1:5000";
await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m08_i18n_strategy",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"productName\": \"Alpine Desk\", \"unitPrice\": 249, \"currency\": \"USD\" }"
  })
});
```

## 下一步

模組 09 — [銷售訂單](../../m09-practical/)
