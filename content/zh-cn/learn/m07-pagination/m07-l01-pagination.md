---
title: "分页与页码"
description: "在分组主字段上插入分页，并用 Excel 页脚显示页码。"
lesson_id: m07-l01
module: m07
weight: 10
level: intermediate
template_name: lesson_m07_pagination
data_sources: ["ds"]
output_formats: ["excel", "pdf"]

previews:
  template: "/previews/zh-CN/lesson_m07_pagination/template.png"
  result: "/previews/zh-CN/lesson_m07_pagination/result.png"
---

## 学习目标

- 在主字段上设置 `pageBreak=true`
- 用 `C=` 嵌套明细行
- 页眉页脚使用 Page &P of &N

{{< lesson_demo template_name="lesson_m07_pagination" >}}

## 模板要点

主字段 `{{ds.depts.name(G=merge, pageBreak=true)}}`，明细带上下文。

## JSON 结构说明

```json
{
  "depts": [
    {"name": "Sales", "items": [{"name": "Laptop", "qty": 2}, {"name": "Mouse", "qty": 10}]},
    {"name": "Ops", "items": [{"name": "Toner", "qty": 5}]}
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
    template_name: "lesson_m07_pagination",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"depts\": [ {\"name\": \"Sales\", \"items\": [{\"name\": \"Laptop\", \"qty\": 2}, {\"name\": \"Mouse\", \"qty\": 10}]}, {\"name\": \"Ops\", \"items\": [{\"name\": \"Toner\", \"qty\": 5}]} ] }"
  })
});
```

## 下一步

[按组重复页眉](../m07-l02-repeat-group/)
