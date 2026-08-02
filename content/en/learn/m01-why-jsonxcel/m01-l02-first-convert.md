---
title: "Your first convert call"
description: "Call POST /api/convert with template_name, language, and a JSON data source to download Excel or PDF."
lesson_id: m01-l02
module: m01
weight: 20
level: beginner
template_name: lesson_m01_first_convert
data_sources: ["ds"]
output_formats: ["excel", "pdf"]

previews:
  template: "/previews/en-US/lesson_m01_first_convert/template.png"
  result: "/previews/en-US/lesson_m01_first_convert/result.png"
---

## Learning objectives

- Assemble a valid `POST /api/convert` body for JsonXcel.WebServer
- Choose `language` using BCP-47 folder names (`en-US`, `zh-CN`, …)
- Switch between `output_format: "excel"` and `"pdf"`
- Interpret stream vs metadata responses via `return_file_stream`

{{< lesson_demo template_name="lesson_m01_first_convert" >}}

## Prerequisites

- JsonXcel.WebServer running (default `http://127.0.0.1:5000`)
- Template file available as `Templates/{language}/lesson_m01_first_convert.xlsx` after P05

## Template highlights

`lesson_m01_first_convert` is a minimal workbook: a few labels and mustache markers such as `{{name}}` and `{{age}}`. It exists so you can verify the end-to-end path before learning advanced markup.

> Until the template pipeline ships the `.xlsx`, treat this lesson’s JSON and API shape as the contract; convert smoke belongs to later phases.

## JSON structure

```json
{
  "name": "Ada",
  "age": 36,
  "title": "Engineer"
}
```

| Field | Notes |
|-------|--------|
| `name` | Bound to a text marker on the sheet |
| `age` | Numeric example (formatting can stay in Excel) |
| `title` | Optional extra field if the template defines it |

Always stringify the object before assigning `ds`.

## API call example

### JavaScript (Excel stream)

```javascript
const API = "http://127.0.0.1:5000";

const res = await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m01_first_convert",
    language: "en-US",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({ name: "Ada", age: 36, title: "Engineer" })
  })
});

const blob = await res.blob();
// save blob as .xlsx in the browser or write to disk in Node
```

### curl (same contract)

```bash
curl -X POST http://127.0.0.1:5000/api/convert \
  -H "Content-Type: application/json" \
  -d "{\"template_name\":\"lesson_m01_first_convert\",\"language\":\"en-US\",\"output_format\":\"excel\",\"return_file_stream\":true,\"ds\":\"{\\\"name\\\":\\\"Ada\\\",\\\"age\\\":36}\"}"
```

### PDF

Set `"output_format": "pdf"` when you need a print-ready file. The JSON contract stays the same.

## Common mistakes

| Mistake | Fix |
|---------|-----|
| `ds` sent as an object in the JSON body | Wrap with `JSON.stringify` so `ds` is a string field |
| Wrong `language` / missing folder | Match `Templates/en-US/` … folder names exactly |
| Typo in `template_name` | Use the registry name **without** `.xlsx` |
| Assuming errors return HTML | Failed converts return JSON with `success`, `error_code`, `error_message` |

## Checkpoint

You should be able to explain every field in the request body and know where the workbook file must live. Next module starts real template markup.

## Next

- Module 02 — [Template markup basics](../../m02-template-basics/) (when published)
- Or continue the outline in the lesson registry
