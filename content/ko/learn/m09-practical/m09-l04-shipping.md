---
title: "출하/배송 전표"
description: "Ship-to header and expanding package list with tracking."
lesson_id: m09-l04
module: m09
weight: 40
level: advanced
template_name: lesson_m09_shipping
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ko-KR/lesson_m09_shipping/template.png"
  result: "/previews/ko-KR/lesson_m09_shipping/result.png"
---

> 이 페이지는 한국어 입구입니다. 상세 기술 설명은 당분간 영어/간체가 기준입니다. 마커·JSON 키·`template_name`은 모든 언어에서 동일합니다.


## Learning objectives

- Bind ship-to / carrier / date
- Expand packages
- Keep tracking codes as text

{{< lesson_demo template_name="lesson_m09_shipping" >}}

## Template highlights

Orange accent shipping form.

## JSON structure

```json
{
  "shipTo": "Wide World Importers",
  "shipDate": "2026-07-18",
  "carrier": "Contoso Logistics",
  "packages": [
    {"id": "PKG-1", "weight": 12.5, "tracking": "1Z999AA10123456784"},
    {"id": "PKG-2", "weight": 8.0, "tracking": "1Z999AA10123456785"}
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
    template_name: "lesson_m09_shipping",
    language: "ko-KR",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"shipTo\": \"Wide World Importers\", \"shipDate\": \"2026-07-18\", \"carrier\": \"Contoso Logistics\", \"packages\": [ {\"id\": \"PKG-1\", \"weight\": 12.5, \"tracking\": \"1Z999AA10123456784\"}, {\"id\": \"PKG-2\", \"weight\": 8.0, \"tracking\": \"1Z999AA10123456785\"} ] }"
  })
});
```

## Next

Curriculum complete for primary languages — continue P06 samples / P07 previews / P08 remaining locales.
