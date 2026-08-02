---
title: "Image fields"
description: "Render Base64 image bytes with img=true (ka=true to keep aspect)."
lesson_id: m06-l04
module: m06
weight: 40
level: intermediate
template_name: lesson_m06_image
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/en-US/lesson_m06_image/template.png"
  result: "/previews/en-US/lesson_m06_image/result.png"
---

## Learning objectives

- Pass PNG/JPEG as Base64 in JSON
- Mark the cell `{{ds.logo(img=true, ka=true)}}`
- Size via w/h or keep aspect

{{< lesson_demo template_name="lesson_m06_image" >}}

> Prefer a data:image/png;base64,... data-URI for the image field (raw Base64 alone may NRE).

> Send a real Base64 string at convert time (smoke tests use a tiny PNG).

## Template highlights

Supports byte[] / Base64. Shorthand: img, w, h, ka.

## JSON structure

```json
{
  "name": "Acme",
  "logo": "<base64-png>"
}
```

## API call example

```javascript
const API = "http://127.0.0.1:5000";
await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m06_image",
    language: "en-US",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"name\": \"Acme\", \"logo\": \"<base64-png>\" }"
  })
});
```

## Next

Module 07 — [Pagination](../../m07-pagination/)
