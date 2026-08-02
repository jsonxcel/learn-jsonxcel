---
title: "表示式與公式單元格"
description: "把 JSON 繫結值與 Excel 公式搭配，轉換後合計仍可重算。"
lesson_id: m02-l03
module: m02
weight: 30
level: beginner
template_name: lesson_m02_expression
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m02_expression/template.png"
  result: "/previews/zh-TW/lesson_m02_expression/result.png"
---

## 學習目標

- 用 mustache 繫結輸入單元格，用 **Excel 公式** 計算派生值
- 僅在引擎文件明確支援時使用模板表示式；否則把運算留在原生公式裡
- 轉換後開啟工作簿，確認公式仍然有效

{{< lesson_demo template_name="lesson_m02_expression" >}}

## 模板要點

`lesson_m02_expression`（P05 管道）通常類似：

| 單元格 | 內容 | 作用 |
|--------|------|------|
| 數量 | `{{qty}}` | 來自 JSON |
| 單價 | `{{unitPrice}}` | 來自 JSON |
| 行合計 | `=B2*C2`（示例） | 原生 Excel 公式 —— **不被** JSON 替換 |
| 可選表示式格 | 引擎文件中的表示式標記 | 處理時求值 |

JsonXcel 教程設計規則：

1. **業務輸入**放進 JSON（`qty`、`unitPrice`、稅率等）。
2. **計算**放在 Excel 公式裡，便於業務方核對。
3. 模板引擎表示式只使用已文件化的運算元 —— 不要自造語法。

轉換後，公式應仍引用已填充的單元格（後續模組的擴充套件區域同理）。

> 在 `.xlsx` 產出前，以下方 JSON 欄位為模板必須繫結的契約。

## JSON 結構說明

```json
{
  "product": "Alpine Desk",
  "qty": 3,
  "unitPrice": 249.0,
  "taxRate": 0.08
}
```

| 欄位 | 用途 |
|------|------|
| `product` | 名稱 / 說明單元格 |
| `qty` | 供公式使用的數值輸入 |
| `unitPrice` | 供公式使用的數值輸入 |
| `taxRate` | 例如 `=lineTotal*taxRate` 使用的稅率 |

本課 **不要** 在 JSON 裡預先算好 `lineTotal` —— 交給 Excel。

## API 呼叫示例

```javascript
const API = "http://127.0.0.1:5000";

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m02_expression",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      product: "Alpine Desk",
      qty: 3,
      unitPrice: 249.0,
      taxRate: 0.08
    })
  })
});
```

## 常見錯誤

| 錯誤 | 修正 |
|------|------|
| JSON 只傳已算好的合計 | 輸入留在 JSON；公式留在表上 |
| 用 `{{total}}` 覆蓋公式格 | 只繫結輸入；公式格不要放標記 |
| 以為 PDF 還能改公式 | PDF 是快照；Excel 才保留活動公式 |
| 自造未文件化的表示式語法 | 堅持 mustache + Excel 公式，除非文件另有說明 |

## 下一步

- [內聯文字中的標記](../m02-l04-inline/)
