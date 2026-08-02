---
title: "Mustache フィールド"
description: "Bind flat JSON fields to Excel cells with {{field}} markers and convert through JsonXcel."
lesson_id: m02-l01
module: m02
weight: 10
level: beginner
template_name: lesson_m02_mustache
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ja-JP/lesson_m02_mustache/template.png"
  result: "/previews/ja-JP/lesson_m02_mustache/result.png"
---

> このページは日本語の入口です。詳細な技術説明は当面英語／簡体中国語が正本です。マーカー・JSON キー・`template_name` は全言語で共通です。


## Learning objectives

- Place `{{field}}` markers in workbook cells that map 1:1 to top-level JSON keys
- Keep Excel formatting on the cell while the engine replaces marker text
- Convert with `template_name: lesson_m02_mustache` and a flat `ds` object

{{< lesson_demo template_name="lesson_m02_mustache" >}}

## Template highlights

In `lesson_m02_mustache` (shipped by the P05 template pipeline), put **only the marker** in a cell when the whole value should be replaced:

| Cell intent | Marker example |
|-------------|----------------|
| Customer name | `{{customer}}` |
| Order number | `{{orderNo}}` |
| Total amount | `{{total}}` |

Tips:

- Match spellings exactly — `{{OrderNo}}` ≠ `{{orderNo}}` if JSON uses camelCase.
- Apply number / date formats in Excel on the cell; send raw values in JSON.
- Leave static labels in neighboring cells (no braces).

> Template binaries come from the build / P05 pipeline. Until then, treat the JSON contract below as the source of truth.

## JSON structure

```json
{
  "customer": "Northwind Traders",
  "orderNo": "SO-10042",
  "total": 1280.5,
  "currency": "USD"
}
```

| Field | Bound by |
|-------|----------|
| `customer` | `{{customer}}` |
| `orderNo` | `{{orderNo}}` |
| `total` | `{{total}}` |
| `currency` | `{{currency}}` |

Flat objects only in this lesson. Nested paths are **m02-l02**.

## API call example

```javascript
const API = "http://127.0.0.1:5000";

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m02_mustache",
    language: "ja-JP",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      customer: "Northwind Traders",
      orderNo: "SO-10042",
      total: 1280.5,
      currency: "USD"
    })
  })
});
```

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Extra spaces or typos inside `{{ }}` | Copy keys from the JSON contract |
| Wrapping quotes inside the cell (`"{{name}}"`) | Put only the marker; Excel type handles display |
| Sending nested objects here | Flatten for this lesson, or continue to m02-l02 |
| `ds` as a nested JSON object in the body | `JSON.stringify` so `ds` is a string |

## Next

- [Nested objects and array indexes](../m02-l02-nested-path/)
