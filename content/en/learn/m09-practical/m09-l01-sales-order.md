---
title: "Sales order workbook"
description: "Header + expanding lines with Excel line totals."
lesson_id: m09-l01
module: m09
weight: 10
level: advanced
template_name: lesson_m09_sales_order
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/en-US/lesson_m09_sales_order/template.png"
  result: "/previews/en-US/lesson_m09_sales_order/result.png"
---

## Learning objectives

- Bind order header scalars
- Expand line items
- Compute line total with `=qty*price`

{{< lesson_demo template_name="lesson_m09_sales_order" >}}

## Template highlights

Professional SO layout with teal header band.

## JSON structure

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

## API call example

```javascript
const API = "http://127.0.0.1:5000";
await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m09_sales_order",
    language: "en-US",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"orderNo\": \"SO-9001\", \"customer\": \"Wide World Importers\", \"orderDate\": \"2026-07-16\", \"lines\": [ {\"sku\": \"A-100\", \"desc\": \"Desk\", \"qty\": 2, \"price\": 249}, {\"sku\": \"B-200\", \"desc\": \"Chair\", \"qty\": 4, \"price\": 99} ] }"
  })
});
```

## Next

[Expense report](../m09-l02-expense/)
