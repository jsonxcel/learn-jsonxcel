---
title: "填充模式（overflow / overwrite）"
description: "選擇 FM=Insert 與 FM=Overwrite，並在固定版式中使用 FR= 填充範圍。"
lesson_id: m04-l04
module: m04
weight: 40
level: intermediate
template_name: lesson_m04_fillmode
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m04_fillmode/template.png"
  result: "/previews/zh-TW/lesson_m04_fillmode/result.png"
---

## 學習目標

- 使用預設插入模式（`FM=Insert`）讓擴充套件新增行
- 對不應插行的固定版式改用 `FM=Overwrite`
- 理解 overwrite 資料可能溢位時的 `FR=`（填充範圍）

{{< lesson_demo template_name="lesson_m04_fillmode" >}}

## 模板要點

| 模式 | 行為 |
|------|------|
| `FM=Insert`（預設） | 先插入行/列，再寫入值與樣式 |
| `FM=Overwrite` | 寫入已有單元格；適合固定網格 |
| `FR=A8:C12` | overwrite 時可能被複制擴充套件的矩形 |

```text
{{ds.lines.sku(FM=Overwrite, FR=A8:C12)}}
{{ds.lines.qty(FM=Overwrite, FR=A8:C12)}}
```

使用 overwrite 且不做溢位複製時，請在模板中預留足夠空行。

## JSON 結構說明

```json
{
  "title": "Fixed grid lines",
  "lines": [
    { "sku": "A-100", "qty": 2 },
    { "sku": "B-200", "qty": 1 },
    { "sku": "C-300", "qty": 4 },
    { "sku": "D-400", "qty": 3 }
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
    template_name: "lesson_m04_fillmode",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      title: "Fixed grid lines",
      lines: [
        { sku: "A-100", qty: 2 },
        { sku: "B-200", qty: 1 },
        { sku: "C-300", qty: 4 },
        { sku: "D-400", qty: 3 }
      ]
    })
  })
});
```

## 常見錯誤

| 錯誤 | 修正 |
|------|------|
| overwrite 卻沒有空行 | 預先加大網格，或使用 `FR=` 溢位行為 |
| 同一擴充套件帶混用 insert / overwrite | 每個擴充套件組保持一種填充模式 |

## 下一步

- 模組 05 — 分組、排序與過濾（釋出後）
