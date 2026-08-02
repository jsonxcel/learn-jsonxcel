---
title: "条件格式"
description: "在接收扩展值的单元格上保留 Excel 条件格式。"
lesson_id: m06-l03
module: m06
weight: 30
level: intermediate
template_name: lesson_m06_conditional
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m06_conditional/template.png"
  result: "/previews/zh-CN/lesson_m06_conditional/result.png"
---

## 学习目标

- 在模板金额列应用条件格式
- 扩展值进入规则区域
- 用阈值表示阈值（如 >100 绿、<50 红）

{{< lesson_demo template_name="lesson_m06_conditional" >}}

## 模板要点

`B5:B50` 上的规则在转换后仍作用于填充金额。

## JSON 结构说明

```json
{
  "lines": [
    {"sku": "A", "amount": 40},
    {"sku": "B", "amount": 120},
    {"sku": "C", "amount": 75}
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
    template_name: "lesson_m06_conditional",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"lines\": [ {\"sku\": \"A\", \"amount\": 40}, {\"sku\": \"B\", \"amount\": 120}, {\"sku\": \"C\", \"amount\": 75} ] }"
  })
});
```

## 下一步

[图片字段](../m06-l04-image/)
