---
title: "发货单"
description: "收货表头 + 扩展包裹列表与运单号。"
lesson_id: m09-l04
module: m09
weight: 40
level: advanced
template_name: lesson_m09_shipping
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m09_shipping/template.png"
  result: "/previews/zh-CN/lesson_m09_shipping/result.png"
---

## 学习目标

- 绑定收货方/承运人/日期
- 扩展包裹
- 运单号保持文本

{{< lesson_demo template_name="lesson_m09_shipping" >}}

## 模板要点

橙色强调的发货单。

## JSON 结构说明

```json
{
  "shipTo": "Wide World Importers",
  "shipDate": "2026-07-18",
  "carrier": "Contoso Logistics",
  "packages": [
    {"id": "PKG-1", "weight": 12.5, "tracking": "1Z999AA10123456784"},
    {"id": "PKG-2", "weight": 8.0, "tracking": "1Z999AA10123456785"}
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
    template_name: "lesson_m09_shipping",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"shipTo\": \"Wide World Importers\", \"shipDate\": \"2026-07-18\", \"carrier\": \"Contoso Logistics\", \"packages\": [ {\"id\": \"PKG-1\", \"weight\": 12.5, \"tracking\": \"1Z999AA10123456784\"}, {\"id\": \"PKG-2\", \"weight\": 8.0, \"tracking\": \"1Z999AA10123456785\"} ] }"
  })
});
```

## 下一步

主语言课程完成 — 继续 P06 样例 JSON / P07 预览图 / P08 其余语言。
