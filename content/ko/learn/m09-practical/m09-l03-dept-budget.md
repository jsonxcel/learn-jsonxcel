---
title: "부서 예산표"
description: "Budget vs actual with Excel variance formula."
lesson_id: m09-l03
module: m09
weight: 30
level: advanced
template_name: lesson_m09_dept_budget
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ko-KR/lesson_m09_dept_budget/template.png"
  result: "/previews/ko-KR/lesson_m09_dept_budget/result.png"
---

> 이 페이지는 한국어 입구입니다. 상세 기술 설명은 당분간 영어/간체가 기준입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.


## Learning objectives

- Expand account rows
- Bind budget/actual
- Variance `=budget-actual` in Excel

{{< lesson_demo template_name="lesson_m09_dept_budget" >}}

## Template highlights

Purple header band; variance formula in column D.

## JSON structure

```json
{
  "dept": "Engineering",
  "accounts": [
    {"name": "Salaries", "budget": 120000, "actual": 118500},
    {"name": "Cloud", "budget": 20000, "actual": 24500},
    {"name": "Travel", "budget": 8000, "actual": 6100}
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
    template_name: "lesson_m09_dept_budget",
    language: "ko-KR",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"dept\": \"Engineering\", \"accounts\": [ {\"name\": \"Salaries\", \"budget\": 120000, \"actual\": 118500}, {\"name\": \"Cloud\", \"budget\": 20000, \"actual\": 24500}, {\"name\": \"Travel\", \"budget\": 8000, \"actual\": 6100} ] }"
  })
});
```

## Next

[Shipping notice](../m09-l04-shipping/)
