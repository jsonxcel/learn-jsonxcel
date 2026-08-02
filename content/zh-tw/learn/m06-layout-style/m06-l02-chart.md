---
title: "圖表隨資料更新"
description: "把圖表繫結到擴充套件的月份/銷售額單元格。"
lesson_id: m06-l02
module: m06
weight: 20
level: intermediate
template_name: lesson_m06_chart
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m06_chart/template.png"
  result: "/previews/zh-TW/lesson_m06_chart/result.png"
---

## 學習目標

- 在圖表下放置 `{{ds.points.month}}` / `{{ds.points.sales}}`
- 由擴充套件增加系列點
- 離散類別優先柱狀圖

{{< lesson_demo template_name="lesson_m06_chart" >}}

## 模板要點

柱狀圖錨定在 D4；系列來自 B 列。

## JSON 結構說明

```json
{
  "points": [
    {"month": "Jan", "sales": 120},
    {"month": "Feb", "sales": 150},
    {"month": "Mar", "sales": 90},
    {"month": "Apr", "sales": 180}
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
    template_name: "lesson_m06_chart",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"points\": [ {\"month\": \"Jan\", \"sales\": 120}, {\"month\": \"Feb\", \"sales\": 150}, {\"month\": \"Mar\", \"sales\": 90}, {\"month\": \"Apr\", \"sales\": 180} ] }"
  })
});
```

## 下一步

[條件格式](../m06-l03-conditional/)
