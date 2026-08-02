---
title: "費用報銷單"
description: "員工表頭 + 擴充套件費用明細。"
lesson_id: m09-l02
module: m09
weight: 20
level: advanced
template_name: lesson_m09_expense
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m09_expense/template.png"
  result: "/previews/zh-TW/lesson_m09_expense/result.png"
---

## 學習目標

- 繫結員工/期間
- 擴充套件日期/類別/備註/金額
- 金額保持數值以便合計

{{< lesson_demo template_name="lesson_m09_expense" >}}

## 模板要點

費用單使用暖琥珀色表頭。

## JSON 結構說明

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

## API 呼叫示例

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

[部門預算表](../m09-l03-dept-budget/)
