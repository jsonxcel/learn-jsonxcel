---
title: "서비스 청구서"
description: "Target에서 Template 설계: 인라인, 수식 템플릿, FM=overwrite."
lesson_id: m09-l05
module: m09
weight: 50
level: intermediate
template_name: lesson_m09_service_invoice
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ko-KR/lesson_m09_service_invoice/template.png"
  result: "/previews/ko-KR/lesson_m09_service_invoice/result.png"
---

> 이 페이지는 한국어 입구입니다. 상세 기술 설명은 당분간 영어/간체 중국어가 정본입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.

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
