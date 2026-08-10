---
title: "Anatomy of a JsonXcel convert request"
description: "Walk through POST /api/convert fields, data-source strings, and stream vs metadata response modes."
date: 2026-07-01T10:00:00+08:00
categories: ["API"]
tags: ["api", "convert", "json"]
series: ["Getting started with JsonXcel"]
author: "JsonXcel"
---

The convert surface is intentionally small. One endpoint accepts a template identity, a language, optional output options, and one or more data sources.

## Endpoint

`POST /api/convert` with `Content-Type: application/json`.

## Core fields

| Field | Role |
|-------|------|
| `template_name` | Workbook file name without extension |
| `language` | Template folder, e.g. `en-US` |
| `output_format` | `excel` or `pdf` |
| `return_file_stream` | `true` to download bytes; `false` for JSON metadata |
| `ds`, `ds01`, … | Data sources as **JSON strings** |

## Why `ds` is a string

The request body is already JSON. Nesting a second JSON object for `ds` blurs validation and logging. Stringifying the business payload keeps the outer envelope flat and matches how many gateways log bodies.

```javascript
body: JSON.stringify({
  template_name: "lesson_m01_first_convert",
  language: "en-US",
  output_format: "excel",
  return_file_stream: true,
  ds: JSON.stringify({ name: "Ada", age: 36 })
})
```

## Response modes

- **Stream:** useful for browser downloads and direct file responses.  
- **Metadata:** useful when your service stores path/size and uploads elsewhere.

Failed converts return structured JSON (`success: false`, `error_code`, `error_message`) so clients can map codes without scraping HTML.

## Multi-source templates

When a workbook binds more than one region, send `ds01`, `ds02`, and so on — each still a stringified object or array. Keep naming stable so tutorials and production share the same contract.

## See also

- Docs: [Convert API](../../docs/api/convert/)  
- Docs: [Quickstart](../../docs/getting-started/quickstart/)  
- [Designing multilingual Excel templates for APIs](../multilingual-excel-templates/)
