---
title: "Group and aggregate"
description: "Use G=merge / G=repeat / G=list so repeated keys collapse or repeat while sibling fields expand."
lesson_id: m05-l01
module: m05
weight: 10
level: intermediate
template_name: lesson_m05_group
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/en-US/lesson_m05_group/template.png"
  result: "/previews/en-US/lesson_m05_group/result.png"
---

## Learning objectives

- Group a list field with `G=merge` (default) so identical keys share one cell
- Contrast `G=repeat` when every row should reprint the key
- Keep amount/detail columns as normal expanding fields beside the group key

{{< lesson_demo template_name="lesson_m05_group" >}}

## Template highlights

| Property | Effect |
|----------|--------|
| `G=merge` | Merge cells for consecutive equal group values (default) |
| `G=repeat` | Repeat the group value on every detail row |
| `G=list` | Present values as a list style expansion |
| `G=normal` | Normal mode without merge |

```text
{{ds.rows.region(G=merge)}}
{{ds.rows.sku}}
{{ds.rows.amount}}
```

## JSON structure

```json
{
  "title": "Sales by region",
  "rows": [
    { "region": "West", "sku": "A", "qty": 2, "amount": 40 },
    { "region": "West", "sku": "B", "qty": 1, "amount": 120 },
    { "region": "East", "sku": "A", "qty": 5, "amount": 50 },
    { "region": "East", "sku": "C", "qty": 3, "amount": 90 }
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
    template_name: "lesson_m05_group",
    language: "en-US",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      title: "Sales by region",
      rows: [
        { region: "West", sku: "A", qty: 2, amount: 40 },
        { region: "West", sku: "B", qty: 1, amount: 120 },
        { region: "East", sku: "A", qty: 5, amount: 50 },
        { region: "East", sku: "C", qty: 3, amount: 90 }
      ]
    })
  })
});
```

## Next

- [Sorting](../m05-l02-sort/)
