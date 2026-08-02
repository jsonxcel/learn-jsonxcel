---
title: "Response options stream and metadata"
description: "Control return_file_stream and related flags to download bytes or receive JSON metadata."
lesson_id: m03-l04
module: m03
weight: 40
level: beginner
template_name: lesson_m03_single_ds
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/en-US/lesson_m03_single_ds/template.png"
  result: "/previews/en-US/lesson_m03_single_ds/result.png"
---

## Learning objectives

- Use `return_file_stream: true` for direct file download
- Use `return_file_stream: false` (and related flags) for JSON metadata workflows
- Reuse `lesson_m03_single_ds` — this lesson is about **API response shape**, not new markup

{{< lesson_demo template_name="lesson_m03_single_ds" >}}

## Template highlights

No new markers. Same template as [Single data source ds](../m03-l01-single-ds/). Focus on request flags commonly used with JsonXcel.WebServer:

| Flag | Typical effect |
|------|----------------|
| `return_file_stream` | `true` → file bytes; `false` → JSON envelope |
| `return_file_name` | Include generated file name in metadata / headers |
| `return_file_size` | Include size when metadata mode is on |
| `return_file_path` | Server path — usually **off** for public demos |

Exact header vs body placement follows the running WebServer version — check the Convert API docs for your build.

## JSON structure

Reuse the single-source document:

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

## API call example

### Stream download

```javascript
const API = "http://127.0.0.1:5000";
const ds = JSON.stringify({
  reportTitle: "Weekly inventory",
  warehouse: "WH-East",
  asOf: "2026-07-16",
  lines: [
    { sku: "A-100", onHand: 40 },
    { sku: "B-200", onHand: 12 }
  ]
});

const res = await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m03_single_ds",
    language: "en-US",
    output_format: "excel",
    return_file_stream: true,
    ds
  })
});
const blob = await res.blob();
```

### Metadata mode

```javascript
const res = await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m03_single_ds",
    language: "en-US",
    output_format: "excel",
    return_file_stream: false,
    return_file_name: true,
    return_file_size: true,
    return_file_path: false,
    ds
  })
});
const meta = await res.json();
// meta may include success, file_name, file_size, …
```

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Parsing JSON when stream mode is on | Read `blob` / bytes instead |
| Enabling `return_file_path` on public sites | Keep path private; store files via your own pipeline |
| Ignoring `success: false` envelopes | Map `error_code` / `error_message` in clients |
| Assuming a new template is required | Reuse `lesson_m03_single_ds` |

## Module checkpoint

You can choose data sources, output format, and response mode. Module 04 starts list expansion.

## Next

- Module 04 — [Cell expansion for lists](../../m04-expansion-context/m04-l01-expansion/) (upcoming batches)
