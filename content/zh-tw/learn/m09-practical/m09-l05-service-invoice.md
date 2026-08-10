---
title: "簡單服務發票"
description: "從 Target 目標效果反推 Template：內聯標記、公式模板與 FM=overwrite。"
lesson_id: m09-l05
module: m09
weight: 50
level: intermediate
template_name: lesson_m09_service_invoice
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m09_service_invoice/template.png"
  result: "/previews/zh-TW/lesson_m09_service_invoice/result.png"
---

## 學習目標

- 先讀 **Target**（目標效果），再設計 **Template** 標記
- 使用內聯標記、公式模板 `{{==...}}`、明細區 `FM=overwrite`
- 掌握設計稿三表命名：`Template` / `Target` / `Description`

{{< lesson_demo template_name="lesson_m09_service_invoice" >}}

## 設計思路：從 Target 到 Template

本課工作簿按約定包含三張表（下載模板即可對照）：

| 工作表 | 作用 |
|--------|------|
| **Template** | 引擎模板（預覽首表；轉換讀寫此表） |
| **Target** | 填好的「成品」樣例，版式與欄位一目瞭然 |
| **Description** | 本模板用到的語法備忘（表內勿寫真實 `{{` 標記，否則會被引擎解析） |

製作步驟建議：

1. **拆區塊**（看 Target）  
   開票方資訊、發票號/日期、受票方、明細表、小計/稅/總計、頁尾聯絡人。
2. **定 JSON 契約**  
   標量進根物件；明細進陣列 `invoiceitem`（`description` / `qty` / `unitprice`）。
3. **寫標記**（改 Template）  
   把 Target 裡會變的單元格換成 `{{ds....}}`；金額列用公式模板，而不是把計算結果寫進 JSON。
4. **選填充模式**  
   發票明細區版式固定（預留多行），用 `FM=overwrite` 覆蓋寫入，避免插行破壞下方「小計」區域。

## 模板要點（對照 Target）

### 1. 標量與內聯標記

Target 中「電話：(123) 456-7890」在 Template 寫成：

```text
电话：{{ds.issuer_telephone}}
```

靜態文案與標記可在同一單元格（內聯模板）。發票號、日期、受票方欄位同理，使用整格標記，例如 `{{ds.invoice_number}}`。

### 2. 明細行 + overwrite

Target 第 16–18 行是三條明細。Template 只在**第一行明細**放集合標記：

```text
A16  {{ds.invoiceitem.description(FM=overwrite)}}
F16  {{ds.invoiceitem.qty}}
G16  {{ds.invoiceitem.unitprice}}
```

`FM=overwrite`：不插入新行，向下覆蓋已有空白明細行，保留邊框與「金額」列公式樣式。明細條數不要超過預留行數（本模板約到第 30 行）。

### 3. 公式模板（雙等號）

行金額、小計、稅費、總計在 Target 裡是計算結果；在 Template 用公式模板，讓引擎在擴充套件後生成真正的 Excel 公式：

```text
H16  {{==IF(F16="",ROUND(1*G16,2),ROUND(F16*G16,2))}}
H31  {{==SUM(H16:H30)}}
H33  {{==H31*H32}}
H34  {{==H31+H33}}
```

擴充套件後引用會隨填充調整。稅率 `H32` 可留在表內為常量（本樣例 `4.250%`），不必進 JSON。

### 4. 除錯模式（可選）

名稱管理器中的 `TemplateOptions.DebugMode`：設計時設為 `TRUE` 可在同一工作簿對照模板與結果；本課線上轉換使用 `FALSE`。詳見 **Description** 表。

## JSON 結構說明

與 Target 樣例資料對齊的契約：

```json
{
  "issuer_companyname": "星辰咨询有限公司",
  "issuer_address2": "创新大道 88 号",
  "issuer_address1": "广东省深圳市南山区 518057",
  "issuer_telephone": "(123) 456-7890",
  "invoice_number": "2034",
  "invoice_date": "2018-02-21",
  "payee_name": "陈晓",
  "invoice_customerid": "564",
  "invoice_clause": "收到后付款",
  "payee_companyname": "广域贸易有限公司",
  "payee_address2": "中山路 100 号",
  "payee_address1": "广东省广州市天河区 510000",
  "payee_telephone": "(020) 8888-0000",
  "payee_email": "billing@wideworld.example",
  "invoiceitem": [
    {"description": "服务费用", "qty": 1, "unitprice": 200},
    {"description": "人工：75 美元/小时，5 小时", "qty": 5, "unitprice": 75},
    {"description": "新客户折扣", "qty": null, "unitprice": -50}
  ],
  "contact": "李敏、(0755) 123-4567、support@star.example"
}
```

| Target 區域 | JSON / 標記 |
|-------------|-------------|
| 開票方公司/地址/電話 | `issuer_*` |
| 發票編號、日期、條款、客戶 ID | `invoice_*` |
| 受票方 | `payee_*` |
| 明細說明/數量/單價 | `invoiceitem[]` |
| 頁尾聯絡人 | `contact` |
| 金額、小計、稅、總計 | Excel 公式模板（不進 JSON） |

## API 呼叫示例

```javascript
const API = "http://127.0.0.1:5000";
await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m09_service_invoice",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      issuer_companyname: "星辰咨询有限公司",
      issuer_address2: "创新大道 88 号",
      issuer_address1: "广东省深圳市南山区 518057",
      issuer_telephone: "(123) 456-7890",
      invoice_number: "2034",
      invoice_date: "2018-02-21",
      payee_name: "陈晓",
      invoice_customerid: "564",
      invoice_clause: "收到后付款",
      payee_companyname: "广域贸易有限公司",
      payee_address2: "中山路 100 号",
      payee_address1: "广东省广州市天河区 510000",
      payee_telephone: "(020) 8888-0000",
      payee_email: "billing@wideworld.example",
      invoiceitem: [
        { description: "服务费用", qty: 1, unitprice: 200 },
        { description: "人工：75 美元/小时，5 小时", qty: 5, unitprice: 75 },
        { description: "新客户折扣", qty: null, unitprice: -50 }
      ],
      contact: "李敏、(0755) 123-4567、support@star.example"
    })
  })
});
```

## 相關課程

- [Mustache 欄位標記](../../m02-template-basics/m02-l01-mustache/)
- [填充模式（overflow / overwrite）](../../m04-expansion-context/m04-l04-fillmode/)
- [表示式與公式](../../m02-template-basics/m02-l03-expression/)

## 下一步

返回 [實戰樣例](../) 或繼續複習 [發貨單](../m09-l04-shipping/)。
