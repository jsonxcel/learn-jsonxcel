---
title: "サービス請求書"
description: "Target から Template を設計：インライン、数式テンプレート、FM=overwrite。"
lesson_id: m09-l05
module: m09
weight: 50
level: intermediate
template_name: lesson_m09_service_invoice
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ja-JP/lesson_m09_service_invoice/template.png"
  result: "/previews/ja-JP/lesson_m09_service_invoice/result.png"
---

> このページは日本語の入口です。詳細な技術説明は当面英語／簡体中国語が正本です。マーカー・JSON キー・`template_name` は全言語で共通です。

## Learning objectives

- Read **Target** before writing **Template** markers
- Use inline markers, `{{==...}}` formula templates, and `FM=overwrite`
- Follow sheet naming: `Template` / `Target` / `Description`

{{< lesson_demo template_name="lesson_m09_service_invoice" >}}

## Template highlights

Simple service invoice: scalars + overwrite line grid + formula templates for amounts.

## JSON structure

Same contract as the English lesson (`issuer_*`, `payee_*`, `invoice_*`, `invoiceitem[]`, `contact`).

## Next

[Practical samples](../) · [Shipping](../m09-l04-shipping/)
