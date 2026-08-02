---
title: "정렬"
description: "Sort expanding fields with S=asc or S=desc on a template marker."
lesson_id: m05-l02
module: m05
weight: 20
level: intermediate
template_name: lesson_m05_sort
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ko-KR/lesson_m05_sort/template.png"
  result: "/previews/ko-KR/lesson_m05_sort/result.png"
---

> 이 페이지는 한국어 입구입니다. 상세 기술 설명은 당분간 영어/간체가 기준입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.


## Learning objectives

- Apply `S=asc` / `S=desc` on a collection field marker
- Keep sibling columns on the same expanding row so they travel with the sorted key
- Prefer sorting in the template when the API payload order is unstable

{{< lesson_demo template_name="lesson_m05_sort" >}}

## Template highlights

```text
{{ds.rows.amount(S=desc)}}
{{ds.rows.sku}}
{{ds.rows.region}}
```

Sort applies to instances that share the same parent context.

## JSON structure

```json
{
  "title": "Amount descending",
  "rows": [
    { "region": "West", "sku": "A", "amount": 40 },
    { "region": "West", "sku": "B", "amount": 120 },
    { "region": "East", "sku": "A", "amount": 50 },
    { "region": "East", "sku": "C", "amount": 90 }
  ]
}
```

## API call example

```javascript
const API = "http://127.0.0.1:5000";
await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m05_sort",
    language: "ko-KR",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      title: "Amount descending",
      rows: [
        { region: "West", sku: "A", amount: 40 },
        { region: "West", sku: "B", amount: 120 },
        { region: "East", sku: "A", amount: 50 },
        { region: "East", sku: "C", amount: 90 }
      ]
    })
  })
});
```

## Next

- [Filter operators](../m05-l03-filter/)
