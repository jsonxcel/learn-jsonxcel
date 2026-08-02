---
title: "条件付き書式"
description: "Keep Excel conditional formatting on cells that receive expanded values."
lesson_id: m06-l03
module: m06
weight: 30
level: intermediate
template_name: lesson_m06_conditional
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ja-JP/lesson_m06_conditional/template.png"
  result: "/previews/ja-JP/lesson_m06_conditional/result.png"
---

> このページは日本語の入口です。詳細な技術説明は当面英語／簡体中国語が正本です。マーカー・JSON キー・`template_name` は全言語で共通です。


## Learning objectives

- Apply CF rules on the template amount column
- Expand values into the ruled range
- Use rules for thresholds (e.g. >100 green, <50 red)

{{< lesson_demo template_name="lesson_m06_conditional" >}}

## Template highlights

Rules on `B5:B50` survive convert for filled amounts.

## JSON structure

```json
{
  "lines": [
    {"sku": "A", "amount": 40},
    {"sku": "B", "amount": 120},
    {"sku": "C", "amount": 75}
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
    template_name: "lesson_m06_conditional",
    language: "ja-JP",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"lines\": [ {\"sku\": \"A\", \"amount\": 40}, {\"sku\": \"B\", \"amount\": 120}, {\"sku\": \"C\", \"amount\": 75} ] }"
  })
});
```

## Next

[Image fields](../m06-l04-image/)
