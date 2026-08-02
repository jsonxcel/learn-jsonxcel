---
title: "ページネーションとページ番号"
description: "Insert page breaks on group masters and show Excel footer page numbers."
lesson_id: m07-l01
module: m07
weight: 10
level: intermediate
template_name: lesson_m07_pagination
data_sources: ["ds"]
output_formats: ["excel", "pdf"]

previews:
  template: "/previews/ja-JP/lesson_m07_pagination/template.png"
  result: "/previews/ja-JP/lesson_m07_pagination/result.png"
---

> このページは日本語の入口です。詳細な技術説明は当面英語／簡体中国語が正本です。マーカー・JSON キー・`template_name` は全言語で共通です。


## Learning objectives

- Set `pageBreak=true` on a master field
- Nest detail rows with `C=`
- Use header/footer for Page &P of &N

{{< lesson_demo template_name="lesson_m07_pagination" >}}

## Template highlights

Master `{{ds.depts.name(G=merge, pageBreak=true)}}` with detail context.

## JSON structure

```json
{
  "depts": [
    {"name": "Sales", "items": [{"name": "Laptop", "qty": 2}, {"name": "Mouse", "qty": 10}]},
    {"name": "Ops", "items": [{"name": "Toner", "qty": 5}]}
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
    template_name: "lesson_m07_pagination",
    language: "ja-JP",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"depts\": [ {\"name\": \"Sales\", \"items\": [{\"name\": \"Laptop\", \"qty\": 2}, {\"name\": \"Mouse\", \"qty\": 10}]}, {\"name\": \"Ops\", \"items\": [{\"name\": \"Toner\", \"qty\": 5}]} ] }"
  })
});
```

## Next

[Repeat group header](../m07-l02-repeat-group/)
