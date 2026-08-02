---
title: "グループごとのヘッダー繰返し"
description: "Keep a group title visible above each detail band using master-detail context."
lesson_id: m07-l02
module: m07
weight: 20
level: intermediate
template_name: lesson_m07_repeat_group
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ja-JP/lesson_m07_repeat_group/template.png"
  result: "/previews/ja-JP/lesson_m07_repeat_group/result.png"
---

> このページは日本語の入口です。詳細な技術説明は当面英語／簡体中国語が正本です。マーカー・JSON キー・`template_name` は全言語で共通です。


## Learning objectives

- Expand group names with G=merge
- Attach lines with C= to the group cell
- Design print layouts so each group reads as a section

{{< lesson_demo template_name="lesson_m07_repeat_group" >}}

## Template highlights

`{{ds.groups.name(G=merge)}}` + `{{ds.groups.lines.label(C=A7)}}`.

## JSON structure

```json
{
  "company": "Northwind",
  "groups": [
    {"name": "Hardware", "lines": [{"label": "SSD", "amount": 120}, {"label": "RAM", "amount": 80}]},
    {"name": "Services", "lines": [{"label": "Support", "amount": 200}]}
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
    template_name: "lesson_m07_repeat_group",
    language: "ja-JP",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"company\": \"Northwind\", \"groups\": [ {\"name\": \"Hardware\", \"lines\": [{\"label\": \"SSD\", \"amount\": 120}, {\"label\": \"RAM\", \"amount\": 80}]}, {\"name\": \"Services\", \"lines\": [{\"label\": \"Support\", \"amount\": 200}]} ] }"
  })
});
```

## Next

Module 08 — [i18n invoice](../../m08-i18n/)
