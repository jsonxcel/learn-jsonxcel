---
title: "데이터 연동 차트"
description: "Bind a chart to expanding month/sales cells."
lesson_id: m06-l02
module: m06
weight: 20
level: intermediate
template_name: lesson_m06_chart
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ko-KR/lesson_m06_chart/template.png"
  result: "/previews/ko-KR/lesson_m06_chart/result.png"
---

> 이 페이지는 한국어 입구입니다. 상세 기술 설명은 당분간 영어/간체가 기준입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.


## Learning objectives

- Place `{{ds.points.month}}` / `{{ds.points.sales}}` under a chart
- Let expansion add series points
- Prefer column/bar charts for discrete categories

{{< lesson_demo template_name="lesson_m06_chart" >}}

## Template highlights

Bar chart anchored at D4; series from column B.

## JSON structure

```json
{
  "points": [
    {"month": "Jan", "sales": 120},
    {"month": "Feb", "sales": 150},
    {"month": "Mar", "sales": 90},
    {"month": "Apr", "sales": 180}
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
    template_name: "lesson_m06_chart",
    language: "ko-KR",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"points\": [ {\"month\": \"Jan\", \"sales\": 120}, {\"month\": \"Feb\", \"sales\": 150}, {\"month\": \"Mar\", \"sales\": 90}, {\"month\": \"Apr\", \"sales\": 180} ] }"
  })
});
```

## Next

[Conditional formatting](../m06-l03-conditional/)
