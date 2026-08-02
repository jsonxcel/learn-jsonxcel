---
title: "部門預算表"
description: "預算 vs 實際，差異用 Excel 公式。"
lesson_id: m09-l03
module: m09
weight: 30
level: advanced
template_name: lesson_m09_dept_budget
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m09_dept_budget/template.png"
  result: "/previews/zh-TW/lesson_m09_dept_budget/result.png"
---

## 學習目標

- 擴充套件科目行
- 繫結預算/實際
- 差異用 Excel `=budget-actual`

{{< lesson_demo template_name="lesson_m09_dept_budget" >}}

## 模板要點

紫色表頭；D 列為差異公式。

## JSON 結構說明

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

## API 呼叫示例

```javascript
const API = "http://127.0.0.1:5000";
await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m09_dept_budget",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"dept\": \"Engineering\", \"accounts\": [ {\"name\": \"Salaries\", \"budget\": 120000, \"actual\": 118500}, {\"name\": \"Cloud\", \"budget\": 20000, \"actual\": 24500}, {\"name\": \"Travel\", \"budget\": 8000, \"actual\": 6100} ] }"
  })
});
```

## 下一步

[發貨單](../m09-l04-shipping/)
