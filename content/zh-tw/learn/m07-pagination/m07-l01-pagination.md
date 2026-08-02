---
title: "分頁與頁碼"
description: "在分組主欄位上插入分頁，並用 Excel 頁尾顯示頁碼。"
lesson_id: m07-l01
module: m07
weight: 10
level: intermediate
template_name: lesson_m07_pagination
data_sources: ["ds"]
output_formats: ["excel", "pdf"]

previews:
  template: "/previews/zh-TW/lesson_m07_pagination/template.png"
  result: "/previews/zh-TW/lesson_m07_pagination/result.png"
---

## 學習目標

- 在主欄位上設定 `pageBreak=true`
- 用 `C=` 巢狀明細行
- 頁首頁尾使用 Page &P of &N

{{< lesson_demo template_name="lesson_m07_pagination" >}}

## 模板要點

主欄位 `{{ds.depts.name(G=merge, pageBreak=true)}}`，明細帶上下文。

## JSON 結構說明

```json
{
  "depts": [
    {"name": "Sales", "items": [{"name": "Laptop", "qty": 2}, {"name": "Mouse", "qty": 10}]},
    {"name": "Ops", "items": [{"name": "Toner", "qty": 5}]}
  ]
}
```

## API 呼叫示例

```javascript
const API = "http://127.0.0.1:5000";
await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m07_pagination",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"depts\": [ {\"name\": \"Sales\", \"items\": [{\"name\": \"Laptop\", \"qty\": 2}, {\"name\": \"Mouse\", \"qty\": 10}]}, {\"name\": \"Ops\", \"items\": [{\"name\": \"Toner\", \"qty\": 5}]} ] }"
  })
});
```

## 下一步

[按組重複頁首](../m07-l02-repeat-group/)
