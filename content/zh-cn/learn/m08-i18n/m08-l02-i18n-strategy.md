---
title: "字段稳定、文案本地化策略"
description: "不要翻译 JSON 键；把给人看的文案放进各语言工作簿。"
lesson_id: m08-l02
module: m08
weight: 20
level: intermediate
template_name: lesson_m08_i18n_strategy
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m08_i18n_strategy/template.png"
  result: "/previews/zh-CN/lesson_m08_i18n_strategy/result.png"
---

## 学习目标

- 各语言保持相同的 camelCase 键
- 只翻译表内标签/页脚
- 避免把特定语言句子塞进 JSON

{{< lesson_demo template_name="lesson_m08_i18n_strategy" >}}

## 模板要点

演示表列出 `productName` / `unitPrice` / `currency`，提示列已本地化。

## JSON 结构说明

```json
{
  "productName": "Alpine Desk",
  "unitPrice": 249,
  "currency": "USD"
}
```

## API 调用示例

```javascript
const API = "http://127.0.0.1:5000";
await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m08_i18n_strategy",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"productName\": \"Alpine Desk\", \"unitPrice\": 249, \"currency\": \"USD\" }"
  })
});
```

## 下一步

模块 09 — [销售订单](../../m09-practical/)
