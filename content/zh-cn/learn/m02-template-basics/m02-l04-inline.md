---
title: "内联文本中的标记"
description: "在句子中嵌入 {{字段}}，让一个单元格同时包含固定文案与绑定值。"
lesson_id: m02-l04
module: m02
weight: 40
level: beginner
template_name: lesson_m02_inline
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m02_inline/template.png"
  result: "/previews/zh-CN/lesson_m02_inline/result.png"
---

## 学习目标

- 编写内联标记，例如 `尊敬的 {{ds.contact}}，`（静态文案 + 一个标记）
- 混排文案时优先 **每格一个标记** — 同一格多个标记不可靠
- 尽量把标点与本地化文案留在 Excel，而不是塞进 JSON

{{< lesson_demo template_name="lesson_m02_inline" >}}

## 模板要点

`lesson_m02_inline` 演示 **内联** mustache：单元格同时包含叙述文字与标记。

示例：

```text
尊敬的 {{ds.contact}}，
感谢您的订单 {{ds.orderNo}}。
发往 {{ds.city}}
计划于 {{ds.shipDate}} 发出。
```

与整格标记（单元格里只有 `{{ds.contact}}`）对比：

| 风格 | 适用 |
|------|------|
| 整格 | 干净的数据列、数字、编码 |
| 内联（每格一个标记） | 句子、邮件式行、页脚说明 |

按需在 Excel 中设置自动换行 / 富文本。一句话需要两个值时，拆成多格或改用整格标记。

> 模板二进制由 P05 提供。以下 JSON 键为绑定契约。

## JSON 结构说明

```json
{
  "contact": "Ada Lovelace",
  "orderNo": "SO-10042",
  "city": "London",
  "shipDate": "2026-07-20"
}
```

| 字段 | 典型内联用途 |
|------|----------------|
| `contact` | 称呼 |
| `orderNo` | 句中的单号 |
| `city` | 目的地短语 |
| `shipDate` | 计划日期句（格式可在 Excel 中设置） |

## API 调用示例

```javascript
const API = "http://127.0.0.1:5000";

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m02_inline",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      contact: "Ada Lovelace",
      orderNo: "SO-10042",
      city: "London",
      shipDate: "2026-07-20"
    })
  })
});
```

## 常见错误

| 错误 | 修正 |
|------|------|
| 整句都放进 JSON | 固定文案留在 Excel；只绑定变量 |
| 括号不配对（`{{ name }` / `{{name}}}`） | 成对的 `{{` / `}}`；引擎严格时勿多空格 |
| 靠改 JSON 键做本地化 | 在 `Templates/{lang}/` 翻译句子；键名保持稳定 |
| 用内联标记做长表 | 改用列 + 扩展（模块 04） |

## 模块检查点

你已能绑定扁平字段、嵌套路径、公式输入与内联叙述。模块 03 聚焦数据源与 API 响应模式。

## 下一步

- 模块 03 — [单数据源 ds](../../m03-datasource-api/m03-l01-single-ds/)（后续批次）
