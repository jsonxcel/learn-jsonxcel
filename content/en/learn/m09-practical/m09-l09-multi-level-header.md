---
title: "Multi-level header sales crosstab"
description: "Area → Country horizontal headers, Category × Name rows, and C= context totals."
lesson_id: m09-l09
module: m09
weight: 90
level: intermediate
template_name: lesson_m09_multi_level_header
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/en-US/lesson_m09_multi_level_header/template.png"
  result: "/previews/en-US/lesson_m09_multi_level_header/result.png"
---

## Learning objectives

- Build a **two-level column header**: Area on top, Country underneath, both expanding with `E=H`
- Fill a **crosstab** from a **flat JSON list** — `{{ds.Revenue}}` uses the cell on the left and the cell above
- Pin formula totals with **`C=`**: Category totals use `C=A14`, Area totals use `C=C12`

{{< lesson_demo template_name="lesson_m09_multi_level_header" >}}

## Why this pattern

Sales teams often keep one row per (product × country) in a database or ERP export. They still want a worksheet that looks like a pivot: products down the side, regions across the top, amounts at the intersections, and subtotals that follow those groups.

You do **not** need nested JSON (`areas[].countries[]`) for that. Keep `ds` as an array of records. The engine groups unique `Area` / `Country` values for the header, unique `Category` / `Name` values for the rows, and places each `Revenue` at the matching crossing.

## Template pattern

```text
C11  Area {{(E=H)}}
C12  {{ds.Area(E=H)}}
C13  {{ds.Country(E=H)}}
A14  {{ds.Category}}
B14  {{ds.Name}}
C14  {{ds.Revenue}}
D14  {{=Sum(C14)(C=A14)}}
C15  {{=Sum(C14)(C=C12)}}
D15  {{=Sum(C15)}}
```

`D11` (“Category's Sales”) sits immediately right of the expanding header. After `E=H` runs, the engine pushes that column to the right of the last Country. `A11:B13` is a merged corner label (“Sales”).

### 1. Multi-level header — `E=H` on C11, C12, C13

| Cell | Marker | Role |
|------|--------|------|
| C11 | `Area {{(E=H)}}` | Caption that expands with the Area band (no data path, only `E=H`) |
| C12 | `{{ds.Area(E=H)}}` | Parent header. One Area spans every Country that belongs to it |
| C13 | `{{ds.Country(E=H)}}` | Child header. One column per distinct Country |

`Country` is treated as a **child of Area** because C13 sits under C12 in the same expanding column. After conversion you get, for example, North America covering Canada / Cuba / Panama, then South America covering Brazil / Chile / Colombia / Ecuador / Peru.

All three cells declare `E=H` explicitly. If C13 omitted `E=H`, Country would expand **down** (default `E=V`) and destroy the header.

### 2. Crosstab cell — C14

```text
C14  {{ds.Revenue}}
```

No `E=` and no `C=` on purpose. The engine’s default context is:

- **Left cell** → `B14` `{{ds.Name}}` (the product row)
- **Top cell** → `C13` `{{ds.Country(E=H)}}` (the country column)

Each expanded C14 is therefore “this product × this country”. Missing combinations stay empty; duplicate (Name, Country) rows in JSON are summed into the same cell.

### 3. Context totals — D14 and C15

| Cell | Marker | Meaning |
|------|--------|---------|
| D14 | `{{=Sum(C14)(C=A14)}}` | After Category expands, **A14** is the context. Sum Revenue for that Category across countries |
| C15 | `{{=Sum(C14)(C=C12)}}` | After Area expands, **C12** is the context. Sum Revenue for that Area across products. The value sits in the **first Country column** of that Area |
| D15 | `{{=Sum(C15)}}` | Grand total of the Area totals |

`C=` must point at the **template cell** that owns the group — not at a cell in the finished workbook. If you write `C=C26` because that is where “North America” landed in a previous run, the next convert will miss the context.

## JSON shape

`ds` is a **JSON array**, not `{ "rows": [ ... ] }`. Keys stay in English in every language folder; only the values are localized.

```json
[
  {
    "Category": "Consumer Electronics",
    "Name": "Bose 785593-0050",
    "Area": "North America",
    "Country": "Canada",
    "Revenue": 5522
  },
  {
    "Category": "Mobile",
    "Name": "Iphone XR",
    "Area": "South America",
    "Country": "Peru",
    "Revenue": 6568
  }
]
```

| Field | Bound to | Expansion |
|-------|----------|-----------|
| `Area` | C12 | Horizontal, parent of Country |
| `Country` | C13 | Horizontal, child of Area |
| `Category` | A14 | Vertical (default) |
| `Name` | B14 | Vertical, under Category |
| `Revenue` | C14 | Crosstab fill |

Use numbers for `Revenue` (not `"5522"` strings) so Excel currency formats apply.

## API call example

```javascript
const API = "http://127.0.0.1:5000";

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m09_multi_level_header",
    language: "en-US",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify([
      {
        Category: "Consumer Electronics",
        Name: "Bose 785593-0050",
        Area: "North America",
        Country: "Canada",
        Revenue: 5522
      }
    ])
  })
});
```

## Common mistakes

| Mistake | What happens | Fix |
|---------|----------------|-----|
| Nested `areas[].countries[]` JSON | Header markers `ds.Area` / `ds.Country` do not see a flat list | Keep one record per product × country |
| C13 without `E=H` | Countries stack as extra rows | `{{ds.Country(E=H)}}` |
| `C=` pointing at a result cell | Totals empty or wrong after the next convert | `C=A14` and `C=C12` as in the template |
| Wrapping the array as `{ "ds": [ ... ] }` | Paths become `ds.ds.Area` | Pass the array as the `ds` string |
| Putting source rows on a second sheet | Convert copies that sheet unchanged | Data belongs in JSON, not in the template |

## Related lessons

- [Cell expansion](../../m04-expansion-context/m04-l01-expansion/) — `E=H` / `E=V`
- [Context](../../m04-expansion-context/m04-l02-context/) — `C=` on nested lists
- [Blue sales report](../m09-l08-blue-sales/) — `E=H` quarters × vertical product rows (nested `rows[].amounts`)

## Next

Back to [Practical reports](../)
