---
title: "표 스타일 유지"
description: "Put markers inside an Excel Table so banding/style grow with expansion."
lesson_id: m06-l01
module: m06
weight: 10
level: intermediate
template_name: lesson_m06_table_style
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ko-KR/lesson_m06_table_style/template.png"
  result: "/previews/ko-KR/lesson_m06_table_style/result.png"
---

> 이 페이지는 한국어 입구입니다. 상세 기술 설명은 당분간 영어/간체가 기준입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.


## Learning objectives

- Create an Excel Table around expanding markers
- Use G=normal because G=merge is unsupported in tables
- Keep header row styled by the table

{{< lesson_demo template_name="lesson_m06_table_style" >}}

## Template highlights

`lesson_m06_table_style` uses TableStyleMedium2 with `{{ds.lines.sku(G=normal)}}` / qty / amount.

## JSON structure

```json
{
  "title": "Q3 lines",
  "lines": [
    {"sku": "A-100", "qty": 2, "amount": 80},
    {"sku": "B-200", "qty": 1, "amount": 120},
    {"sku": "C-300", "qty": 4, "amount": 60}
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
    template_name: "lesson_m06_table_style",
    language: "ko-KR",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"title\": \"Q3 lines\", \"lines\": [ {\"sku\": \"A-100\", \"qty\": 2, \"amount\": 80}, {\"sku\": \"B-200\", \"qty\": 1, \"amount\": 120}, {\"sku\": \"C-300\", \"qty\": 4, \"amount\": 60} ] }"
  })
});
```

## Next

[Chart with data](../m06-l02-chart/)
