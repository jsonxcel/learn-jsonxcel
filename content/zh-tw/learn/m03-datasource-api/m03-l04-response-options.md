---
title: "響應選項（stream / metadata）"
description: "用 return_file_stream 及相關標誌控制直接下載位元組或返回 JSON 後設資料。"
lesson_id: m03-l04
module: m03
weight: 40
level: beginner
template_name: lesson_m03_single_ds
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m03_single_ds/template.png"
  result: "/previews/zh-TW/lesson_m03_single_ds/result.png"
---

## 學習目標

- 使用 `return_file_stream: true` 直接下載檔案
- 使用 `return_file_stream: false`（及相關標誌）走 JSON 後設資料流程
- 複用 `lesson_m03_single_ds` —— 本課講 **API 響應形態**，不是新標記

{{< lesson_demo template_name="lesson_m03_single_ds" >}}

## 模板要點

沒有新標記。模板與 [單資料來源 ds](../m03-l01-single-ds/) 相同。關注 JsonXcel.WebServer 常用請求標誌：

| 標誌 | 典型效果 |
|------|----------|
| `return_file_stream` | `true` → 檔案位元組；`false` → JSON 信封 |
| `return_file_name` | 在後設資料 / 頭中包含生成檔名 |
| `return_file_size` | 後設資料模式時包含大小 |
| `return_file_path` | 伺服器路徑 —— 公開演示通常 **關閉** |

頭與正文的具體落點以當前 WebServer 版本為準 —— 查閱對應構建的 Convert API 文件。

## JSON 結構說明

複用單資料來源文件：

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

## API 呼叫示例

### 流式下載

```javascript
const API = "http://127.0.0.1:5000";
const ds = JSON.stringify({
  reportTitle: "Weekly inventory",
  warehouse: "WH-East",
  asOf: "2026-07-16",
  lines: [
    { sku: "A-100", onHand: 40 },
    { sku: "B-200", onHand: 12 }
  ]
});

const res = await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m03_single_ds",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds
  })
});
const blob = await res.blob();
```

### 後設資料模式

```javascript
const res = await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m03_single_ds",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: false,
    return_file_name: true,
    return_file_size: true,
    return_file_path: false,
    ds
  })
});
const meta = await res.json();
// meta 可能包含 success、file_name、file_size 等
```

## 常見錯誤

| 錯誤 | 修正 |
|------|------|
| 流模式下按 JSON 解析 | 讀取 `blob` / 位元組 |
| 在公開站點開啟 `return_file_path` | 路徑保持私有；用自有管線存檔案 |
| 忽略 `success: false` 信封 | 在客戶端對映 `error_code` / `error_message` |
| 以為需要新模板 | 複用 `lesson_m03_single_ds` |

## 模組檢查點

你已能選擇資料來源、輸出格式與響應模式。模組 04 開始列表擴充套件。

## 下一步

- 模組 04 — [單元格擴充套件（列表展開）](../../m04-expansion-context/m04-l01-expansion/)（後續批次）
