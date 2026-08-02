---
title: "单数据源 ds"
description: "把 ds 当作大多数模板的主 JSON 字符串 —— 一份载荷、一个绑定根。"
lesson_id: m03-l01
module: m03
weight: 10
level: beginner
template_name: lesson_m03_single_ds
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m03_single_ds/template.png"
  result: "/previews/zh-CN/lesson_m03_single_ds/result.png"
---

## 学习目标

- 仅通过 `ds` 字段发送一份业务载荷
- 保持 `ds` 为 HTTP JSON 体中的 **JSON 字符串**
- 将工作簿标记映射到该单一对象（或模板期望的数组根）

{{< lesson_demo template_name="lesson_m03_single_ds" >}}

## 模板要点

`lesson_m03_single_ds` 是多数课程的默认形态：每个 `{{…}}` 路径都相对于你写入 `ds` 的对象。

| 请求字段 | 作用 |
|----------|------|
| `ds` | 主数据源（本课必需） |
| `ds01`、`ds02`… | 本课不用 —— 见 m03-l02 |

优先用一份连贯的文档模型（表头 + 嵌套集合），不要过早拆分。只有当区域确实来自不同系统时再增加数据源。

> 模板二进制：P05。以下 JSON 契约供后续冒烟测试绑定。

## JSON 结构说明

```json
{
  "reportTitle": "Weekly inventory",
  "warehouse": "WH-East",
  "asOf": "2026-07-16",
  "lines": [
    { "sku": "A-100", "onHand": 40 },
    { "sku": "B-200", "onHand": 12 }
  ]
}
```

标记使用 `{{ds.reportTitle}}`、`{{ds.warehouse}}`，以及 `{{ds.lines.sku}}` 一类集合扩展。本课重点是把整份文档放进 `ds`。

## API 调用示例

```javascript
const API = "http://127.0.0.1:5000";

const document = {
  reportTitle: "Weekly inventory",
  warehouse: "WH-East",
  asOf: "2026-07-16",
  lines: [
    { sku: "A-100", onHand: 40 },
    { sku: "B-200", onHand: 12 }
  ]
};

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m03_single_ds",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify(document)
  })
});
```

## 常见错误

| 错误 | 修正 |
|------|------|
| 漏传 `ds` | 始终包含主数据源字符串 |
| `ds` 传对象 | 先 `JSON.stringify` |
| 把一半字段放进 query/header | 绑定数据一律放在 `ds*` |
| 过早拆到 `ds01` | 区域未分叉前保持单一数据源 |

## 下一步

- [多数据源 ds + ds01](../m03-l02-multi-ds/)
