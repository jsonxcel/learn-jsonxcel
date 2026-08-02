---
title: "輸出 Excel vs PDF"
description: "在同一模板與 JSON 載荷上切換 output_format 為 excel 或 pdf。"
lesson_id: m03-l03
module: m03
weight: 30
level: beginner
template_name: lesson_m03_output_formats
data_sources: ["ds"]
output_formats: ["excel", "pdf"]

previews:
  template: "/previews/zh-TW/lesson_m03_output_formats/template.png"
  result: "/previews/zh-TW/lesson_m03_output_formats/result.png"
---

## 學習目標

- 在不改 JSON 形狀的前提下，切換 `output_format` 為 `"excel"` 或 `"pdf"`
- 當 PDF 是一等交付物時，按列印版式設計模板
- 理解 PDF 是快照，Excel 可保留可編輯公式

{{< lesson_demo template_name="lesson_m03_output_formats" >}}

## 模板要點

`lesson_m03_output_formats` 用同一工作簿產出兩種格式。PDF 友好檢查清單：

| 關注點 | 建議 |
|--------|------|
| 紙張 / 頁邊距 | 轉換前在 Excel 頁面佈局中設好 |
| 列印區域 | 限制在設計好的區域 |
| 字型 | 優先使用伺服器上可用的字型 |
| 僅 Excel 互動功能 | PDF 中不要依賴 |

JSON 與標記跨格式保持一致 —— 只變響應位元組。

> 模板二進位制：P05。以下契約供 convert 冒煙斷言。

## JSON 結構說明

```json
{
  "docTitle": "Shipment notice",
  "recipient": "Wide World Importers",
  "shipDate": "2026-07-18",
  "packages": 2
}
```

## API 呼叫示例

### Excel

```javascript
const API = "http://127.0.0.1:5000";
const ds = JSON.stringify({
  docTitle: "Shipment notice",
  recipient: "Wide World Importers",
  shipDate: "2026-07-18",
  packages: 2
});

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m03_output_formats",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds
  })
});
```

### PDF

同一請求體，將 `"output_format": "pdf"`，把流儲存為 `.pdf`。

## 常見錯誤

| 錯誤 | 修正 |
|------|------|
| 每種格式用不同 JSON | 契約保持一份；只改 `output_format` |
| 忽略列印版式 | 先調頁面設定再期望乾淨 PDF |
| 指望在 PDF 裡改公式 | 需要編輯時輸出 Excel |
| 錯誤處理 `Accept` / 檔名 | 跟隨響應的 `Content-Type` / disposition |

## 下一步

- [響應選項（stream / metadata）](../m03-l04-response-options/)
