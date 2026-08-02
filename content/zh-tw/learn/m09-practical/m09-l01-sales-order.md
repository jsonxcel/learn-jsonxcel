---
title: "銷售訂單"
description: "表頭 + 擴充套件明細，行合計用 Excel 公式。"
lesson_id: m09-l01
module: m09
weight: 10
level: advanced
template_name: lesson_m09_sales_order
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m09_sales_order/template.png"
  result: "/previews/zh-TW/lesson_m09_sales_order/result.png"
---

## 學習目標

- 繫結訂單表頭標量
- 擴充套件明細行
- 用 `=qty*price` 計算行合計

{{< lesson_demo template_name="lesson_m09_sales_order" >}}

## 模板要點

青綠表頭的銷售訂單版式。

## JSON 結構說明

```json
{
  "orderNo": "SO-9001",
  "customer": "Wide World Importers",
  "orderDate": "2026-07-16",
  "lines": [
    {"sku": "A-100", "desc": "Desk", "qty": 2, "price": 249},
    {"sku": "B-200", "desc": "Chair", "qty": 4, "price": 99}
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
    template_name: "lesson_m09_sales_order",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"orderNo\": \"SO-9001\", \"customer\": \"Wide World Importers\", \"orderDate\": \"2026-07-16\", \"lines\": [ {\"sku\": \"A-100\", \"desc\": \"Desk\", \"qty\": 2, \"price\": 249}, {\"sku\": \"B-200\", \"desc\": \"Chair\", \"qty\": 4, \"price\": 99} ] }"
  })
});
```

## 下一步

[費用報銷單](../m09-l02-expense/)
