---
title: "クイックスタート"
description: "数分で JSON から Excel ファイルを生成します。"
weight: 10
level: beginner
---

## 前提条件

- JsonXcel.WebServer がローカルで動作していること（既定 `http://127.0.0.1:5000`）
- Excel テンプレートが `Templates/{language}/` にあること

## 最初のリクエスト（JavaScript）

```javascript
const res = await fetch("http://127.0.0.1:5000/api/convert", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m01_first_convert",
    language: "ja-JP",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({ name: "Ada", age: 36 })
  })
});
```

{{< note >}}
`ds` は **JSON 文字列**（stringify 済みオブジェクト）である必要があります。リクエスト本体に入れ子の JSON オブジェクトを置かないでください。
{{< /note >}}

{{< tabs >}}
=== Excel
Microsoft Excel や LibreOffice で開けるブックが必要なときは `output_format: "excel"` を使います。
=== PDF
印刷配布向けには `output_format: "pdf"` を使います。テンプレートは印刷レイアウトを意識してください。
{{< /tabs >}}

## 次のステップ

- 英語の概念ページ：[Templates and JSON](/en/docs/concepts/templates-and-json/)
- 英語の API：[Convert API](/en/docs/api/convert/)
