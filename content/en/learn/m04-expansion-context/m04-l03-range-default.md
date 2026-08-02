---
title: "Range and default values"
description: "Use R= to set a fallback context range and DV= for empty-field defaults."
lesson_id: m04-l03
module: m04
weight: 30
level: intermediate
template_name: lesson_m04_range_default
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/en-US/lesson_m04_range_default/template.png"
  result: "/previews/en-US/lesson_m04_range_default/result.png"
---

## Learning objectives

- Apply `R=` so fields inside a rectangle share a fallback context
- Show a fallback with `DV=` / `defaultValue=` when JSON has null or missing values
- Combine range + default for sparse master-detail sheets

{{< lesson_demo template_name="lesson_m04_range_default" >}}

## Template highlights

| Property | Meaning |
|----------|---------|
| `R=B3:F10` | Fields in that area treat the range-defining cell as context when `C=` is omitted |
| `DV=-` or `defaultValue=0` | Displayed when the bound value is empty |

Example markers:

```text
{{ds.regions.name(R=A6:C20)}}
{{ds.regions.revenue(DV=0)}}
{{ds.regions.note(DV="-")}}
```

## JSON structure

```json
{
  "report": "Regional revenue",
  "regions": [
    { "name": "West", "revenue": 12000, "note": "On plan" },
    { "name": "East", "revenue": null, "note": null },
    { "name": "APAC", "revenue": 8000, "note": "" }
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
    template_name: "lesson_m04_range_default",
    language: "en-US",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      report: "Regional revenue",
      regions: [
        { name: "West", revenue: 12000, note: "On plan" },
        { name: "East", revenue: null, note: null },
        { name: "APAC", revenue: 8000, note: "" }
      ]
    })
  })
});
```

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Expecting `DV` on formula cells | Defaults apply to data fields, not Excel formulas |
| Range that does not cover detail markers | Widen `R=` to include every dependent cell |

## Next

- [Fill modes overflow and overwrite](../m04-l04-fillmode/)
