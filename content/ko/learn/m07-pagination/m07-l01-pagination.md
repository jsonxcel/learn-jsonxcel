---
title: "페이지 나누기와 쪽번호"
description: "Insert page breaks on group masters and show Excel footer page numbers."
lesson_id: m07-l01
module: m07
weight: 10
level: intermediate
template_name: lesson_m07_pagination
data_sources: ["ds"]
output_formats: ["excel", "pdf"]

previews:
  template: "/previews/ko-KR/lesson_m07_pagination/template.png"
  result: "/previews/ko-KR/lesson_m07_pagination/result.png"
---

> 이 페이지는 한국어 입구입니다. 상세 기술 설명은 당분간 영어/간체가 기준입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.


## Learning objectives

- Set `pageBreak=true` on a master field
- Nest detail rows with `C=`
- Use header/footer for Page &P of &N

{{< lesson_demo template_name="lesson_m07_pagination" >}}

## Template highlights

Master `{{ds.depts.name(G=merge, pageBreak=true)}}` with detail context.

## JSON structure

```json
{
  "depts": [
    {"name": "Sales", "items": [{"name": "Laptop", "qty": 2}, {"name": "Mouse", "qty": 10}]},
    {"name": "Ops", "items": [{"name": "Toner", "qty": 5}]}
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
    template_name: "lesson_m07_pagination",
    language: "ko-KR",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"depts\": [ {\"name\": \"Sales\", \"items\": [{\"name\": \"Laptop\", \"qty\": 2}, {\"name\": \"Mouse\", \"qty\": 10}]}, {\"name\": \"Ops\", \"items\": [{\"name\": \"Toner\", \"qty\": 5}]} ] }"
  })
});
```

## Next

[Repeat group header](../m07-l02-repeat-group/)
