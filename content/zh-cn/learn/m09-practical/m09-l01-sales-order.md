---
title: "销售订单"
description: "表头 + 扩展明细，行合计用 Excel 公式。"
lesson_id: m09-l01
module: m09
weight: 10
level: advanced
template_name: lesson_m09_sales_order
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m09_sales_order/template.png"
  result: "/previews/zh-CN/lesson_m09_sales_order/result.png"
---

## 学习目标

- 绑定订单表头标量
- 扩展明细行
- 用 `=qty*price` 计算行合计

{{< lesson_demo template_name="lesson_m09_sales_order" >}}

## 模板要点

青绿表头的销售订单版式。

## JSON 结构说明

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

## API 调用示例

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

[费用报销单](../m09-l02-expense/)
