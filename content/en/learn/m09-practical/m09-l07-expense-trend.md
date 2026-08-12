---
title: "Expense trend budget"
description: "Sheet template + Summary table + column chart + sparklines; flat items[].month drives monthly detail."
lesson_id: m09-l07
module: m09
weight: 70
level: intermediate
template_name: lesson_m09_expense_trend
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/en-US/lesson_m09_expense_trend/template.png"
  result: "/previews/en-US/lesson_m09_expense_trend/result.png"
---

## Learning objectives

- Generate Jan–Dec sheets with a **sheet template** (`{{ds.items.month(S=None)}}`)
- Build **Summary** with `{{==SUMIF(...)(C=A5)}}` — the `(C=A5)` is required so every month column expands with categories (without it, Feb–Dec become `A5:A9` and `#SPILL!`)
- Keep a **column chart** and **sparklines** (`{{(C=A5)}}`)
- Keep JSON flat: `items[]` with a `month` property

Month sheets omit Excel Tables: table names must be unique workbook-wide, so sheet-template clones rename duplicates to `Table1`/`Table2`…. Use sheet-name SUMIF instead. (JSON `ds` cannot use `F=` filters today.)

{{< lesson_demo template_name="lesson_m09_expense_trend" >}}

## Summary formula pattern

```text
A5  {{ds.categories.name(G=normal)}}
B5  {{==SUMIF('1月'!$D$5:$D$1000,INDIRECT("A"&ROW()),'1月'!$C$5:$C$1000)(C=A5)}}
N5  {{==B5+C5+D5+E5+F5+G5+H5+I5+J5+K5+L5+M5(C=A5)}}
O5  {{(C=A5)}}
```

Same idea as the official FormulaTemplate demo: `{{==SUM(C14)(C=A14)}}`.

## Next

Back to [Practical samples](../)
