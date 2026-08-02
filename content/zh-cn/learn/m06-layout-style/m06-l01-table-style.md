---
title: "表格样式保留"
description: "把标记放进 Excel 表格，使条纹/样式随扩展增长。"
lesson_id: m06-l01
module: m06
weight: 10
level: intermediate
template_name: lesson_m06_table_style
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m06_table_style/template.png"
  result: "/previews/zh-CN/lesson_m06_table_style/result.png"
---

## 学习目标

- 在扩展标记外包一层 Excel 表格
- 表格内使用 G=normal（不支持 G=merge）
- 表头样式由表格主题保留

{{< lesson_demo template_name="lesson_m06_table_style" >}}

## 模板要点

`lesson_m06_table_style` 使用 TableStyleMedium2，标记为 `{{ds.lines.sku(G=normal)}}` / qty / amount。

## JSON 结构说明

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

## API 调用示例

```javascript
const API = "http://127.0.0.1:5000";
await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m06_table_style",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"title\": \"Q3 lines\", \"lines\": [ {\"sku\": \"A-100\", \"qty\": 2, \"amount\": 80}, {\"sku\": \"B-200\", \"qty\": 1, \"amount\": 120}, {\"sku\": \"C-300\", \"qty\": 4, \"amount\": 60} ] }"
  })
});
```

## 下一步

[图表随数据更新](../m06-l02-chart/)
