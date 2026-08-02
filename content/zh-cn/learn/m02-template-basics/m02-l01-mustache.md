---
title: "Mustache 字段标记"
description: "用 {{field}} 把扁平 JSON 字段绑定到 Excel 单元格，再经 JsonXcel 转换。"
lesson_id: m02-l01
module: m02
weight: 10
level: beginner
template_name: lesson_m02_mustache
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m02_mustache/template.png"
  result: "/previews/zh-CN/lesson_m02_mustache/result.png"
---

## 学习目标

- 在工作簿单元格中放置与顶层 JSON 键一一对应的 `{{field}}` 标记
- 保留单元格上的 Excel 格式，由引擎替换标记文本
- 使用 `template_name: lesson_m02_mustache` 与扁平 `ds` 完成转换

{{< lesson_demo template_name="lesson_m02_mustache" >}}

## 模板要点

在 `lesson_m02_mustache`（由 P05 模板管道提供）中，当整格都要被替换时，单元格里 **只放标记**：

| 用途 | 标记示例 |
|------|----------|
| 客户名 | `{{customer}}` |
| 订单号 | `{{orderNo}}` |
| 合计 | `{{total}}` |

提示：

- 拼写必须一致 —— JSON 是 camelCase 时，`{{OrderNo}}` ≠ `{{orderNo}}`。
- 数字 / 日期格式在 Excel 单元格上设置；JSON 传原始值。
- 静态标签放在相邻单元格（不要加大括号）。

> 模板二进制由构建 / P05 管道产出。在此之前，以下方 JSON 契约为准。

## JSON 结构说明

```json
{
  "customer": "Northwind Traders",
  "orderNo": "SO-10042",
  "total": 1280.5,
  "currency": "USD"
}
```

| 字段 | 绑定标记 |
|------|----------|
| `customer` | `{{customer}}` |
| `orderNo` | `{{orderNo}}` |
| `total` | `{{total}}` |
| `currency` | `{{currency}}` |

本课只用扁平对象。嵌套路径见 **m02-l02**。

## API 调用示例

```javascript
const API = "http://127.0.0.1:5000";

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m02_mustache",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      customer: "Northwind Traders",
      orderNo: "SO-10042",
      total: 1280.5,
      currency: "USD"
    })
  })
});
```

## 常见错误

| 错误 | 修正 |
|------|------|
| `{{ }}` 内多空格或拼写错误 | 从 JSON 契约复制键名 |
| 单元格写成 `"{{name}}"` | 只放标记；显示类型交给 Excel |
| 本课就传嵌套对象 | 先扁平化，或进入 m02-l02 |
| 请求体里 `ds` 是对象 | 使用 `JSON.stringify` |

## 下一步

- [嵌套对象与数组下标](../m02-l02-nested-path/)
