---
title: "식과 수식 셀"
description: "Mix JSON-bound values with Excel formulas so totals recalculate after convert."
lesson_id: m02-l03
module: m02
weight: 30
level: beginner
template_name: lesson_m02_expression
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ko-KR/lesson_m02_expression/template.png"
  result: "/previews/ko-KR/lesson_m02_expression/result.png"
---

> 이 페이지는 한국어 입구입니다. 상세 기술 설명은 당분간 영어/간체가 기준입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.


## Learning objectives

- Bind input cells with mustache markers while leaving **Excel formulas** for derived values
- Prefer engine-side expressions only when the template engine documents them; otherwise keep math in native Excel formulas
- Convert once and open the workbook to see formulas still live

{{< lesson_demo template_name="lesson_m02_expression" >}}

## Template highlights

`lesson_m02_expression` (P05 pipeline) typically looks like:

| Cell | Content | Role |
|------|---------|------|
| Qty | `{{qty}}` | Bound from JSON |
| Unit price | `{{unitPrice}}` | Bound from JSON |
| Line total | `=B2*C2` (example) | Native Excel formula — **not** replaced by JSON |
| Optional expression cell | Engine-specific expression marker if supported | Evaluated at process time |

Design rule for JsonXcel tutorials:

1. Put **business inputs** in JSON (`qty`, `unitPrice`, tax rate, …).
2. Put **calculations** in Excel formulas so analysts can audit them in the file.
3. Use template-engine expressions only for documented operators — do not invent syntax.

After convert, formulas should still reference the filled cells (or expanded ranges in later modules).

> Until the `.xlsx` ships, treat the JSON fields below as the contract the template must bind.

## JSON structure

```json
{
  "product": "Alpine Desk",
  "qty": 3,
  "unitPrice": 249.0,
  "taxRate": 0.08
}
```

| Field | Use |
|-------|-----|
| `product` | Label / description cell |
| `qty` | Numeric input for formulas |
| `unitPrice` | Numeric input for formulas |
| `taxRate` | Rate used by a formula such as `=lineTotal*taxRate` |

Do **not** pre-compute `lineTotal` in JSON for this lesson — let Excel do it.

## API call example

```javascript
const API = "http://127.0.0.1:5000";

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m02_expression",
    language: "ko-KR",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      product: "Alpine Desk",
      qty: 3,
      unitPrice: 249.0,
      taxRate: 0.08
    })
  })
});
```

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Sending already-calculated totals only | Keep inputs in JSON; formulas in the sheet |
| Overwriting a formula cell with `{{total}}` | Bind inputs; leave the formula cell alone |
| Assuming PDF will edit formulas | PDF is a snapshot; Excel preserves live formulas |
| Inventing undocumented expression syntax | Stick to mustache + Excel formulas unless docs say otherwise |

## Next

- [Inline markers in text](../m02-l04-inline/)
