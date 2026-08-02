---
title: "Fill modes overflow and overwrite"
description: "Choose FM=Insert vs FM=Overwrite and optionally FR= fill ranges for fixed layouts."
lesson_id: m04-l04
module: m04
weight: 40
level: intermediate
template_name: lesson_m04_fillmode
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/en-US/lesson_m04_fillmode/template.png"
  result: "/previews/en-US/lesson_m04_fillmode/result.png"
---

## Learning objectives

- Use default insert fill mode (`FM=Insert`) so expansion adds rows
- Switch to `FM=Overwrite` for fixed layouts that should not insert rows
- Understand `FR=` (fill range) when overwrite data may overflow

{{< lesson_demo template_name="lesson_m04_fillmode" >}}

## Template highlights

| Mode | Behavior |
|------|----------|
| `FM=Insert` (default) | Insert rows/columns, then write values and styles |
| `FM=Overwrite` | Write into existing cells; useful for fixed grids |
| `FR=A8:C12` | With overwrite, the rectangle that may be duplicated on overflow |

```text
{{ds.lines.sku(FM=Overwrite, FR=A8:C12)}}
{{ds.lines.qty(FM=Overwrite, FR=A8:C12)}}
```

Keep enough blank rows in the template for the expected list size when using overwrite without overflow duplication.

## JSON structure

```json
{
  "title": "Fixed grid lines",
  "lines": [
    { "sku": "A-100", "qty": 2 },
    { "sku": "B-200", "qty": 1 },
    { "sku": "C-300", "qty": 4 },
    { "sku": "D-400", "qty": 3 }
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
    template_name: "lesson_m04_fillmode",
    language: "en-US",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      title: "Fixed grid lines",
      lines: [
        { sku: "A-100", qty: 2 },
        { sku: "B-200", qty: 1 },
        { sku: "C-300", qty: 4 },
        { sku: "D-400", qty: 3 }
      ]
    })
  })
});
```

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Overwrite with no spare rows | Pre-size the grid or use `FR=` overflow behavior |
| Mixing insert and overwrite on the same band | Keep one fill mode per expanding group |

## Next

- Module 05 — grouping, sort, and filter (when published)
