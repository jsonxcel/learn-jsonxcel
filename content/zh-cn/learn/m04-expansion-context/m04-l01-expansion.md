---
title: "单元格扩展（列表展开）"
description: "用 E=V / E=H 模板属性控制数组字段的垂直或水平扩展。"
lesson_id: m04-l01
module: m04
weight: 10
level: intermediate
template_name: lesson_m04_expansion
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m04_expansion/template.png"
  result: "/previews/zh-CN/lesson_m04_expansion/result.png"
---

## 学习目标

- 在模板行放置 `{{ds.lines.sku}}` 一类集合标记，使引擎按元素插入行
- 用 `E=V`（垂直，默认）或 `E=H`（水平）设置扩展方向
- 把非列表字段放在扩展带之外，表头保持不动

{{< lesson_demo template_name="lesson_m04_expansion" >}}

## 模板要点

`lesson_m04_expansion` 演示随 `lines` 数组增长的产品列表：

| 标记 | 作用 |
|------|------|
| `{{ds.orderNo}}` | 标量表头 — 不扩展 |
| `{{ds.lines.sku}}` | 集合字段 — 随数组扩展 |
| `{{ds.lines.qty(E=V)}}` | 显式垂直扩展（与默认相同） |
| `{{ds.tags(E=H)}}` | 水平跨列扩展 |

语法提示（标记内的引擎模板属性）：

```text
{{ds.lines.sku}}
{{ds.lines.qty(E=V)}}
{{ds.tags(E=H)}}
```

需要单值时用 `E=N` 关闭该标记的扩展。

## JSON 结构说明

```json
{
  "orderNo": "SO-20001",
  "customer": "Contoso Ltd",
  "lines": [
    { "sku": "A-100", "qty": 2, "price": 40 },
    { "sku": "B-200", "qty": 1, "price": 120 },
    { "sku": "C-300", "qty": 5, "price": 15 }
  ],
  "tags": ["rush", "export", "insured"]
}
```

| 字段 | 绑定 |
|------|------|
| `orderNo`, `customer` | 标量单元格 |
| `lines[]` | 垂直扩展带 |
| `tags[]` | 水平扩展示例 |

## API 调用示例

```javascript
const API = "http://127.0.0.1:5000";

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m04_expansion",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      orderNo: "SO-20001",
      customer: "Contoso Ltd",
      lines: [
        { sku: "A-100", qty: 2, price: 40 },
        { sku: "B-200", qty: 1, price: 120 },
        { sku: "C-300", qty: 5, price: 15 }
      ],
      tags: ["rush", "export", "insured"]
    })
  })
});
```

## 常见错误

| 错误 | 修正 |
|------|------|
| 期待 `lines.0.sku` 下标 | 改用集合标记 + 扩展 |
| 把页脚放进扩展行 | 页脚放在扩展带下方 |
| 同一行漏掉兄弟字段 | `sku` / `qty` / `price` 放在同一模板行一起扩展 |

## 下一步

- [上下文（主从）](../m04-l02-context/)
