---
title: "同一 template_name，多语言目录"
description: "在 Templates/{lang}/ 下放本地化 xlsx，标记键保持一致。"
lesson_id: m08-l01
module: m08
weight: 10
level: intermediate
template_name: lesson_m08_i18n_invoice
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m08_i18n_invoice/template.png"
  result: "/previews/zh-CN/lesson_m08_i18n_invoice/result.png"
---

## 学习目标

- 每种语言复用 `lesson_m08_i18n_invoice`
- 只本地化标签；ds 字段名保持稳定
- convert 时传 `language` 选择目录

{{< lesson_demo template_name="lesson_m08_i18n_invoice" >}}

## 模板要点

主路径先交付 en-US + zh-CN；zh-TW/ja-JP/ko-KR 在 P08 用同名文件补齐。

## JSON 结构说明

```json
{
  "customer": "Contoso Ltd",
  "invoiceNo": "INV-1001",
  "invoiceDate": "2026-07-16",
  "lines": [
    {"sku": "A-100", "qty": 2, "price": 40},
    {"sku": "B-200", "qty": 1, "price": 120}
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
    template_name: "lesson_m08_i18n_invoice",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"customer\": \"Contoso Ltd\", \"invoiceNo\": \"INV-1001\", \"invoiceDate\": \"2026-07-16\", \"lines\": [ {\"sku\": \"A-100\", \"qty\": 2, \"price\": 40}, {\"sku\": \"B-200\", \"qty\": 1, \"price\": 120} ] }"
  })
});
```

## 下一步

[本地化策略](../m08-l02-i18n-strategy/)
