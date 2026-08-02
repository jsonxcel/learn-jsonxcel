---
title: "部门预算表"
description: "预算 vs 实际，差异用 Excel 公式。"
lesson_id: m09-l03
module: m09
weight: 30
level: advanced
template_name: lesson_m09_dept_budget
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m09_dept_budget/template.png"
  result: "/previews/zh-CN/lesson_m09_dept_budget/result.png"
---

## 学习目标

- 扩展科目行
- 绑定预算/实际
- 差异用 Excel `=budget-actual`

{{< lesson_demo template_name="lesson_m09_dept_budget" >}}

## 模板要点

紫色表头；D 列为差异公式。

## JSON 结构说明

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

## API 调用示例

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

[发货单](../m09-l04-shipping/)
