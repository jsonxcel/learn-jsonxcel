---
title: "동일 template_name, 5개 언어 폴더"
description: "Ship localized xlsx under Templates/{lang}/ with identical marker keys."
lesson_id: m08-l01
module: m08
weight: 10
level: intermediate
template_name: lesson_m08_i18n_invoice
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ko-KR/lesson_m08_i18n_invoice/template.png"
  result: "/previews/ko-KR/lesson_m08_i18n_invoice/result.png"
---

> 이 페이지는 한국어 입구입니다. 상세 기술 설명은 당분간 영어/간체가 기준입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.


## Learning objectives

- Reuse `lesson_m08_i18n_invoice` for every language
- Localize labels only; keep ds field names stable
- Pass `language` on convert to pick the folder

{{< lesson_demo template_name="lesson_m08_i18n_invoice" >}}

## Template highlights

Primary pipelines ship en-US + zh-CN; zh-TW/ja-JP/ko-KR follow the same file name in P08.

## JSON structure

```json
{
  "customer": "Contoso Ltd",
  "invoiceNo": "INV-1001",
  "invoiceDate": "2026-07-16",
  "lines": [
    {"sku": "A-100", "qty": 2, "price": 40},
    {"sku": "B-200", "qty": 1, "price": 120}
  ]
}
```

## API call example

```javascript
const API = "http://127.0.0.1:5000";
await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m08_i18n_invoice",
    language: "ko-KR",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"customer\": \"Contoso Ltd\", \"invoiceNo\": \"INV-1001\", \"invoiceDate\": \"2026-07-16\", \"lines\": [ {\"sku\": \"A-100\", \"qty\": 2, \"price\": 40}, {\"sku\": \"B-200\", \"qty\": 1, \"price\": 120} ] }"
  })
});
```

## Next

[Localization strategy](../m08-l02-i18n-strategy/)
