---
title: "巢狀物件與陣列擴充套件"
description: "用點路徑訪問巢狀 JSON，並用集合欄位擴充套件陣列行。"
lesson_id: m02-l02
module: m02
weight: 20
level: beginner
template_name: lesson_m02_nested_path
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m02_nested_path/template.png"
  result: "/previews/zh-TW/lesson_m02_nested_path/result.png"
---

## 學習目標

- 用 `{{ds.buyer.address.city}}` 一類點路徑繫結巢狀屬性
- 用 `{{ds.items.sku}}` 一類集合欄位擴充套件陣列行
- 明確 `items.0.sku` 這類數字下標 **不是** 引擎路徑 — 版式控制見擴充套件（模組 04）

{{< lesson_demo template_name="lesson_m02_nested_path" >}}

## 模板要點

`lesson_m02_nested_path` 演示在單個 `ds` 物件內做路徑導航：

| 標記 | 解析到 |
|------|--------|
| `{{ds.buyer.name}}` | 巢狀物件欄位 |
| `{{ds.buyer.address.city}}` | 更深一層 |
| `{{ds.items.sku}}` | SKU 列 — 按陣列元素擴充套件行 |
| `{{ds.items.qty}}` | 數量列 — 與同一集合一起擴充套件 |

把集合標記放在模板的一行上，引擎會插入更多行。更細的擴充套件選項見模組 04。

> 模板檔案在 P05 產出。缺少 `.xlsx` 不改變本課教授的 JSON 契約。

## JSON 結構說明

```json
{
  "buyer": {
    "name": "Contoso Ltd",
    "address": {
      "city": "Seattle",
      "country": "US"
    }
  },
  "items": [
    { "sku": "A-100", "qty": 2, "price": 40 },
    { "sku": "B-200", "qty": 1, "price": 120 }
  ]
}
```

| 路徑 | 示例值 |
|------|--------|
| `buyer.name` | `"Contoso Ltd"` |
| `buyer.address.city` | `"Seattle"` |
| `items[].sku` | `"A-100"`, `"B-200"`（經擴充套件） |
| `items[].qty` | `2`, `1` |

## API 呼叫示例

```javascript
const API = "http://127.0.0.1:5000";

const payload = {
  buyer: {
    name: "Contoso Ltd",
    address: { city: "Seattle", country: "US" }
  },
  items: [
    { sku: "A-100", qty: 2, price: 40 },
    { sku: "B-200", qty: 1, price: 120 }
  ]
};

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m02_nested_path",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify(payload)
  })
});
```

## 常見錯誤

| 錯誤 | 修正 |
|------|------|
| 單元格寫成 `buyer[address][city]` 風格 | 使用引擎支援的點路徑標記（`{{buyer.address.city}}`） |
| 下標超出陣列長度 | 保證 JSON 始終提供這些槽位，或改版式 |
| 只用下標試圖迴圈多行 | 學習模組 04 的擴充套件 |
| 按語言重新命名巢狀鍵 | 路徑保持一致；本地化寫在 Excel 標籤上 |

## 下一步

- [表示式與公式單元格](../m02-l03-expression/)（下一批）
- 或複習 [Mustache 欄位標記](../m02-l01-mustache/)
