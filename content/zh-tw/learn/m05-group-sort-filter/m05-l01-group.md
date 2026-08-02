---
title: "分組彙總"
description: "用 G=merge / G=repeat / G=list 讓重複鍵合併或逐行重複，同時擴充套件明細列。"
lesson_id: m05-l01
module: m05
weight: 10
level: intermediate
template_name: lesson_m05_group
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m05_group/template.png"
  result: "/previews/zh-TW/lesson_m05_group/result.png"
---

## 學習目標

- 用 `G=merge`（預設）分組列表欄位，使相同鍵共享單元格
- 對比 `G=repeat`：每行都重複列印分組鍵
- 金額/明細列保持普通擴充套件欄位，放在分組鍵旁

{{< lesson_demo template_name="lesson_m05_group" >}}

## 模板要點

| 屬性 | 效果 |
|------|------|
| `G=merge` | 連續相同分組值合併單元格（預設） |
| `G=repeat` | 每個明細行都重複分組值 |
| `G=list` | 以列表方式擴充套件 |
| `G=normal` | 普通模式，不合並 |

```text
{{ds.rows.region(G=merge)}}
{{ds.rows.sku}}
{{ds.rows.amount}}
```

## JSON 結構說明

```json
{
  "title": "Sales by region",
  "rows": [
    { "region": "West", "sku": "A", "qty": 2, "amount": 40 },
    { "region": "West", "sku": "B", "qty": 1, "amount": 120 },
    { "region": "East", "sku": "A", "qty": 5, "amount": 50 },
    { "region": "East", "sku": "C", "qty": 3, "amount": 90 }
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
    template_name: "lesson_m05_group",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      title: "Sales by region",
      rows: [
        { region: "West", sku: "A", qty: 2, amount: 40 },
        { region: "West", sku: "B", qty: 1, amount: 120 },
        { region: "East", sku: "A", qty: 5, amount: 50 },
        { region: "East", sku: "C", qty: 3, amount: 90 }
      ]
    })
  })
});
```

## 下一步

- [排序](../m05-l02-sort/)
