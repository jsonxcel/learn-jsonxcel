---
title: "组合过滤条件"
description: "F= 中的 AND / OR / NOT — 在表数据源支持前，JSON ds 路径不可用。"
lesson_id: m05-l04
module: m05
weight: 40
level: intermediate
template_name: lesson_m05_filter_combined
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m05_filter_combined/template.png"
  result: "/previews/zh-CN/lesson_m05_filter_combined/result.png"
---

## 学习目标

- 用 `AND` / `OR` / `NOT` 组合过滤条件
- 与 m05-l03 相同的 JSON 限制 — 目前在应用代码中组合条件

{{< lesson_demo template_name="lesson_m05_filter_combined" >}}

## 语法（需要表数据源）

```text
{{ds.rows.sku(F=(ds.rows.amount > 50 and ds.rows.region = "West"))}}
{{ds.rows.sku(F=(ds.rows.amount > 100 or ds.rows.qty < 2))}}
```

## JSON `ds` 变通做法

```javascript
const rows = allRows.filter(
  (r) => r.amount > 50 && r.region === "West"
);
```

把过滤后的数组放进 `ds`，模板标记不要写 `F=`。

## JSON 结构说明

```json
{
  "title": "West high value",
  "rows": [
    { "region": "West", "sku": "B", "amount": 120 }
  ]
}
```

## 下一步

- 模块 06 — 布局与样式（发布后）
