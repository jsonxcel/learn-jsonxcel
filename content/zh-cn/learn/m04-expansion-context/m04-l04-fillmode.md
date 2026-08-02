---
title: "填充模式（overflow / overwrite）"
description: "选择 FM=Insert 与 FM=Overwrite，并在固定版式中使用 FR= 填充范围。"
lesson_id: m04-l04
module: m04
weight: 40
level: intermediate
template_name: lesson_m04_fillmode
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m04_fillmode/template.png"
  result: "/previews/zh-CN/lesson_m04_fillmode/result.png"
---

## 学习目标

- 使用默认插入模式（`FM=Insert`）让扩展添加行
- 对不应插行的固定版式改用 `FM=Overwrite`
- 理解 overwrite 数据可能溢出时的 `FR=`（填充范围）

{{< lesson_demo template_name="lesson_m04_fillmode" >}}

## 模板要点

| 模式 | 行为 |
|------|------|
| `FM=Insert`（默认） | 先插入行/列，再写入值与样式 |
| `FM=Overwrite` | 写入已有单元格；适合固定网格 |
| `FR=A8:C12` | overwrite 时可能被复制扩展的矩形 |

```text
{{ds.lines.sku(FM=Overwrite, FR=A8:C12)}}
{{ds.lines.qty(FM=Overwrite, FR=A8:C12)}}
```

使用 overwrite 且不做溢出复制时，请在模板中预留足够空行。

## JSON 结构说明

```json
{
  "title": "Fixed grid lines",
  "lines": [
    { "sku": "A-100", "qty": 2 },
    { "sku": "B-200", "qty": 1 },
    { "sku": "C-300", "qty": 4 },
    { "sku": "D-400", "qty": 3 }
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
    template_name: "lesson_m04_fillmode",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      title: "Fixed grid lines",
      lines: [
        { sku: "A-100", qty: 2 },
        { sku: "B-200", qty: 1 },
        { sku: "C-300", qty: 4 },
        { sku: "D-400", qty: 3 }
      ]
    })
  })
});
```

## 常见错误

| 错误 | 修正 |
|------|------|
| overwrite 却没有空行 | 预先加大网格，或使用 `FR=` 溢出行为 |
| 同一扩展带混用 insert / overwrite | 每个扩展组保持一种填充模式 |

## 下一步

- 模块 05 — 分组、排序与过滤（发布后）
