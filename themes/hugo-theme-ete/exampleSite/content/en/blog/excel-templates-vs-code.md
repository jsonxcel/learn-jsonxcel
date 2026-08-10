---
title: "Why Excel templates beat drawing sheets in code"
description: "Keep layout in workbooks designers already own — and stop shipping report UI through engineering sprints."
date: 2026-06-02T10:00:00+08:00
categories: ["Architecture"]
tags: ["templates", "excel", "api"]
series: ["Getting started with JsonXcel"]
author: "JsonXcel"
---

Most backends already speak JSON. The expensive part of document generation is rarely serialization — it is **layout ownership**. When every invoice tweak means opening a C# or Java cell painter, product and design wait on engineers.

## The cost of drawing cells in code

Code-drawn sheets look precise in demos and age poorly in production:

- Fonts, merges, and print margins drift from the designer’s intent.
- Localization usually forks the painting logic instead of swapping a file.
- Small copy changes become pull requests and release trains.

Excel already solves layout. The missing piece is a clean contract between **structured data** and **workbook markers**.

## Templates as the layout boundary

With JsonXcel, designers keep working in Excel. Markers bind fields and expansion regions. Your service posts:

- `template_name` — logical workbook id  
- `language` — folder under `Templates/{locale}/`  
- `ds` / `ds01` — JSON **strings** for data sources  
- `output_format` — `excel` or `pdf`

Layout stays out of application code. Integrations stay JSON-native.

## When code-drawn sheets still make sense

Extremely dynamic grids with no stable visual language, or one-off exports nobody will restyle, can stay in code. For business documents that finance, ops, or sales will reopen next quarter, templates win.

## Next

- [Designing multilingual Excel templates for APIs](../multilingual-excel-templates/)  
- [Anatomy of a JsonXcel convert request](../anatomy-of-a-convert-request/)  
- Docs: [Templates and JSON](../../docs/concepts/templates-and-json/)
