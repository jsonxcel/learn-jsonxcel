---
title: "多段見出しの売上クロス集計"
description: "地域→国の横方向見出し、カテゴリ×製品、C= コンテキスト集計。"
lesson_id: m09-l09
module: m09
weight: 90
level: intermediate
template_name: lesson_m09_multi_level_header
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/ja-JP/lesson_m09_multi_level_header/template.png"
  result: "/previews/ja-JP/lesson_m09_multi_level_header/result.png"
---

## 学習目標

- **2 段の横見出し**：上段 Area、下段 Country。どちらも `E=H`
- **平坦な JSON 配列** でクロス集計。`{{ds.Revenue}}` は左セルと上セルが既定コンテキスト
- 合計は **`C=`**：カテゴリは `C=A14`、地域は `C=C12`

{{< lesson_demo template_name="lesson_m09_multi_level_header" >}}

> 手順の詳細は英語／簡体中国語のレッスンを参照。マーカー、`template_name`、JSON キーは共通です。

```text
C11  地域 {{(E=H)}}
C12  {{ds.Area(E=H)}}
C13  {{ds.Country(E=H)}}
A14  {{ds.Category}}
B14  {{ds.Name}}
C14  {{ds.Revenue}}
D14  {{=Sum(C14)(C=A14)}}
C15  {{=Sum(C14)(C=C12)}}
```

## Next

[実践サンプル](../)
