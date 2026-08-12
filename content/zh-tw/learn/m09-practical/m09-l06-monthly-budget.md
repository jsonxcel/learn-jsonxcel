---
title: "個人月度預算"
description: "12 個 Excel 表格分割槽繫結：G=normal 擴充套件、表格樣式與 SUBTOTAL 合計。"
lesson_id: m09-l06
module: m09
weight: 60
level: intermediate
template_name: lesson_m09_monthly_budget
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m09_monthly_budget/template.png"
  result: "/previews/zh-TW/lesson_m09_monthly_budget/result.png"
---

## 學習目標

- 在**同一工作表**上使用多個命名 **Excel 表格（Table）**
- 每個表格繫結一個 JSON 陣列，明細用 `G=normal` 擴充套件
- 理解表格內為何用 `G=normal`（不支援 `G=merge`），以及合計行 `SUBTOTAL` 如何隨擴充套件保留
- 對照 [表格樣式保留](../../m06-layout-style/m06-l01-table-style/) 的單表示例，升級到真實多表預算簿

{{< lesson_demo template_name="lesson_m09_monthly_budget" >}}

## 設計思路：從 Target 到 Template

工作簿約定與 [簡單服務發票](../m09-l05-service-invoice/) 相同：

| 工作表 | 作用 |
|--------|------|
| **Template** | 12 個 Excel 表格 + 標記（預覽/轉換首表） |
| **Target** | 填好的樣例外觀（對照用；無表格物件，避免與 Template 重名） |
| **Description** | 語法備忘（勿寫真實 `{{`） |

原微軟「個人月度預算」樣例在「個人月度預算」表上放了 **12 個表格**：住房、娛樂、貸款、交通、保險、稅款、存款、食品、禮品、寵物、法務、個人護理。每個表結構相同：專案 / 預計費用 / 實際費用 / 差額，外加「小計」合計行。

製作步驟：

1. **保留表格外殼** — 主題、條紋、合計行公式不要拆成普通區域。  
2. **每表收縮為「表頭 + 一行標記 + 合計」** — 讓引擎按陣列長度擴行，而不是預留十幾行空明細。  
3. **JSON 一表一陣列** — 鍵名用穩定 ASCII（`housing`、`food`…），與表顯示名解耦。  
4. **差額用公式模板** — 與發票課相同，用 `{{==C16-D16}}`（雙等號）；轉換後生成真正的 Excel 公式。合計用 `{{==SUBTOTAL(...)}}`。

## 模板要點（表格能力）

### 1. 多表並存

Template 上同時存在 12 個命名錶格。引擎按單元格標記解析集合路徑；**表格主題與名稱管理器中的表名**負責版式與合計引用（頁尾總支出公式仍引用 `住房[预计费用]` 等列）。

### 2. `G=normal` 在表格內

```text
{{ds.housing.item(G=normal)}}
{{ds.housing.budget}}
{{ds.housing.actual}}
```

與模組 06 一致：Excel 表格內使用 `G=normal`。`G=merge` 在表格中不受支援。

### 3. 公式模板與合計行

| 寫法 | 含義 |
|------|------|
| `{{ds.housing.budget}}` | 綁定 JSON 欄位 |
| `{{=...}}` | 模板運算式（求值成**值**） |
| `{{==C16-D16}}` | **公式模板**（雙等號 → 產出 Excel 公式） |

```text
{{==C16-D16}}
{{==SUBTOTAL(109,住房[差额])}}
```

擴充套件插入明細後，表格區域變大，條紋樣式覆蓋新行，`SUBTOTAL` 仍對整列生效——這是「表格」相對普通單元格區域的核心收益。

### 4. 收入區：非表格的 overwrite

預計/實際收入兩行使用 `FM=overwrite`（不在 Excel 表格內），避免插行擠亂下方 12 表佈局。對比：

| 區域 | 機制 |
|------|------|
| 12 個分類明細 | Excel Table + `G=normal`（可插行擴表） |
| 收入兩行 | `FM=overwrite`（固定版式） |

## JSON 結構說明

每個分類陣列元素：`item` / `budget` / `actual`。

```json
{
  "title": "个人月度预算",
  "budget_income": [
    {"name": "收入 1", "amount": 4300},
    {"name": "额外收入", "amount": 300}
  ],
  "actual_income": [
    {"name": "收入 1", "amount": 4000},
    {"name": "额外收入", "amount": 300}
  ],
  "housing": [
    {"item": "抵押贷款或租金", "budget": 1000, "actual": 1000},
    {"item": "电话", "budget": 54, "actual": 100}
  ],
  "food": [
    {"item": "食品杂货", "budget": 200, "actual": 180}
  ]
}
```

| Excel 表格名 | JSON 陣列鍵 |
|--------------|-------------|
| 住房 | `housing` |
| 娛樂 | `entertainment` |
| 貸款 | `loans` |
| 交通 | `transportation` |
| 保險 | `insurance` |
| 稅款 | `taxes` |
| 存款 | `savings` |
| 食品 | `food` |
| 禮品 | `gifts` |
| 寵物 | `pets` |
| 法務 | `legal` |
| 個人護理 | `personal_care` |

完整樣例見課程附件 JSON（含全部 12 類）。

## API 呼叫示例

```javascript
const API = "http://127.0.0.1:5000";
const ds = await fetch("/samples/zh-CN/lesson_m09_monthly_budget.json").then((r) => r.json());

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m09_monthly_budget",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify(ds)
  })
});
```

## 相關課程

- [表格樣式保留](../../m06-layout-style/m06-l01-table-style/)
- [填充模式](../../m04-expansion-context/m04-l04-fillmode/)
- [簡單服務發票](../m09-l05-service-invoice/)

## 下一步

返回 [實戰樣例](../)。
