---
title: "範圍與預設值"
description: "用 R= 設定後備上下文區域，用 DV= 處理空欄位預設值。"
lesson_id: m04-l03
module: m04
weight: 30
level: intermediate
template_name: lesson_m04_range_default
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m04_range_default/template.png"
  result: "/previews/zh-TW/lesson_m04_range_default/result.png"
---

## 學習目標

- 使用 `R=` 讓矩形區域內的欄位共享後備上下文
- 在 JSON 為 null / 缺失時用 `DV=` / `defaultValue=` 顯示後備值
- 在稀疏主從表中組合範圍與預設值

{{< lesson_demo template_name="lesson_m04_range_default" >}}

## 模板要點

| 屬性 | 含義 |
|------|------|
| `R=B3:F10` | 該區域內未寫 `C=` 的欄位，以定義範圍的單元格為上下文 |
| `DV=-` 或 `defaultValue=0` | 繫結值為空時顯示 |

標記示例：

```text
{{ds.regions.name(R=A6:C20)}}
{{ds.regions.revenue(DV=0)}}
{{ds.regions.note(DV="-")}}
```

## JSON 結構說明

```json
{
  "report": "Regional revenue",
  "regions": [
    { "name": "West", "revenue": 12000, "note": "On plan" },
    { "name": "East", "revenue": null, "note": null },
    { "name": "APAC", "revenue": 8000, "note": "" }
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
    template_name: "lesson_m04_range_default",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      report: "Regional revenue",
      regions: [
        { name: "West", revenue: 12000, note: "On plan" },
        { name: "East", revenue: null, note: null },
        { name: "APAC", revenue: 8000, note: "" }
      ]
    })
  })
});
```

## 常見錯誤

| 錯誤 | 修正 |
|------|------|
| 期望公式單元格也有 `DV` | 預設值作用於資料欄位，不是 Excel 公式 |
| 範圍未覆蓋明細標記 | 擴大 `R=` 以包含所有依賴單元格 |

## 下一步

- [填充模式（overflow / overwrite）](../m04-l04-fillmode/)
