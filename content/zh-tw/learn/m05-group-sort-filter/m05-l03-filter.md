---
title: "過濾運算子"
description: "F= 表示式過濾 — 當前需要表資料來源，普通 JSON ds 不可用。"
lesson_id: m05-l03
module: m05
weight: 30
level: intermediate
template_name: lesson_m05_filter
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m05_filter/template.png"
  result: "/previews/zh-TW/lesson_m05_filter/result.png"
---

## 學習目標

- 瞭解 `F=` / 過濾表示式語法（`>`、`AND`、`OR`、`LIKE`、`NULL` 等）
- 理解 **JsonXcel 的 JSON `ds` 路徑目前不能使用 `F=`** — 引擎要求表資料來源
- 在表繫結開放前，優先在應用側過濾後再 convert

{{< lesson_demo template_name="lesson_m05_filter" >}}

## 引擎限制（重要）

對 JSON `ds` 使用：

```text
{{ds.rows.sku(F=(ds.rows.amount > 50))}}
```

會失敗：*The filter must be used with a single table or multiple table data source.*

在 WebServer 透過 `/api/convert` 暴露 `DataTable` / 表繫結之前，本課只講語法，**請在應用程式碼中過濾**：

```javascript
const rows = allRows.filter((r) => r.amount > 50);
// 再用过滤后的数组去 convert
```

## 語法參考（表資料來源可用時）

```text
{{ds.rows.sku(F=(ds.rows.amount > 50))}}
{{ds.rows.sku(F=(ds.rows.region = "West"))}}
{{ds.rows.sku(F=(ds.rows.note = NULL))}}
```

## JSON 結構（演示用：應用側已過濾）

```json
{
  "title": "Filtered in application",
  "rows": [
    { "region": "West", "sku": "B", "amount": 120 },
    { "region": "East", "sku": "C", "amount": 90 }
  ]
}
```

## 下一步

- [組合過濾條件](../m05-l04-filter-combined/)
