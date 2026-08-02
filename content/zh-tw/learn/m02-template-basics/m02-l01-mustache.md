---
title: "Mustache 欄位標記"
description: "用 {{field}} 把扁平 JSON 欄位繫結到 Excel 單元格，再經 JsonXcel 轉換。"
lesson_id: m02-l01
module: m02
weight: 10
level: beginner
template_name: lesson_m02_mustache
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m02_mustache/template.png"
  result: "/previews/zh-TW/lesson_m02_mustache/result.png"
---

## 學習目標

- 在工作簿單元格中放置與頂層 JSON 鍵一一對應的 `{{field}}` 標記
- 保留單元格上的 Excel 格式，由引擎替換標記文字
- 使用 `template_name: lesson_m02_mustache` 與扁平 `ds` 完成轉換

{{< lesson_demo template_name="lesson_m02_mustache" >}}

## 模板要點

在 `lesson_m02_mustache`（由 P05 模板管道提供）中，當整格都要被替換時，單元格里 **只放標記**：

| 用途 | 標記示例 |
|------|----------|
| 客戶名 | `{{customer}}` |
| 訂單號 | `{{orderNo}}` |
| 合計 | `{{total}}` |

提示：

- 拼寫必須一致 —— JSON 是 camelCase 時，`{{OrderNo}}` ≠ `{{orderNo}}`。
- 數字 / 日期格式在 Excel 單元格上設定；JSON 傳原始值。
- 靜態標籤放在相鄰單元格（不要加大括號）。

> 模板二進位制由構建 / P05 管道產出。在此之前，以下方 JSON 契約為準。

## JSON 結構說明

```json
{
  "customer": "Northwind Traders",
  "orderNo": "SO-10042",
  "total": 1280.5,
  "currency": "USD"
}
```

| 欄位 | 繫結標記 |
|------|----------|
| `customer` | `{{customer}}` |
| `orderNo` | `{{orderNo}}` |
| `total` | `{{total}}` |
| `currency` | `{{currency}}` |

本課只用扁平物件。巢狀路徑見 **m02-l02**。

## API 呼叫示例

```javascript
const API = "http://127.0.0.1:5000";

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m02_mustache",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      customer: "Northwind Traders",
      orderNo: "SO-10042",
      total: 1280.5,
      currency: "USD"
    })
  })
});
```

## 常見錯誤

| 錯誤 | 修正 |
|------|------|
| `{{ }}` 內多空格或拼寫錯誤 | 從 JSON 契約複製鍵名 |
| 單元格寫成 `"{{name}}"` | 只放標記；顯示型別交給 Excel |
| 本課就傳巢狀物件 | 先扁平化，或進入 m02-l02 |
| 請求體裡 `ds` 是物件 | 使用 `JSON.stringify` |

## 下一步

- [巢狀物件與陣列下標](../m02-l02-nested-path/)
