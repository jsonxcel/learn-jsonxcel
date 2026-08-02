---
title: "Single data source ds"
description: "Treat ds as the primary JSON string for most templates — one payload, one binding root."
lesson_id: m03-l01
module: m03
weight: 10
level: beginner
template_name: lesson_m03_single_ds
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/en-US/lesson_m03_single_ds/template.png"
  result: "/previews/en-US/lesson_m03_single_ds/result.png"
---

## Learning objectives

- Send exactly one business payload via the `ds` field
- Keep `ds` as a **JSON string** inside the HTTP JSON body
- Map workbook markers to that single object (or array root, when the template expects it)

{{< lesson_demo template_name="lesson_m03_single_ds" >}}

## Template highlights

`lesson_m03_single_ds` is the default shape for most lessons: every `{{…}}` path resolves under the object you stringify into `ds`.

| Request field | Role |
|---------------|------|
| `ds` | Primary data source (required for this lesson) |
| `ds01`, `ds02`, … | Not used here — see m03-l02 |

Prefer one coherent document model (header + nested collections) over splitting early. Add extra sources only when regions truly come from different systems.

> Template binary: P05. JSON contract below is binding for smoke tests later.

## JSON structure

```json
{
  "reportTitle": "Weekly inventory",
  "warehouse": "WH-East",
  "asOf": "2026-07-16",
  "lines": [
    { "sku": "A-100", "onHand": 40 },
    { "sku": "B-200", "onHand": 12 }
  ]
}
```

Markers use `{{ds.reportTitle}}`, `{{ds.warehouse}}`, and collection expansion such as `{{ds.lines.sku}}`. For this lesson, focus on shipping the whole document in `ds`.

## API call example

```javascript
const API = "http://127.0.0.1:5000";

const document = {
  reportTitle: "Weekly inventory",
  warehouse: "WH-East",
  asOf: "2026-07-16",
  lines: [
    { sku: "A-100", onHand: 40 },
    { sku: "B-200", onHand: 12 }
  ]
};

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m03_single_ds",
    language: "en-US",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify(document)
  })
});
```

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Omitting `ds` | Always include the primary source string |
| Passing an object for `ds` | `JSON.stringify` first |
| Putting half the fields in query/headers | Everything for binding goes in `ds*` |
| Prematurely splitting to `ds01` | Stay on one source until regions diverge |

## Next

- [Multiple data sources](../m03-l02-multi-ds/)
