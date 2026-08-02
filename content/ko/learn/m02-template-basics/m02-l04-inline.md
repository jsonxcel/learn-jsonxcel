---
title: "인라인 텍스트 표기"
description: "Embed {{fields}} inside a sentence so one cell mixes static copy and bound values."
lesson_id: m02-l04
module: m02
weight: 40
level: beginner
template_name: lesson_m02_inline
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ko-KR/lesson_m02_inline/template.png"
  result: "/previews/ko-KR/lesson_m02_inline/result.png"
---

> 이 페이지는 한국어 입구입니다. 상세 기술 설명은 당분간 영어/간체가 기준입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.


## Learning objectives

- Write inline markers such as `Dear {{ds.contact}},` (static text + one marker)
- Prefer **one marker per cell** when mixing prose — multiple markers in one cell are unreliable
- Choose whole-cell markers vs inline text for the right UX

{{< lesson_demo template_name="lesson_m02_inline" >}}

## Template highlights

`lesson_m02_inline` shows **inline** mustache usage: the cell contains both prose and markers.

Examples:

```text
Dear {{ds.contact}},
thank you for order {{ds.orderNo}}.
Shipment to {{ds.city}}
is scheduled for {{ds.shipDate}}.
```

Compared with whole-cell markers (`{{ds.contact}}` alone in a cell):

| Style | When to use |
|-------|-------------|
| Whole-cell | Clean data columns, numbers, codes |
| Inline (one marker/cell) | Sentences, email-like lines, footnotes |

Apply rich text / wrapping in Excel as needed. If a sentence needs two values, split across cells or use whole-cell markers.

> Template binary arrives via P05. The JSON keys below are the binding contract.

## JSON structure

```json
{
  "contact": "Ada Lovelace",
  "orderNo": "SO-10042",
  "city": "London",
  "shipDate": "2026-07-20"
}
```

| Field | Typical inline use |
|-------|--------------------|
| `contact` | Greeting |
| `orderNo` | Reference in a sentence |
| `city` | Destination phrase |
| `shipDate` | Schedule sentence (format in Excel if needed) |

## API call example

```javascript
const API = "http://127.0.0.1:5000";

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m02_inline",
    language: "ko-KR",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      contact: "Ada Lovelace",
      orderNo: "SO-10042",
      city: "London",
      shipDate: "2026-07-20"
    })
  })
});
```

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Putting the entire sentence in JSON | Keep static wording in Excel; bind only variables |
| Broken braces (`{{ name }` / `{{name}}}`) | Balanced `{{` / `}}`, no stray spaces if the engine is strict |
| Localizing by changing JSON keys | Translate the sentence in `Templates/{lang}/`; keep keys stable |
| Using inline markers for long tables | Prefer columns + expansion (Module 04) |

## Module checkpoint

You can now bind flat fields, nested paths, formula-backed inputs, and inline prose. Module 03 focuses on data sources and API response modes.

## Next

- Module 03 — [Single data source ds](../../m03-datasource-api/m03-l01-single-ds/) (next batches)
