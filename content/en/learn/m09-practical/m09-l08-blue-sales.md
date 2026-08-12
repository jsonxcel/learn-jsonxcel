---
title: "Blue sales report"
description: "E=H quarter headers × G=normal product rows: cross expansion, Table_SalesData, currency, zebra stripes."
lesson_id: m09-l08
module: m09
weight: 80
level: intermediate
template_name: lesson_m09_blue_sales
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/en-US/lesson_m09_blue_sales/template.png"
  result: "/previews/en-US/lesson_m09_blue_sales/result.png"
---

## Learning objectives

- Expand quarter headers **horizontally** with `{{ds.季度名称(E=H)}}`
- Expand product rows **vertically** with `{{ds.rows.product(G=normal)}}`
- Spread each row’s `amounts` with `{{ds.rows.amounts(E=H, C=B3, G=list)}}` (`C=B3` and `G=list` are both required)
- Keep Excel Table **Table_SalesData**, currency formats, row stripes, and the original pivot sheets

{{< lesson_demo template_name="lesson_m09_blue_sales" >}}

## Template pattern

```text
D2  {{ds.季度名称(E=H)}}
B3  {{ds.rows.product(G=normal)}}
C3  {{ds.rows.customer}}
D3  {{ds.rows.amounts(E=H, C=B3, G=list)}}
E3  {{==SUM(D3)(C=B3)}}
```

Sheets: **销售数据** (engine template, col B like the Microsoft original) · **按产品 / 按客户 / 十大产品 / 十大客户** (pivots; live in the design workbook, value snapshots in engine templates) · **Target** · **Description**.

`C=B3` keeps each amounts array on its product row. `G=list` prevents merge-mode from collapsing duplicate zeros. Table column names must match header cell text exactly or Excel repairs `table1.xml`.

## JSON shape

```json
{
  "title": "Blue sales report",
  "季度名称": ["Q1", "Q2", "Q3", "Q4"],
  "rows": [
    {
      "product": "Alice Mutton",
      "customer": "ANTON",
      "amounts": [0, 702, 0, 0]
    }
  ]
}
```

The property name `季度名称` stays Chinese across locales (marker path). Values may be localized (`Q1`… vs `第 1 季度`).

## Next

Back to [Practical samples](../)
