---
title: "Nested objects and array expansion"
description: "Reach into nested JSON with dotted paths, and expand array rows with collection field markers."
lesson_id: m02-l02
module: m02
weight: 20
level: beginner
template_name: lesson_m02_nested_path
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/en-US/lesson_m02_nested_path/template.png"
  result: "/previews/en-US/lesson_m02_nested_path/result.png"
---

## Learning objectives

- Bind nested properties with dotted paths such as `{{ds.buyer.address.city}}`
- Expand array rows with collection fields such as `{{ds.items.sku}}`
- Know that numeric indexes like `items.0.sku` are **not** the engine path — use expansion (Module 04) for layout control

{{< lesson_demo template_name="lesson_m02_nested_path" >}}

## Template highlights

`lesson_m02_nested_path` demonstrates path navigation inside a single `ds` object:

| Marker | Resolves to |
|--------|-------------|
| `{{ds.buyer.name}}` | Nested object field |
| `{{ds.buyer.address.city}}` | Deeper nest |
| `{{ds.items.sku}}` | SKU column — expands one row per array element |
| `{{ds.items.qty}}` | Qty column — expands with the same collection |

Put collection markers on one template row; the engine inserts additional rows. Fine-grained expansion options belong to Module 04.

> Template file is produced in P05. Missing `.xlsx` does not change the JSON contract taught here.

## JSON structure

```json
{
  "buyer": {
    "name": "Contoso Ltd",
    "address": {
      "city": "Seattle",
      "country": "US"
    }
  },
  "items": [
    { "sku": "A-100", "qty": 2, "price": 40 },
    { "sku": "B-200", "qty": 1, "price": 120 }
  ]
}
```

| Path | Example value |
|------|----------------|
| `buyer.name` | `"Contoso Ltd"` |
| `buyer.address.city` | `"Seattle"` |
| `items[].sku` | `"A-100"`, `"B-200"` (via expansion) |
| `items[].qty` | `2`, `1` |

## API call example

```javascript
const API = "http://127.0.0.1:5000";

const payload = {
  buyer: {
    name: "Contoso Ltd",
    address: { city: "Seattle", country: "US" }
  },
  items: [
    { sku: "A-100", qty: 2, price: 40 },
    { sku: "B-200", qty: 1, price: 120 }
  ]
};

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m02_nested_path",
    language: "en-US",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify(payload)
  })
});
```

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Using `buyer[address][city]` style in the cell | Prefer dotted markers as supported by the engine (`{{buyer.address.city}}`) |
| Indexing past the array length | Ensure JSON always supplies those slots, or redesign the sheet |
| Trying to loop rows with only indexes | Learn expansion in Module 04 |
| Renaming nested keys per language | Keep paths identical; localize labels in Excel |

## Next

- [Expressions and formula cells](../m02-l03-expression/) (next batch)
- Or review [Mustache field markers](../m02-l01-mustache/)
