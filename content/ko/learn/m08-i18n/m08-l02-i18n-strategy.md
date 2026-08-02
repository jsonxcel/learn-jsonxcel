---
title: "키 고정·문구 현지화 전략"
description: "Never translate JSON keys; put human text in the workbook per language folder."
lesson_id: m08-l02
module: m08
weight: 20
level: intermediate
template_name: lesson_m08_i18n_strategy
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ko-KR/lesson_m08_i18n_strategy/template.png"
  result: "/previews/ko-KR/lesson_m08_i18n_strategy/result.png"
---

> 이 페이지는 한국어 입구입니다. 상세 기술 설명은 당분간 영어/간체가 기준입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.


## Learning objectives

- Keep camelCase keys identical across locales
- Translate sheet labels / footers only
- Avoid embedding locale-specific sentences in JSON

{{< lesson_demo template_name="lesson_m08_i18n_strategy" >}}

## Template highlights

Demo sheet lists `productName` / `unitPrice` / `currency` with localized hint column.

## JSON structure

```json
{
  "productName": "Alpine Desk",
  "unitPrice": 249,
  "currency": "USD"
}
```

## API call example

```javascript
const API = "http://127.0.0.1:5000";
await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m08_i18n_strategy",
    language: "ko-KR",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"productName\": \"Alpine Desk\", \"unitPrice\": 249, \"currency\": \"USD\" }"
  })
});
```

## Next

Module 09 — [Sales order](../../m09-practical/)
