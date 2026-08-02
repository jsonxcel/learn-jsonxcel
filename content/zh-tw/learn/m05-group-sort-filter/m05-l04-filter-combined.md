---
title: "組合過濾條件"
description: "F= 中的 AND / OR / NOT — 在表資料來源支援前，JSON ds 路徑不可用。"
lesson_id: m05-l04
module: m05
weight: 40
level: intermediate
template_name: lesson_m05_filter_combined
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m05_filter_combined/template.png"
  result: "/previews/zh-TW/lesson_m05_filter_combined/result.png"
---

## 學習目標

- 用 `AND` / `OR` / `NOT` 組合過濾條件
- 與 m05-l03 相同的 JSON 限制 — 目前在應用程式碼中組合條件

{{< lesson_demo template_name="lesson_m05_filter_combined" >}}

## 語法（需要表資料來源）

```text
{{ds.rows.sku(F=(ds.rows.amount > 50 and ds.rows.region = "West"))}}
{{ds.rows.sku(F=(ds.rows.amount > 100 or ds.rows.qty < 2))}}
```

## JSON `ds` 變通做法

```javascript
const rows = allRows.filter(
  (r) => r.amount > 50 && r.region === "West"
);
```

把過濾後的陣列放進 `ds`，模板標記不要寫 `F=`。

## JSON 結構說明

```json
{
  "title": "West high value",
  "rows": [
    { "region": "West", "sku": "B", "amount": 120 }
  ]
}
```

## 下一步

- 模組 06 — 佈局與樣式（釋出後）
