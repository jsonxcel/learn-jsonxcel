---
title: "Multiple data sources"
description: "Bind separate workbook regions with ds and ds01 when payloads come from different services."
lesson_id: m03-l02
module: m03
weight: 20
level: beginner
template_name: lesson_m03_multi_ds
data_sources: ["ds", "ds01"]
output_formats: ["excel"]

previews:
  template: "/previews/en-US/lesson_m03_multi_ds/template.png"
  result: "/previews/en-US/lesson_m03_multi_ds/result.png"
---

## Learning objectives

- Send `ds` and `ds01` as two independent JSON **strings**
- Align template regions with the correct data-source index (engine naming)
- Decide when multi-source is justified versus one nested document

{{< lesson_demo template_name="lesson_m03_multi_ds" >}}

## Template highlights

`lesson_m03_multi_ds` uses two payloads:

| Field | Typical region |
|-------|----------------|
| `ds` | Order / header block |
| `ds01` | Company profile, glossary, or second list from another API |

Template designers wire each band to a data source in the workbook (engine-specific template options). As an API caller you only need to:

1. Stringify each payload separately.
2. Keep shapes stable so either service can redeploy alone.
3. Pass both on every convert — do not omit an empty source if the template expects it (send `"{}"` or `"[]"` when appropriate).

> Prefer a single `ds` document when both parts always ship together. Multi-source shines when teams or backends are already split.

## JSON structure

**`ds` — order header**

```json
{
  "orderNo": "SO-10042",
  "customer": "Northwind Traders",
  "orderDate": "2026-07-16"
}
```

**`ds01` — company block**

```json
{
  "legalName": "Northwind Holdings LLC",
  "taxId": "US-98-7654321",
  "supportEmail": "ops@northwind.example"
}
```

## API call example

```javascript
const API = "http://127.0.0.1:5000";

const order = {
  orderNo: "SO-10042",
  customer: "Northwind Traders",
  orderDate: "2026-07-16"
};

const company = {
  legalName: "Northwind Holdings LLC",
  taxId: "US-98-7654321",
  supportEmail: "ops@northwind.example"
};

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m03_multi_ds",
    language: "en-US",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify(order),
    ds01: JSON.stringify(company)
  })
});
```

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Nesting `ds01` inside the `ds` string | Two top-level string fields on the request |
| Swapping which payload is which | Match the template’s data-source mapping |
| Leaving `ds01` undefined when required | Always send a string (`"{}"` minimum) |
| Duplicating the same object in both | Split only real boundaries |

## Next

- [Excel vs PDF output](../m03-l03-output-formats/) (next batch)
