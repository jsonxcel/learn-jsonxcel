---
title: "过滤操作符"
description: "F= 表达式过滤 — 当前需要表数据源，普通 JSON ds 不可用。"
lesson_id: m05-l03
module: m05
weight: 30
level: intermediate
template_name: lesson_m05_filter
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m05_filter/template.png"
  result: "/previews/zh-CN/lesson_m05_filter/result.png"
---

## 学习目标

- 了解 `F=` / 过滤表达式语法（`>`、`AND`、`OR`、`LIKE`、`NULL` 等）
- 理解 **JsonXcel 的 JSON `ds` 路径目前不能使用 `F=`** — 引擎要求表数据源
- 在表绑定开放前，优先在应用侧过滤后再 convert

{{< lesson_demo template_name="lesson_m05_filter" >}}

## 引擎限制（重要）

对 JSON `ds` 使用：

```text
{{ds.rows.sku(F=(ds.rows.amount > 50))}}
```

会失败：*The filter must be used with a single table or multiple table data source.*

在 WebServer 通过 `/api/convert` 暴露 `DataTable` / 表绑定之前，本课只讲语法，**请在应用代码中过滤**：

```javascript
const rows = allRows.filter((r) => r.amount > 50);
// 再用过滤后的数组去 convert
```

## 语法参考（表数据源可用时）

```text
{{ds.rows.sku(F=(ds.rows.amount > 50))}}
{{ds.rows.sku(F=(ds.rows.region = "West"))}}
{{ds.rows.sku(F=(ds.rows.note = NULL))}}
```

## JSON 结构（演示用：应用侧已过滤）

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

- [组合过滤条件](../m05-l04-filter-combined/)
