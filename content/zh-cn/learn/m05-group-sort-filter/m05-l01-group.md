---
title: "分组汇总"
description: "用 G=merge / G=repeat / G=list 让重复键合并或逐行重复，同时扩展明细列。"
lesson_id: m05-l01
module: m05
weight: 10
level: intermediate
template_name: lesson_m05_group
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m05_group/template.png"
  result: "/previews/zh-CN/lesson_m05_group/result.png"
---

## 学习目标

- 用 `G=merge`（默认）分组列表字段，使相同键共享单元格
- 对比 `G=repeat`：每行都重复打印分组键
- 金额/明细列保持普通扩展字段，放在分组键旁

{{< lesson_demo template_name="lesson_m05_group" >}}

## 模板要点

| 属性 | 效果 |
|------|------|
| `G=merge` | 连续相同分组值合并单元格（默认） |
| `G=repeat` | 每个明细行都重复分组值 |
| `G=list` | 以列表方式扩展 |
| `G=normal` | 普通模式，不合并 |

```text
{{ds.rows.region(G=merge)}}
{{ds.rows.sku}}
{{ds.rows.amount}}
```

## JSON 结构说明

```json
{
  "title": "Sales by region",
  "rows": [
    { "region": "West", "sku": "A", "qty": 2, "amount": 40 },
    { "region": "West", "sku": "B", "qty": 1, "amount": 120 },
    { "region": "East", "sku": "A", "qty": 5, "amount": 50 },
    { "region": "East", "sku": "C", "qty": 3, "amount": 90 }
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
    template_name: "lesson_m05_group",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      title: "Sales by region",
      rows: [
        { region: "West", sku: "A", qty: 2, amount: 40 },
        { region: "West", sku: "B", qty: 1, amount: 120 },
        { region: "East", sku: "A", qty: 5, amount: 50 },
        { region: "East", sku: "C", qty: 3, amount: 90 }
      ]
    })
  })
});
```

## 下一步

- [排序](../m05-l02-sort/)
