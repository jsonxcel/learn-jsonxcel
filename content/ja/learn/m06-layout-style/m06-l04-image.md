---
title: "画像フィールド"
description: "Render Base64 image bytes with img=true (ka=true to keep aspect)."
lesson_id: m06-l04
module: m06
weight: 40
level: intermediate
template_name: lesson_m06_image
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ja-JP/lesson_m06_image/template.png"
  result: "/previews/ja-JP/lesson_m06_image/result.png"
---

> このページは日本語の入口です。詳細な技術説明は当面英語／簡体中国語が正本です。マーカー・JSON キー・`template_name` は全言語で共通です。


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
    language: "ja-JP",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"name\": \"Acme\", \"logo\": \"<base64-png>\" }"
  })
});
```

## Next

Module 07 — [Pagination](../../m07-pagination/)
