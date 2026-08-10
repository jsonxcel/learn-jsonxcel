---
title: "Designing multilingual Excel templates for APIs"
description: "Same template_name, five language folders — localize labels in Excel, keep JSON keys stable for one integration."
date: 2026-06-16T10:00:00+08:00
categories: ["Localization"]
tags: ["i18n", "templates", "excel"]
series: ["Getting started with JsonXcel"]
author: "JsonXcel"
---

JsonXcel treats language as a **folder**, not a fork of your API. Callers pass `language` (for example `en-US` or `zh-CN`) and the same `template_name`. The engine resolves `Templates/{language}/{template_name}.xlsx`.

## What to localize in the workbook

Put locale-specific content in Excel:

- Column headers and section titles  
- Date and currency display formats  
- Static legal footers and logos when they differ by market  

Keep **JSON property names** identical across languages. One payload shape should fill every workbook.

## Folder layout

```text
Templates/
  en-US/invoice.xlsx
  zh-CN/invoice.xlsx
  zh-TW/invoice.xlsx
  ja-JP/invoice.xlsx
  ko-KR/invoice.xlsx
```

Ship only the locales you support. Missing folders fail fast with a clear convert error instead of silently falling back to the wrong script.

## API habit that scales

Always send `language` explicitly — even when the default is `en-US`. Clients that hard-code the default make it harder to add markets later. Pair each user preference or tenant setting with the BCP-47 folder name your ops team maintains.

## Validation checklist

1. Same marker names in every locale file.  
2. Sample JSON validated once, reused for smoke tests in each language.  
3. Print layout checked for CJK line breaks and PDF output.

## Related reading

- [Why Excel templates beat drawing sheets in code](../excel-templates-vs-code/)  
- [Anatomy of a JsonXcel convert request](../anatomy-of-a-convert-request/)  
- Docs: [Convert API](../../docs/api/convert/)
