---
title: "單資料來源 ds"
description: "把 ds 當作大多數模板的主 JSON 字串 —— 一份載荷、一個繫結根。"
lesson_id: m03-l01
module: m03
weight: 10
level: beginner
template_name: lesson_m03_single_ds
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m03_single_ds/template.png"
  result: "/previews/zh-TW/lesson_m03_single_ds/result.png"
---

## 學習目標

- 僅透過 `ds` 欄位傳送一份業務載荷
- 保持 `ds` 為 HTTP JSON 體中的 **JSON 字串**
- 將工作簿標記對映到該單一物件（或模板期望的陣列根）

{{< lesson_demo template_name="lesson_m03_single_ds" >}}

## 模板要點

`lesson_m03_single_ds` 是多數課程的預設形態：每個 `{{…}}` 路徑都相對於你寫入 `ds` 的物件。

| 請求欄位 | 作用 |
|----------|------|
| `ds` | 主資料來源（本課必需） |
| `ds01`、`ds02`… | 本課不用 —— 見 m03-l02 |

優先用一份連貫的文件模型（表頭 + 巢狀集合），不要過早拆分。只有當區域確實來自不同系統時再增加資料來源。

> 模板二進位制：P05。以下 JSON 契約供後續冒煙測試繫結。

## JSON 結構說明

```json
{
  "reportTitle": "Weekly inventory",
  "warehouse": "WH-East",
  "asOf": "2026-07-16",
  "lines": [
    { "sku": "A-100", "onHand": 40 },
    { "sku": "B-200", "onHand": 12 }
  ]
}
```

標記使用 `{{ds.reportTitle}}`、`{{ds.warehouse}}`，以及 `{{ds.lines.sku}}` 一類集合擴充套件。本課重點是把整份文件放進 `ds`。

## API 呼叫示例

```javascript
const API = "http://127.0.0.1:5000";

const document = {
  reportTitle: "Weekly inventory",
  warehouse: "WH-East",
  asOf: "2026-07-16",
  lines: [
    { sku: "A-100", onHand: 40 },
    { sku: "B-200", onHand: 12 }
  ]
};

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m03_single_ds",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify(document)
  })
});
```

## 常見錯誤

| 錯誤 | 修正 |
|------|------|
| 漏傳 `ds` | 始終包含主資料來源字串 |
| `ds` 傳物件 | 先 `JSON.stringify` |
| 把一半欄位放進 query/header | 繫結資料一律放在 `ds*` |
| 過早拆到 `ds01` | 區域未分叉前保持單一資料來源 |

## 下一步

- [多資料來源 ds + ds01](../m03-l02-multi-ds/)
