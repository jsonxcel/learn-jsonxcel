---
title: "컨텍스트(마스터-디테일)"
description: "Keep detail rows aligned to a master field using the C= context property."
lesson_id: m04-l02
module: m04
weight: 20
level: intermediate
template_name: lesson_m04_context
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ko-KR/lesson_m04_context/template.png"
  result: "/previews/ko-KR/lesson_m04_context/result.png"
---

> 이 페이지는 한국어 입구입니다. 상세 기술 설명은 당분간 영어/간체가 기준입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.


## Learning objectives

- Expand a master list (for example departments) and nest detail lines under each master
- Point detail markers at the master cell with `C=` (context)
- Keep JSON shaped as master objects that each contain a detail array

{{< lesson_demo template_name="lesson_m04_context" >}}

## Template highlights

`lesson_m04_context` is a small department → employee report:

| Cell idea | Marker |
|-----------|--------|
| Department name | `{{ds.depts.name}}` |
| Employee under that dept | `{{ds.depts.people.name(C=A5)}}` (example — context cell is the master) |
| Employee title | `{{ds.depts.people.title(C=A5)}}` |

`C=` names the cell that owns the current master instance. When the master expands, each detail band evaluates against that instance.

Exact cell addresses in your workbook must match the `C=` argument you type in the marker.

## JSON structure

```json
{
  "company": "Northwind",
  "depts": [
    {
      "name": "Sales",
      "people": [
        { "name": "Ada", "title": "AE" },
        { "name": "Grace", "title": "SE" }
      ]
    },
    {
      "name": "Ops",
      "people": [
        { "name": "Lin", "title": "Lead" }
      ]
    }
  ]
}
```

| Path | Role |
|------|------|
| `company` | Scalar header |
| `depts[]` | Master expansion |
| `depts[].people[]` | Detail expansion in master context |

## API call example

```javascript
const API = "http://127.0.0.1:5000";

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m04_context",
    language: "ko-KR",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      company: "Northwind",
      depts: [
        {
          name: "Sales",
          people: [
            { name: "Ada", title: "AE" },
            { name: "Grace", title: "SE" }
          ]
        },
        {
          name: "Ops",
          people: [{ name: "Lin", title: "Lead" }]
        }
      ]
    })
  })
});
```

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Detail markers without `C=` | Set context to the master cell |
| Wrong cell address in `C=` | Match the actual master marker cell |
| Flat list with no nesting | Nest `people` under each `depts` object |

## Next

- [Range and default values](../m04-l03-range-default/)
