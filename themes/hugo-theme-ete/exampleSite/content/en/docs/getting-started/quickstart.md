---
title: "Quickstart"
description: "Generate an Excel file from JSON in a few minutes."
weight: 10
level: beginner
---

## Prerequisites

- JsonXcel.WebServer running locally (default `http://127.0.0.1:5000`)
- An Excel template under `Templates/{language}/`

## First request (JavaScript)

```javascript
const res = await fetch("http://127.0.0.1:5000/api/convert", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m01_first_convert",
    language: "en-US",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({ name: "Ada", age: 36 })
  })
});
```

## Same call with curl

```bash
curl -X POST http://127.0.0.1:5000/api/convert \
  -H "Content-Type: application/json" \
  -d "{\"template_name\":\"lesson_m01_first_convert\",\"language\":\"en-US\",\"output_format\":\"excel\",\"return_file_stream\":true,\"ds\":\"{\\\"name\\\":\\\"Ada\\\"}\"}"
```

{{< note >}}
`ds` must be a **JSON string** (stringified object), not a nested JSON object in the request body.
{{< /note >}}

{{< tabs >}}
=== Excel
Use `output_format: "excel"` when callers need a workbook they can open in Microsoft Excel or LibreOffice.
=== PDF
Use `output_format: "pdf"` for print-ready distribution. Templates should be designed with print layout in mind.
{{< /tabs >}}

## Next steps

- Read [Templates and JSON](../concepts/templates-and-json/)
- Review the [Convert API](../api/convert/)
