---
title: "按組重複頁首"
description: "用主從上下文讓每組明細上方保留組標題。"
lesson_id: m07-l02
module: m07
weight: 20
level: intermediate
template_name: lesson_m07_repeat_group
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m07_repeat_group/template.png"
  result: "/previews/zh-TW/lesson_m07_repeat_group/result.png"
---

## 學習目標

- 用 G=merge 擴充套件組名
- 明細用 C= 掛到組單元格
- 按列印版式把每組做成小節

{{< lesson_demo template_name="lesson_m07_repeat_group" >}}

## 模板要點

`{{ds.groups.name(G=merge)}}` + `{{ds.groups.lines.label(C=A7)}}`。

## JSON 結構說明

```json
{
  "company": "Northwind",
  "groups": [
    {"name": "Hardware", "lines": [{"label": "SSD", "amount": 120}, {"label": "RAM", "amount": 80}]},
    {"name": "Services", "lines": [{"label": "Support", "amount": 200}]}
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
    template_name: "lesson_m07_repeat_group",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"company\": \"Northwind\", \"groups\": [ {\"name\": \"Hardware\", \"lines\": [{\"label\": \"SSD\", \"amount\": 120}, {\"label\": \"RAM\", \"amount\": 80}]}, {\"name\": \"Services\", \"lines\": [{\"label\": \"Support\", \"amount\": 200}]} ] }"
  })
});
```

## 下一步

模組 08 — [多語言發票](../../m08-i18n/)
