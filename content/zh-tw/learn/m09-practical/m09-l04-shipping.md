---
title: "發貨單"
description: "收貨表頭 + 擴充套件包裹列表與運單號。"
lesson_id: m09-l04
module: m09
weight: 40
level: advanced
template_name: lesson_m09_shipping
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m09_shipping/template.png"
  result: "/previews/zh-TW/lesson_m09_shipping/result.png"
---

## 學習目標

- 繫結收貨方/承運人/日期
- 擴充套件包裹
- 運單號保持文字

{{< lesson_demo template_name="lesson_m09_shipping" >}}

## 模板要點

橙色強調的發貨單。

## JSON 結構說明

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

## API 呼叫示例

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

主語言課程完成 — 繼續 P06 樣例 JSON / P07 預覽圖 / P08 其餘語言。
