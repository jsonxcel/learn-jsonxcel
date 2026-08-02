---
title: "셀 확장(목록 전개)"
description: "Expand array fields vertically or horizontally with E=V / E=H template properties."
lesson_id: m04-l01
module: m04
weight: 10
level: intermediate
template_name: lesson_m04_expansion
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ko-KR/lesson_m04_expansion/template.png"
  result: "/previews/ko-KR/lesson_m04_expansion/result.png"
---

> 이 페이지는 한국어 입구입니다. 상세 기술 설명은 당분간 영어/간체가 기준입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.


## Learning objectives

- Place collection markers such as `{{ds.lines.sku}}` on a template row so the engine inserts one row per element
- Set expansion direction with `E=V` (vertical, default) or `E=H` (horizontal)
- Keep non-list fields outside the expanding band so headers stay put

{{< lesson_demo template_name="lesson_m04_expansion" >}}

## Template highlights

`lesson_m04_expansion` shows a product list that grows with the `lines` array:

| Marker | Role |
|--------|------|
| `{{ds.orderNo}}` | Scalar header — does not expand |
| `{{ds.lines.sku}}` | Collection field — expands with the array |
| `{{ds.lines.qty(E=V)}}` | Explicit vertical expansion (same as default) |
| `{{ds.tags(E=H)}}` | Horizontal expansion across columns |

Syntax reminder (engine template properties inside the marker):

```text
{{ds.lines.sku}}
{{ds.lines.qty(E=V)}}
{{ds.tags(E=H)}}
```

`E=N` disables expansion for that marker when you need a single value only.

## JSON structure

```json
{
  "orderNo": "SO-20001",
  "customer": "Contoso Ltd",
  "lines": [
    { "sku": "A-100", "qty": 2, "price": 40 },
    { "sku": "B-200", "qty": 1, "price": 120 },
    { "sku": "C-300", "qty": 5, "price": 15 }
  ],
  "tags": ["rush", "export", "insured"]
}
```

| Field | Binding |
|-------|---------|
| `orderNo`, `customer` | Scalar cells |
| `lines[]` | Vertical expansion band |
| `tags[]` | Horizontal expansion sample |

## API call example

```javascript
const API = "http://127.0.0.1:5000";

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m04_expansion",
    language: "ko-KR",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      orderNo: "SO-20001",
      customer: "Contoso Ltd",
      lines: [
        { sku: "A-100", qty: 2, price: 40 },
        { sku: "B-200", qty: 1, price: 120 },
        { sku: "C-300", qty: 5, price: 15 }
      ],
      tags: ["rush", "export", "insured"]
    })
  })
});
```

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Expecting `lines.0.sku` indexes | Use collection markers + expansion |
| Putting a footer inside the expanding row | Keep footers below the band |
| Forgetting sibling fields on the same row | Put `sku` / `qty` / `price` on one template row so they expand together |

## Next

- [Context master-detail](../m04-l02-context/)
