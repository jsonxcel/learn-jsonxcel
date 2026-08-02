---
title: "複合フィルタ"
description: "AND / OR / NOT in F= expressions — blocked for JSON ds until table sources are supported."
lesson_id: m05-l04
module: m05
weight: 40
level: intermediate
template_name: lesson_m05_filter_combined
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ja-JP/lesson_m05_filter_combined/template.png"
  result: "/previews/ja-JP/lesson_m05_filter_combined/result.png"
---

> このページは日本語の入口です。詳細な技術説明は当面英語／簡体中国語が正本です。マーカー・JSON キー・`template_name` は全言語で共通です。


## Learning objectives

- Compose compound filters with `AND` / `OR` / `NOT`
- Same JSON limitation as m05-l03 — combine conditions in application code for now

{{< lesson_demo template_name="lesson_m05_filter_combined" >}}

## Syntax (table DS required)

```text
{{ds.rows.sku(F=(ds.rows.amount > 50 and ds.rows.region = "West"))}}
{{ds.rows.sku(F=(ds.rows.amount > 100 or ds.rows.qty < 2))}}
```

## Workaround with JSON `ds`

```javascript
const rows = allRows.filter(
  (r) => r.amount > 50 && r.region === "West"
);
```

Ship the filtered array in `ds` and keep template markers free of `F=`.

## JSON structure

```json
{
  "title": "West high value",
  "rows": [
    { "region": "West", "sku": "B", "amount": 120 }
  ]
}
```

## Next

- Module 06 — layout and style (when published)
