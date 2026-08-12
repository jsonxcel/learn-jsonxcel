---
title: "Personal monthly budget"
description: "Twelve Excel Tables on one sheet: G=normal expansion, table style, and SUBTOTAL totals."
lesson_id: m09-l06
module: m09
weight: 60
level: intermediate
template_name: lesson_m09_monthly_budget
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/en-US/lesson_m09_monthly_budget/template.png"
  result: "/previews/en-US/lesson_m09_monthly_budget/result.png"
---

## Learning objectives

- Place many named **Excel Tables** on one worksheet
- Bind each table to a JSON array and expand with `G=normal`
- Know why tables use `G=normal` (not `G=merge`) and how `SUBTOTAL` totals survive expansion
- Scale up from [Table style retention](../../m06-layout-style/m06-l01-table-style/) to a real multi-table budget workbook

{{< lesson_demo template_name="lesson_m09_monthly_budget" >}}

## Design path: Target → Template

Same three-sheet convention as [Simple service invoice](../m09-l05-service-invoice/):

| Sheet | Role |
|-------|------|
| **Template** | Twelve Excel Tables + markers (first sheet for preview/convert) |
| **Target** | Filled sample look (values/styles only — no Table objects, avoids name clashes) |
| **Description** | Notes (no live `{{`) |

The Microsoft “Personal monthly budget” sample uses **12 Tables** (housing, entertainment, loans, transportation, …). Each has Item / Budget / Actual / Diff plus a Subtotal row.

Steps:

1. Keep Table shells (theme, banding, totals formulas).  
2. Shrink each table to header + one marker row + totals.  
3. One JSON array per table (`housing`, `food`, …).  
4. Diff / totals use formula templates `{{==C16-D16}}` and `{{==SUBTOTAL(...)}}` (double equals), same pattern as the service-invoice lesson.

## Template highlights (Table features)

### 1. Many tables together

Twelve named Tables coexist on Template. Markers drive data; Table names keep structured references used by the expense totals at the bottom.

### 2. `G=normal` inside Tables

```text
{{ds.housing.item(G=normal)}}
{{ds.housing.budget}}
{{ds.housing.actual}}
```

Same rule as Module 06: use `G=normal` in Excel Tables. `G=merge` is not supported there.

### 3. Formula templates and totals

| Marker | Meaning |
|--------|---------|
| `{{ds.housing.budget}}` | Bind JSON field |
| `{{=...}}` | Template expression (evaluates to a **value**) |
| `{{==C16-D16}}` | **Formula template** (double `=` → real Excel formula after convert) |

```text
{{==C16-D16}}
{{==SUBTOTAL(109,住房[差额])}}
```

(Chinese Table names are kept so structured references stay valid; UI labels can still be localized.)

After expansion, banding covers new rows and `SUBTOTAL` still covers the Diff column.

### 4. Income band: overwrite outside Tables

Budgeted/actual income rows use `FM=overwrite` so inserts do not shove the twelve Tables downward.

| Area | Mechanism |
|------|-----------|
| Category details | Excel Table + `G=normal` |
| Income rows | `FM=overwrite` |

## JSON structure

```json
{
  "title": "Personal monthly budget",
  "budget_income": [
    {"name": "Income 1", "amount": 4300},
    {"name": "Extra income", "amount": 300}
  ],
  "actual_income": [
    {"name": "Income 1", "amount": 4000},
    {"name": "Extra income", "amount": 300}
  ],
  "housing": [
    {"item": "Mortgage or rent", "budget": 1000, "actual": 1000},
    {"item": "Phone", "budget": 54, "actual": 100}
  ],
  "food": [
    {"item": "Groceries", "budget": 200, "actual": 180}
  ]
}
```

| Excel Table name | JSON key |
|------------------|----------|
| 住房 | `housing` |
| 娱乐 | `entertainment` |
| 贷款 | `loans` |
| 交通 | `transportation` |
| 保险 | `insurance` |
| 税款 | `taxes` |
| 存款 | `savings` |
| 食品 | `food` |
| 礼品 | `gifts` |
| 宠物 | `pets` |
| 法务 | `legal` |
| 个人护理 | `personal_care` |

## API call example

```javascript
const API = "http://127.0.0.1:5000";
const ds = await fetch("/samples/en-US/lesson_m09_monthly_budget.json").then((r) => r.json());

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m09_monthly_budget",
    language: "en-US",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify(ds)
  })
});
```

## Related lessons

- [Table style retention](../../m06-layout-style/m06-l01-table-style/)
- [Fill modes](../../m04-expansion-context/m04-l04-fillmode/)
- [Simple service invoice](../m09-l05-service-invoice/)

## Next

Back to [Practical samples](../).
