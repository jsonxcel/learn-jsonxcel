---
title: "Convert API"
description: "POST /api/convert — generate Excel or PDF from a template and JSON."
weight: 10
level: beginner
template_name: ""
lesson_id: ""
---

## Endpoint

`POST /api/convert`

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `template_name` | string | yes | File name without extension |
| `language` | string | no | e.g. `en-US`, `zh-CN` (default `en-US`) |
| `output_format` | string | no | `excel` or `pdf` |
| `return_file_stream` | bool | no | `true` to download bytes |
| `return_file_name` | bool | no | Include name in JSON metadata |
| `return_file_size` | bool | no | Include size in JSON metadata |
| `return_file_path` | bool | no | Include server path (usually off for public demos) |
| `ds`, `ds01`, … | string | yes* | JSON **strings** for data sources |

## Example

```javascript
await fetch(`${API_BASE}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m09_sales_order",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({ orderNo: "SO-1", customer: "Northwind" })
  })
});
```

{{< callout type="tip" title="Response modes" >}}
When `return_file_stream` is `false`, the API returns JSON metadata (`file_name`, `file_size`, …). When `true`, the body is the file stream (metadata may appear in headers).
{{< /callout >}}

## Errors

Failed conversions return JSON with `success: false`, `error_code`, and `error_message`.

## See also

- [Quickstart](../../getting-started/quickstart/)
- [Templates and JSON](../../concepts/templates-and-json/)
