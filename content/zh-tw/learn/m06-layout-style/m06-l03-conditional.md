---
title: "條件格式"
description: "在接收擴充套件值的單元格上保留 Excel 條件格式。"
lesson_id: m06-l03
module: m06
weight: 30
level: intermediate
template_name: lesson_m06_conditional
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m06_conditional/template.png"
  result: "/previews/zh-TW/lesson_m06_conditional/result.png"
---

## 學習目標

- 在模板金額列應用條件格式
- 擴充套件值進入規則區域
- 用閾值表示閾值（如 >100 綠、<50 紅）

{{< lesson_demo template_name="lesson_m06_conditional" >}}

## 模板要點

`B5:B50` 上的規則在轉換後仍作用於填充金額。

## JSON 結構說明

```json
{
  "lines": [
    {"sku": "A", "amount": 40},
    {"sku": "B", "amount": 120},
    {"sku": "C", "amount": 75}
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
    template_name: "lesson_m06_conditional",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"lines\": [ {\"sku\": \"A\", \"amount\": 40}, {\"sku\": \"B\", \"amount\": 120}, {\"sku\": \"C\", \"amount\": 75} ] }"
  })
});
```

## 下一步

[圖片欄位](../m06-l04-image/)
