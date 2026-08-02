---
title: "Excel vs PDF 출력"
description: "Choose output_format excel or pdf on the same template and JSON payload."
lesson_id: m03-l03
module: m03
weight: 30
level: beginner
template_name: lesson_m03_output_formats
data_sources: ["ds"]
output_formats: ["excel", "pdf"]

previews:
  template: "/previews/ko-KR/lesson_m03_output_formats/template.png"
  result: "/previews/ko-KR/lesson_m03_output_formats/result.png"
---

> 이 페이지는 한국어 입구입니다. 상세 기술 설명은 당분간 영어/간체가 기준입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.


## Learning objectives

- Switch `output_format` between `"excel"` and `"pdf"` without changing JSON shape
- Design templates with print layout in mind when PDF is a first-class deliverable
- Know that PDF is a snapshot while Excel keeps editable formulas

{{< lesson_demo template_name="lesson_m03_output_formats" >}}

## Template highlights

`lesson_m03_output_formats` uses one workbook for both outputs. Checklist for PDF-friendly sheets:

| Concern | Guidance |
|---------|----------|
| Page size / margins | Set in Excel Page Layout before convert |
| Print area | Limit to the designed region |
| Fonts | Prefer fonts available on the server |
| Interactive Excel-only features | Do not rely on them in PDF |

JSON and markers stay identical across formats — only the response bytes change.

> Template binary: P05. Contract below is what convert smoke will assert.

## JSON structure

```json
{
  "docTitle": "Shipment notice",
  "recipient": "Wide World Importers",
  "shipDate": "2026-07-18",
  "packages": 2
}
```

## API call example

### Excel

```javascript
const API = "http://127.0.0.1:5000";
const ds = JSON.stringify({
  docTitle: "Shipment notice",
  recipient: "Wide World Importers",
  shipDate: "2026-07-18",
  packages: 2
});

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m03_output_formats",
    language: "ko-KR",
    output_format: "excel",
    return_file_stream: true,
    ds
  })
});
```

### PDF

Reuse the same body with `"output_format": "pdf"`. Save the stream as `.pdf`.

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Different JSON per format | Keep one contract; change only `output_format` |
| Ignoring print layout | Tune Page Setup before expecting clean PDFs |
| Expecting editable formulas in PDF | Use Excel output when analysts must edit |
| Wrong `Accept` / filename handling | Follow `Content-Type` / disposition from the response |

## Next

- [Response options stream and metadata](../m03-l04-response-options/)
