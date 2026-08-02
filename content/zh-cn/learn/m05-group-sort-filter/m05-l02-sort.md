---
title: "排序"
description: "在模板标记上使用 S=asc 或 S=desc 对扩展字段排序。"
lesson_id: m05-l02
module: m05
weight: 20
level: intermediate
template_name: lesson_m05_sort
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m05_sort/template.png"
  result: "/previews/zh-CN/lesson_m05_sort/result.png"
---

## 学习目标

- 在集合字段标记上应用 `S=asc` / `S=desc`
- 兄弟列放在同一扩展行，随排序键一起移动
- 当 API 载荷顺序不稳定时，优先在模板中排序

{{< lesson_demo template_name="lesson_m05_sort" >}}

## 模板要点

```text
{{ds.rows.amount(S=desc)}}
{{ds.rows.sku}}
{{ds.rows.region}}
```

排序作用于共享同一父上下文的实例。

## JSON 结构说明

```json
{
  "title": "Amount descending",
  "rows": [
    { "region": "West", "sku": "A", "amount": 40 },
    { "region": "West", "sku": "B", "amount": 120 },
    { "region": "East", "sku": "A", "amount": 50 },
    { "region": "East", "sku": "C", "amount": 90 }
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
    template_name: "lesson_m05_sort",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      title: "Amount descending",
      rows: [
        { region: "West", sku: "A", amount: 40 },
        { region: "West", sku: "B", amount: 120 },
        { region: "East", sku: "A", amount: 50 },
        { region: "East", sku: "C", amount: 90 }
      ]
    })
  })
});
```

## 下一步

- [过滤操作符](../m05-l03-filter/)
