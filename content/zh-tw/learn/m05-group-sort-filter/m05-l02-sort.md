---
title: "排序"
description: "在模板標記上使用 S=asc 或 S=desc 對擴充套件欄位排序。"
lesson_id: m05-l02
module: m05
weight: 20
level: intermediate
template_name: lesson_m05_sort
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m05_sort/template.png"
  result: "/previews/zh-TW/lesson_m05_sort/result.png"
---

## 學習目標

- 在集合欄位標記上應用 `S=asc` / `S=desc`
- 兄弟列放在同一擴充套件行，隨排序鍵一起移動
- 當 API 載荷順序不穩定時，優先在模板中排序

{{< lesson_demo template_name="lesson_m05_sort" >}}

## 模板要點

```text
{{ds.rows.amount(S=desc)}}
{{ds.rows.sku}}
{{ds.rows.region}}
```

排序作用於共享同一父上下文的例項。

## JSON 結構說明

```json
{
  "title": "Amount descending",
  "rows": [
    { "region": "West", "sku": "A", "amount": 40 },
    { "region": "West", "sku": "B", "amount": 120 },
    { "region": "East", "sku": "A", "amount": 50 },
    { "region": "East", "sku": "C", "amount": 90 }
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
    template_name: "lesson_m05_sort",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      title: "Amount descending",
      rows: [
        { region: "West", sku: "A", amount: 40 },
        { region: "West", sku: "B", amount: 120 },
        { region: "East", sku: "A", amount: 50 },
        { region: "East", sku: "C", amount: 90 }
      ]
    })
  })
});
```

## 下一步

- [過濾運算子](../m05-l03-filter/)
