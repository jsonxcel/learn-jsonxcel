---
title: "빠른 시작"
description: "몇 분 안에 JSON으로 Excel 파일을 생성합니다."
weight: 10
level: beginner
---

## 사전 요구 사항

- JsonXcel.WebServer가 로컬에서 실행 중이어야 합니다(기본 `http://127.0.0.1:5000`)
- Excel 템플릿이 `Templates/{language}/`에 있어야 합니다

## 첫 요청(JavaScript)

```javascript
const res = await fetch("http://127.0.0.1:5000/api/convert", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m01_first_convert",
    language: "ko-KR",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({ name: "Ada", age: 36 })
  })
});
```

{{< note >}}
`ds`는 **JSON 문자열**(stringify된 객체)이어야 합니다. 요청 본문에 중첩 JSON 객체를 넣지 마세요.
{{< /note >}}

{{< tabs >}}
=== Excel
Microsoft Excel 또는 LibreOffice에서 열 통합 문서가 필요하면 `output_format: "excel"`을 사용합니다.
=== PDF
인쇄 배포용으로는 `output_format: "pdf"`를 사용합니다. 템플릿은 인쇄 레이아웃을 고려하세요.
{{< /tabs >}}

## 다음 단계

- 영어 개념 페이지: [Templates and JSON](/en/docs/concepts/templates-and-json/)
- 영어 API: [Convert API](/en/docs/api/convert/)
