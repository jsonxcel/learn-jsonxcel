---
title: "Simple service invoice"
description: "Design Template from the Target sheet: inline markers, formula templates, and FM=overwrite."
lesson_id: m09-l05
module: m09
weight: 50
level: intermediate
template_name: lesson_m09_service_invoice
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/en-US/lesson_m09_service_invoice/template.png"
  result: "/previews/en-US/lesson_m09_service_invoice/result.png"
---

## Learning objectives

- Read **Target** (expected look) before writing **Template** markers
- Use inline markers, formula templates `{{==...}}`, and `FM=overwrite` for line items
- Follow the three-sheet design naming: `Template` / `Target` / `Description`

{{< lesson_demo template_name="lesson_m09_service_invoice" >}}

## Design path: Target → Template

This workbook ships with three sheets (download the template to compare):

| Sheet | Role |
|-------|------|
| **Template** | Engine markers (first sheet for previews; used by convert) |
| **Target** | Filled sample — the “finished” layout and fields |
| **Description** | Notes on syntax (do not put live `{{` markers here — the engine will parse them) |

Suggested steps:

1. **Partition the Target** — issuer block, invoice # / date, bill-to, line grid, subtotal/tax/total, footer contact.
2. **Define the JSON contract** — scalars on the root object; lines in `invoiceitem` (`description` / `qty` / `unitprice`).
3. **Place markers on Template** — replace changing Target cells with `{{ds....}}`; keep amounts as formula templates, not JSON.
4. **Choose fill mode** — fixed invoice grid → `FM=overwrite` so rows below (subtotal) are not pushed down.

## Template highlights (mapped from Target)

### 1. Scalars and inline markers

Target phone text becomes:

```text
Phone: {{ds.issuer_telephone}}
```

Static text and a marker may share one cell. Invoice number, date, and bill-to fields use whole-cell markers such as `{{ds.invoice_number}}`.

### 2. Line items + overwrite

Target rows 16–18 show three lines. Template puts collection markers on the **first** line row only:

```text
A16  {{ds.invoiceitem.description(FM=overwrite)}}
F16  {{ds.invoiceitem.qty}}
G16  {{ds.invoiceitem.unitprice}}
```

`FM=overwrite` writes into the reserved grid without inserting rows. Keep item count within the reserved band (through row ~30 here).

### 3. Formula templates (double equals)

```text
H16  {{==IF(F16="",ROUND(1*G16,2),ROUND(F16*G16,2))}}
H31  {{==SUM(H16:H30)}}
H33  {{==H31*H32}}
H34  {{==H31+H33}}
```

References adjust after expansion. Tax rate in `H32` can stay a workbook constant (`4.250%` in the sample).

### 4. Optional DebugMode

Defined name `TemplateOptions.DebugMode`: `TRUE` keeps template + result for comparison while authoring; this lesson’s online convert uses `FALSE`. See the **Description** sheet.

## JSON structure

Aligned with the Target sample:

```json
{
  "issuer_companyname": "Contoso Services LLC",
  "issuer_address2": "123 Main Street",
  "issuer_address1": "Redmond, WA 98052",
  "issuer_telephone": "(123) 456-7890",
  "invoice_number": "2034",
  "invoice_date": "2018-02-21",
  "payee_name": "Alex Rivera",
  "invoice_customerid": "564",
  "invoice_clause": "Due on receipt",
  "payee_companyname": "Fabrikam Inc.",
  "payee_address2": "456 Market Ave",
  "payee_address1": "Seattle, WA 98101",
  "payee_telephone": "(206) 555-0100",
  "payee_email": "alex@fabrikam.example",
  "invoiceitem": [
    {"description": "Service fee", "qty": 1, "unitprice": 200},
    {"description": "Labor: $75/hr × 5 hours", "qty": 5, "unitprice": 75},
    {"description": "New customer discount", "qty": null, "unitprice": -50}
  ],
  "contact": "Jordan Lee, (425) 555-0199, billing@contoso.example"
}
```

| Target area | JSON / markers |
|-------------|----------------|
| Issuer company / address / phone | `issuer_*` |
| Invoice #, date, terms, customer ID | `invoice_*` |
| Bill to | `payee_*` |
| Line description / qty / unit price | `invoiceitem[]` |
| Footer contact | `contact` |
| Amount, subtotal, tax, total | Formula templates (not in JSON) |

## API call example

```javascript
const API = "http://127.0.0.1:5000";
await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m09_service_invoice",
    language: "en-US",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      issuer_companyname: "Contoso Services LLC",
      issuer_address2: "123 Main Street",
      issuer_address1: "Redmond, WA 98052",
      issuer_telephone: "(123) 456-7890",
      invoice_number: "2034",
      invoice_date: "2018-02-21",
      payee_name: "Alex Rivera",
      invoice_customerid: "564",
      invoice_clause: "Due on receipt",
      payee_companyname: "Fabrikam Inc.",
      payee_address2: "456 Market Ave",
      payee_address1: "Seattle, WA 98101",
      payee_telephone: "(206) 555-0100",
      payee_email: "alex@fabrikam.example",
      invoiceitem: [
        { description: "Service fee", qty: 1, unitprice: 200 },
        { description: "Labor: $75/hr × 5 hours", qty: 5, unitprice: 75 },
        { description: "New customer discount", qty: null, unitprice: -50 }
      ],
      contact: "Jordan Lee, (425) 555-0199, billing@contoso.example"
    })
  })
});
```

## Related lessons

- [Mustache field markers](../../m02-template-basics/m02-l01-mustache/)
- [Fill modes (overflow / overwrite)](../../m04-expansion-context/m04-l04-fillmode/)
- [Expressions](../../m02-template-basics/m02-l03-expression/)

## Next

Back to [Practical samples](../) or review [Shipping / delivery note](../m09-l04-shipping/).
