---
title: "다단계 머리글 매출 교차표"
description: "지역→국가 가로 머리글, 범주×제품 행, C= 컨텍스트 합계."
lesson_id: m09-l09
module: m09
weight: 90
level: intermediate
template_name: lesson_m09_multi_level_header
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ko-KR/lesson_m09_multi_level_header/template.png"
  result: "/previews/ko-KR/lesson_m09_multi_level_header/result.png"
---

## 학습 목표

- **2단계 가로 머리글**: 위는 Area, 아래는 Country. 둘 다 `E=H`
- **평평한 JSON 배열**로 교차표. `{{ds.Revenue}}` 기본 컨텍스트는 왼쪽 셀과 위쪽 셀
- 합계는 **`C=`**: 범주는 `C=A14`, 지역은 `C=C12`

{{< lesson_demo template_name="lesson_m09_multi_level_header" >}}

> 자세한 설명은 영어/간체 중국어 레슨을 보세요. 마커, `template_name`, JSON 키는 모든 언어에서 같습니다.

```text
C11  지역 {{(E=H)}}
C12  {{ds.Area(E=H)}}
C13  {{ds.Country(E=H)}}
A14  {{ds.Category}}
B14  {{ds.Name}}
C14  {{ds.Revenue}}
D14  {{=Sum(C14)(C=A14)}}
C15  {{=Sum(C14)(C=C12)}}
```

## Next

[실전 샘플](../)
