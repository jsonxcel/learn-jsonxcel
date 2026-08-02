---
title: "フィルタ演算子"
description: "F= expression filters — currently requires a table data source, not plain JSON ds."
lesson_id: m05-l03
module: m05
weight: 30
level: intermediate
template_name: lesson_m05_filter
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ja-JP/lesson_m05_filter/template.png"
  result: "/previews/ja-JP/lesson_m05_filter/result.png"
---

> このページは日本語の入口です。詳細な技術説明は当面英語／簡体中国語が正本です。マーカー・JSON キー・`template_name` は全言語で共通です。


## Learning objectives

- Know the `F=` / filter expression syntax (`>`, `AND`, `OR`, `LIKE`, `NULL`, …)
- Understand that **JsonXcel's JSON `ds` path does not accept `F=` today** — the engine requires a table data source
- Prefer filtering in your application before convert until table binding is exposed

{{< lesson_demo template_name="lesson_m05_filter" >}}

## Engine limitation (important)

Convert smoke with:

```text
{{ds.rows.sku(F=(ds.rows.amount > 50))}}
```

against a JSON `ds` fails with: *The filter must be used with a single table or multiple table data source.*

Until the WebServer exposes `DataTable` / table binding on `/api/convert`, teach the syntax here but **filter in app code**:

```javascript
const rows = allRows.filter((r) => r.amount > 50);
// then convert with the filtered array
```

## Syntax reference (when table DS is available)

```text
{{ds.rows.sku(F=(ds.rows.amount > 50))}}
{{ds.rows.sku(F=(ds.rows.region = "West"))}}
{{ds.rows.sku(F=(ds.rows.note = NULL))}}
```

## JSON structure (pre-filtered for demos)

```json
{
  "title": "Filtered in application",
  "rows": [
    { "region": "West", "sku": "B", "amount": 120 },
    { "region": "East", "sku": "C", "amount": 90 }
  ]
}
```

## Next

- [Combined filter conditions](../m05-l04-filter-combined/)
