---
title: "그룹별 머리글 반복"
description: "Keep a group title visible above each detail band using master-detail context."
lesson_id: m07-l02
module: m07
weight: 20
level: intermediate
template_name: lesson_m07_repeat_group
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ko-KR/lesson_m07_repeat_group/template.png"
  result: "/previews/ko-KR/lesson_m07_repeat_group/result.png"
---

> 이 페이지는 한국어 입구입니다. 상세 기술 설명은 당분간 영어/간체가 기준입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.


## Learning objectives

- Expand group names with G=merge
- Attach lines with C= to the group cell
- Design print layouts so each group reads as a section

{{< lesson_demo template_name="lesson_m07_repeat_group" >}}

## Template highlights

`{{ds.groups.name(G=merge)}}` + `{{ds.groups.lines.label(C=A7)}}`.

## JSON structure

```json
{
  "company": "Northwind",
  "groups": [
    {"name": "Hardware", "lines": [{"label": "SSD", "amount": 120}, {"label": "RAM", "amount": 80}]},
    {"name": "Services", "lines": [{"label": "Support", "amount": 200}]}
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
    template_name: "lesson_m07_repeat_group",
    language: "ko-KR",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"company\": \"Northwind\", \"groups\": [ {\"name\": \"Hardware\", \"lines\": [{\"label\": \"SSD\", \"amount\": 120}, {\"label\": \"RAM\", \"amount\": 80}]}, {\"name\": \"Services\", \"lines\": [{\"label\": \"Support\", \"amount\": 200}]} ] }"
  })
});
```

## Next

Module 08 — [i18n invoice](../../m08-i18n/)
