---
title: "表格樣式保留"
description: "把標記放進 Excel 表格，使條紋/樣式隨擴充套件增長。"
lesson_id: m06-l01
module: m06
weight: 10
level: intermediate
template_name: lesson_m06_table_style
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m06_table_style/template.png"
  result: "/previews/zh-TW/lesson_m06_table_style/result.png"
---

## 學習目標

- 在擴充套件標記外包一層 Excel 表格
- 表格內使用 G=normal（不支援 G=merge）
- 表頭樣式由表格主題保留

{{< lesson_demo template_name="lesson_m06_table_style" >}}

## 模板要點

`lesson_m06_table_style` 使用 TableStyleMedium2，標記為 `{{ds.lines.sku(G=normal)}}` / qty / amount。

## JSON 結構說明

```json
{
  "title": "Q3 lines",
  "lines": [
    {"sku": "A-100", "qty": 2, "amount": 80},
    {"sku": "B-200", "qty": 1, "amount": 120},
    {"sku": "C-300", "qty": 4, "amount": 60}
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
    template_name: "lesson_m06_table_style",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"title\": \"Q3 lines\", \"lines\": [ {\"sku\": \"A-100\", \"qty\": 2, \"amount\": 80}, {\"sku\": \"B-200\", \"qty\": 1, \"amount\": 120}, {\"sku\": \"C-300\", \"qty\": 4, \"amount\": 60} ] }"
  })
});
```

## 下一步

[圖表隨資料更新](../m06-l02-chart/)
