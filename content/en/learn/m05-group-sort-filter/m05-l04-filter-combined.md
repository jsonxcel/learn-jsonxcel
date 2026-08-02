---
title: "Combined filter conditions"
description: "AND / OR / NOT in F= expressions — blocked for JSON ds until table sources are supported."
lesson_id: m05-l04
module: m05
weight: 40
level: intermediate
template_name: lesson_m05_filter_combined
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/en-US/lesson_m05_filter_combined/template.png"
  result: "/previews/en-US/lesson_m05_filter_combined/result.png"
---

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
