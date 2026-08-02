---
title: "單元格擴充套件（列表展開）"
description: "用 E=V / E=H 模板屬性控制陣列欄位的垂直或水平擴充套件。"
lesson_id: m04-l01
module: m04
weight: 10
level: intermediate
template_name: lesson_m04_expansion
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m04_expansion/template.png"
  result: "/previews/zh-TW/lesson_m04_expansion/result.png"
---

## 學習目標

- 在模板行放置 `{{ds.lines.sku}}` 一類集合標記，使引擎按元素插入行
- 用 `E=V`（垂直，預設）或 `E=H`（水平）設定擴充套件方向
- 把非列表欄位放在擴充套件帶之外，表頭保持不動

{{< lesson_demo template_name="lesson_m04_expansion" >}}

## 模板要點

`lesson_m04_expansion` 演示隨 `lines` 陣列增長的產品列表：

| 標記 | 作用 |
|------|------|
| `{{ds.orderNo}}` | 標量表頭 — 不擴充套件 |
| `{{ds.lines.sku}}` | 集合欄位 — 隨陣列擴充套件 |
| `{{ds.lines.qty(E=V)}}` | 顯式垂直擴充套件（與預設相同） |
| `{{ds.tags(E=H)}}` | 水平跨列擴充套件 |

語法提示（標記內的引擎模板屬性）：

```text
{{ds.lines.sku}}
{{ds.lines.qty(E=V)}}
{{ds.tags(E=H)}}
```

需要單值時用 `E=N` 關閉該標記的擴充套件。

## JSON 結構說明

```json
{
  "orderNo": "SO-20001",
  "customer": "Contoso Ltd",
  "lines": [
    { "sku": "A-100", "qty": 2, "price": 40 },
    { "sku": "B-200", "qty": 1, "price": 120 },
    { "sku": "C-300", "qty": 5, "price": 15 }
  ],
  "tags": ["rush", "export", "insured"]
}
```

| 欄位 | 繫結 |
|------|------|
| `orderNo`, `customer` | 標量單元格 |
| `lines[]` | 垂直擴充套件帶 |
| `tags[]` | 水平擴充套件示例 |

## API 呼叫示例

```javascript
const API = "http://127.0.0.1:5000";

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m04_expansion",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      orderNo: "SO-20001",
      customer: "Contoso Ltd",
      lines: [
        { sku: "A-100", qty: 2, price: 40 },
        { sku: "B-200", qty: 1, price: 120 },
        { sku: "C-300", qty: 5, price: 15 }
      ],
      tags: ["rush", "export", "insured"]
    })
  })
});
```

## 常見錯誤

| 錯誤 | 修正 |
|------|------|
| 期待 `lines.0.sku` 下標 | 改用集合標記 + 擴充套件 |
| 把頁尾放進擴充套件行 | 頁尾放在擴充套件帶下方 |
| 同一行漏掉兄弟欄位 | `sku` / `qty` / `price` 放在同一模板行一起擴充套件 |

## 下一步

- [上下文（主從）](../m04-l02-context/)
