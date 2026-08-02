---
title: "경비 정산서"
description: "Employee header plus expanding expense lines."
lesson_id: m09-l02
module: m09
weight: 20
level: advanced
template_name: lesson_m09_expense
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ko-KR/lesson_m09_expense/template.png"
  result: "/previews/ko-KR/lesson_m09_expense/result.png"
---

> 이 페이지는 한국어 입구입니다. 상세 기술 설명은 당분간 영어/간체가 기준입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.


## Learning objectives

- Bind employee/period
- Expand date/category/memo/amount
- Keep amounts numeric for Excel totaling

{{< lesson_demo template_name="lesson_m09_expense" >}}

## Template highlights

Warm amber header styling for expense forms.

## JSON structure

```json
{
  "employee": "Ada Lovelace",
  "period": "2026-07",
  "items": [
    {"date": "2026-07-02", "category": "Travel", "memo": "Taxi", "amount": 36.5},
    {"date": "2026-07-03", "category": "Meals", "memo": "Client lunch", "amount": 58}
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
    template_name: "lesson_m09_expense",
    language: "ko-KR",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"employee\": \"Ada Lovelace\", \"period\": \"2026-07\", \"items\": [ {\"date\": \"2026-07-02\", \"category\": \"Travel\", \"memo\": \"Taxi\", \"amount\": 36.5}, {\"date\": \"2026-07-03\", \"category\": \"Meals\", \"memo\": \"Client lunch\", \"amount\": 58} ] }"
  })
});
```

## Next

[Department budget](../m09-l03-dept-budget/)
