---
title: "费用报销单"
description: "员工表头 + 扩展费用明细。"
lesson_id: m09-l02
module: m09
weight: 20
level: advanced
template_name: lesson_m09_expense
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m09_expense/template.png"
  result: "/previews/zh-CN/lesson_m09_expense/result.png"
---

## 学习目标

- 绑定员工/期间
- 扩展日期/类别/备注/金额
- 金额保持数值以便合计

{{< lesson_demo template_name="lesson_m09_expense" >}}

## 模板要点

费用单使用暖琥珀色表头。

## JSON 结构说明

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

## API 调用示例

```javascript
const API = "http://127.0.0.1:5000";
await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m09_expense",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"employee\": \"Ada Lovelace\", \"period\": \"2026-07\", \"items\": [ {\"date\": \"2026-07-02\", \"category\": \"Travel\", \"memo\": \"Taxi\", \"amount\": 36.5}, {\"date\": \"2026-07-03\", \"category\": \"Meals\", \"memo\": \"Client lunch\", \"amount\": 58} ] }"
  })
});
```

## 下一步

[部门预算表](../m09-l03-dept-budget/)
