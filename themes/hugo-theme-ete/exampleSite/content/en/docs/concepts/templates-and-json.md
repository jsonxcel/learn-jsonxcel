---
title: "Templates and JSON"
description: "Workbook markers, language folders, and ds* data sources."
weight: 10
level: beginner
---

## Mental model

{{< mermaid >}}
flowchart LR
  A[Business JSON] --> B[JsonXcel /api/convert]
  C[Excel template] --> B
  B --> D[Excel or PDF]
{{< /mermaid >}}

## Template folders

Store workbooks as:

```text
Templates/
  en-US/invoice.xlsx
  zh-CN/invoice.xlsx
```

Use the **same** `template_name` (`invoice`) and pass `language` on each request.

{{< warning title="Stable field names" >}}
Localize labels in the workbook, but keep JSON **keys** identical across languages so one integration works everywhere.
{{< /warning >}}

## Data sources

| Property | Role |
|----------|------|
| `ds` | Primary JSON string |
| `ds01`, `ds02`, … | Additional sources for multi-source templates |

{{< lesson_demo template_name="lesson_m03_multi_ds" >}}

## Related

- [Convert API](../../api/convert/)
- [Quickstart](../../getting-started/quickstart/)
