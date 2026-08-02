---
title: "程式碼畫表 vs 模板解耦"
description: "為什麼在應用程式碼裡畫 Excel 單元格難以擴充套件 —— JsonXcel 如何把版式與 JSON 分開。"
lesson_id: m01-l01
module: m01
weight: 10
level: beginner
template_name: lesson_m01_pain_vs_template
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m01_pain_vs_template/template.png"
  result: "/previews/zh-TW/lesson_m01_pain_vs_template/result.png"
---

## 學習目標

- 說明在 C# / Java / TypeScript 中「畫單元格」的長期成本
- 描述 JsonXcel 邊界：**Excel 管版式**，**JSON 管資料**，**API 管轉換**
- 區分哪些內容應放進模板，哪些應放進 `ds`

{{< lesson_demo template_name="lesson_m01_pain_vs_template" >}}

## 為什麼先學這一課

很多團隊從程式碼寫單元格起步：設字型、合併區域、迴圈行、硬編碼列號。演示能過，但財務改文案、運營加列、亞太要第二語言時就會卡住。

JsonXcel 把工作簿放在 `Templates/{language}/`，透過 `POST /api/convert` 接收業務載荷。改版式等於換檔案 —— 而不是重新發布畫表邏輯。

## 模板要點

示例工作簿 `lesson_m01_pain_vs_template`（由 P05 模板流水線提供）對比兩個區域：

| 區域 | 意圖 |
|------|------|
| 「程式碼畫表」說明 | 提醒過去要在原始碼裡維護的內容 |
| 「模板繫結」單元格 | 由 `ds` 填充的 Mustache 風格標記 |

現在不必記全所有標記 —— 模組 02 會講。本課關注 **歸屬**：設計師改 `.xlsx`；服務只傳送 JSON。

> 模板二進位制由構建 / P05 管道產出。若 `Templates/{language}/` 下尚無檔案，convert 可能失敗。

## JSON 結構說明

主資料來源：`ds`（HTTP 體中的 **JSON 字串**）。

```json
{
  "scenario": "monthly-invoice",
  "approach": "template",
  "customer": "Northwind Traders",
  "amount": 1280.5,
  "currency": "USD",
  "notes": "版式在 Excel；服务只 POST JSON。"
}
```

| 欄位 | 作用 |
|------|------|
| `scenario` | 在表上標註演示場景 |
| `approach` | 例如 `template`，對比「程式碼畫表」敘事 |
| `customer` / `amount` / `currency` | 典型業務欄位，由標記繫結 |
| `notes` | 對比說明用的自由文字 |

各語言保持 **相同的屬性名**。本地化文案寫在工作簿裡，不要靠改 JSON 鍵名。

## API 呼叫示例

```javascript
const API = "http://127.0.0.1:5000"; // 或站点 params.apiBaseUrl

const res = await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m01_pain_vs_template",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      scenario: "monthly-invoice",
      approach: "template",
      customer: "Northwind Traders",
      amount: 1280.5,
      currency: "USD",
      notes: "版式在 Excel；服务只 POST JSON。"
    })
  })
});

if (!res.ok) {
  console.error(await res.text());
}
```

## 常見錯誤

| 錯誤 | 修正 |
|------|------|
| 把巢狀 JSON 物件直接放進 `ds` | `ds` 必須是 **字串**（`JSON.stringify(...)`） |
| 在客戶端編碼版式規則 | 字型、合併、文案放到工作簿 |
| 每種語言用不同 JSON 鍵 | 鍵名保持一致；只替換 `Templates/{language}/` |
| 指望本課講完所有標記 | 繼續 m01-l02 完成第一次完整 convert |

## 下一步

- [第一次轉換請求](../m01-l02-first-convert/)
