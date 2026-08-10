---
title: "快速开始"
description: "几分钟内用 JSON 生成 Excel 文件。"
weight: 10
level: beginner
---

## 前置条件

- 本地已运行 JsonXcel.WebServer（默认 `http://127.0.0.1:5000`）
- Excel 模板位于 `Templates/{language}/`

## 第一次请求（JavaScript）

```javascript
const res = await fetch("http://127.0.0.1:5000/api/convert", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m01_first_convert",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({ name: "Ada", age: 36 })
  })
});
```

{{< note >}}
`ds` 必须是 **JSON 字符串**（已 stringify 的对象），不能在请求体里再嵌一层 JSON 对象。
{{< /note >}}

{{< tabs >}}
=== Excel
需要可在 Microsoft Excel 或 LibreOffice 打开的工作簿时，使用 `output_format: "excel"`。
=== PDF
需要打印分发时，使用 `output_format: "pdf"`。模板应考虑打印版式。
{{< /tabs >}}

## 下一步

- 英文概念页：[Templates and JSON](/en/docs/concepts/templates-and-json/)
- 英文 API：[Convert API](/en/docs/api/convert/)
