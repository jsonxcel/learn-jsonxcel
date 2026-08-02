---
title: "코드 작성 vs 템플릿 분리"
description: "Why drawing Excel cells in application code does not scale — and how JsonXcel separates layout from JSON."
lesson_id: m01-l01
module: m01
weight: 10
level: beginner
template_name: lesson_m01_pain_vs_template
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ko-KR/lesson_m01_pain_vs_template/template.png"
  result: "/previews/ko-KR/lesson_m01_pain_vs_template/result.png"
---

> 이 페이지는 한국어 입구입니다. 상세 기술 설명은 당분간 영어/간체가 기준입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.


## Learning objectives

- Explain the cost of painting worksheets in C# / Java / TypeScript
- Describe the JsonXcel boundary: **Excel owns layout**, **JSON owns data**, **API owns conversion**
- Identify what belongs in a template versus what belongs in `ds`

{{< lesson_demo template_name="lesson_m01_pain_vs_template" >}}

## Why this lesson exists

Many teams start by writing cells in code: set font, merge ranges, loop rows, hard-code column letters. It works for a demo and fails when finance changes a label, ops adds a column, or APAC needs a second language.

JsonXcel keeps the workbook in `Templates/{language}/` and accepts business payloads over `POST /api/convert`. Layout changes become file updates — not redeploys of painting logic.

## Template highlights

The sample workbook `lesson_m01_pain_vs_template` (provided by the template pipeline in P05) contrasts two panels:

| Area | Intent |
|------|--------|
| “Code-drawn” notes | Short reminder of what you used to maintain in source |
| “Template-bound” cells | Mustache-style markers filled from `ds` |

You do not need every marker memorized yet — Module 02 covers markup. Here, focus on **ownership**: designers edit the `.xlsx`; services only send JSON.

> Template binaries are produced by the build / P05 pipeline. Until then, convert calls may fail if the file is missing under `Templates/{language}/`.

## JSON structure

Primary data source: `ds` (a **JSON string** in the HTTP body).

```json
{
  "scenario": "monthly-invoice",
  "approach": "template",
  "customer": "Northwind Traders",
  "amount": 1280.5,
  "currency": "USD",
  "notes": "Layout lives in Excel; services only POST JSON."
}
```

| Field | Role |
|-------|------|
| `scenario` | Labels the demo case on the sheet |
| `approach` | e.g. `template` vs a narrative about code |
| `customer` / `amount` / `currency` | Typical business fields bound by markers |
| `notes` | Free text for the comparison callout |

Keep property names stable across languages. Localize labels inside the workbook, not by renaming JSON keys.

## API call example

```javascript
const API = "http://127.0.0.1:5000"; // or site params.apiBaseUrl

const res = await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m01_pain_vs_template",
    language: "ko-KR",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      scenario: "monthly-invoice",
      approach: "template",
      customer: "Northwind Traders",
      amount: 1280.5,
      currency: "USD",
      notes: "Layout lives in Excel; services only POST JSON."
    })
  })
});

if (!res.ok) {
  console.error(await res.text());
}
```

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Putting nested JSON object in `ds` | Send `ds` as a **string** (`JSON.stringify(...)`) |
| Encoding layout rules in the client | Move fonts, merges, and wording into the workbook |
| Different JSON keys per language | Keep keys identical; swap `Templates/{language}/` files |
| Expecting this lesson to teach every marker | Continue to m01-l02 for the first full convert walkthrough |

## Next

- [Your first convert call](../m01-l02-first-convert/)
