---
title: "快速開始"
description: "幾分鐘內用 JSON 產生 Excel 檔案。"
weight: 10
level: beginner
---

## 前置條件

- 本機已執行 JsonXcel.WebServer（預設 `http://127.0.0.1:5000`）
- Excel 範本位於 `Templates/{language}/`

## 第一次請求（JavaScript）

```javascript
const res = await fetch("http://127.0.0.1:5000/api/convert", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m01_first_convert",
    language: "zh-TW",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({ name: "Ada", age: 36 })
  })
});
```

{{< note >}}
`ds` 必須是 **JSON 字串**（已 stringify 的物件），不能在請求本體裡再嵌一層 JSON 物件。
{{< /note >}}

{{< tabs >}}
=== Excel
需要可在 Microsoft Excel 或 LibreOffice 開啟的活頁簿時，使用 `output_format: "excel"`。
=== PDF
需要列印分發時，使用 `output_format: "pdf"`。範本應考慮列印版式。
{{< /tabs >}}

## 下一步

- 英文概念頁：[Templates and JSON](/en/docs/concepts/templates-and-json/)
- 英文 API：[Convert API](/en/docs/api/convert/)
