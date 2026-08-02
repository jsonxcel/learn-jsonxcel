---
title: "多資料來源 ds + ds01"
description: "當載荷來自不同服務時，用 ds 與 ds01 繫結工作簿中的不同區域。"
lesson_id: m03-l02
module: m03
weight: 20
level: beginner
template_name: lesson_m03_multi_ds
data_sources: ["ds", "ds01"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m03_multi_ds/template.png"
  result: "/previews/zh-TW/lesson_m03_multi_ds/result.png"
---

## 學習目標

- 將 `ds` 與 `ds01` 作為兩個獨立的 JSON **字串**傳送
- 使模板區域與正確的資料來源序號對齊（按引擎命名）
- 判斷何時該用多資料來源，何時應合併為一份巢狀文件

{{< lesson_demo template_name="lesson_m03_multi_ds" >}}

## 模板要點

`lesson_m03_multi_ds` 使用兩份載荷：

| 欄位 | 典型區域 |
|------|----------|
| `ds` | 訂單 / 表頭塊 |
| `ds01` | 公司資料、術語表，或另一 API 的列表 |

模板設計者在工作簿裡把各區塊接到資料來源（引擎特定的模板選項）。作為 API 呼叫方你只需：

1. 分別 stringify 每份載荷。
2. 保持形狀穩定，便於任一服務單獨發版。
3. 每次 convert 都帶上兩者 —— 若模板需要該源，不要省略（可按情況傳 `"{}"` 或 `"[]"`）。

> 兩部分總是一起下發時，優先用單個 `ds` 文件。多資料來源適合團隊或後端已經拆分的場景。

## JSON 結構說明

**`ds` — 訂單表頭**

```json
{
  "orderNo": "SO-10042",
  "customer": "Northwind Traders",
  "orderDate": "2026-07-16"
}
```

**`ds01` — 公司資訊塊**

```json
{
  "legalName": "Northwind Holdings LLC",
  "taxId": "US-98-7654321",
  "supportEmail": "ops@northwind.example"
}
```

## API 呼叫示例

```javascript
const API = "http://127.0.0.1:5000";

const order = {
  orderNo: "SO-10042",
  customer: "Northwind Traders",
  orderDate: "2026-07-16"
};

const company = {
  legalName: "Northwind Holdings LLC",
  taxId: "US-98-7654321",
  supportEmail: "ops@northwind.example"
};

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m03_multi_ds",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify(order),
    ds01: JSON.stringify(company)
  })
});
```

## 常見錯誤

| 錯誤 | 修正 |
|------|------|
| 把 `ds01` 嵌進 `ds` 字串裡 | 請求上兩個頂層字串欄位 |
| 兩份載荷對調 | 對照模板的資料來源對映 |
| 需要時卻不傳 `ds01` | 始終傳字串（至少 `"{}"`） |
| 兩份裡複製同一物件 | 只在真實邊界處拆分 |

## 下一步

- [輸出 Excel vs PDF](../m03-l03-output-formats/)（下一批）
