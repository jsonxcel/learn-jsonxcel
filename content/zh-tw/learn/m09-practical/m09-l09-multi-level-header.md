---
title: "多級表頭銷售交叉表"
description: "區域→國家橫向表頭、品類×產品列，以及 C= 上下文合計。"
lesson_id: m09-l09
module: m09
weight: 90
level: intermediate
template_name: lesson_m09_multi_level_header
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m09_multi_level_header/template.png"
  result: "/previews/zh-TW/lesson_m09_multi_level_header/result.png"
---

## 學習目標

- 做 **兩級橫向表頭**：上面是區域（Area），下面是國家（Country），都用 `E=H`
- 用 **扁平 JSON 陣列** 填 **交叉表**：`{{ds.Revenue}}` 預設取左邊儲存格和上邊儲存格作為上下文
- 用 **`C=`** 釘住合計：品類合計 `C=A14`，區域合計 `C=C12`

{{< lesson_demo template_name="lesson_m09_multi_level_header" >}}

## 為什麼用這種範本

業務庫或 ERP 匯出常常是「一列一個 產品×國家」。報表卻要長得像樞紐分析：左邊是產品，上面是區域/國家，交叉格是金額，並且小計跟著分組走。

這 **不必** 把 JSON 做成 `areas[].countries[]` 巢狀。`ds` 保持為紀錄陣列即可。引擎會按 `Area` / `Country` 去重做表頭，按 `Category` / `Name` 去重做列，再把每條 `Revenue` 放到對應交叉點。

## 範本要點

```text
C11  區域 {{(E=H)}}
C12  {{ds.Area(E=H)}}
C13  {{ds.Country(E=H)}}
A14  {{ds.Category}}
B14  {{ds.Name}}
C14  {{ds.Revenue}}
D14  {{=Sum(C14)(C=A14)}}
C15  {{=Sum(C14)(C=C12)}}
D15  {{=Sum(C15)}}
```

`D11`（「品類合計」）緊挨在橫向擴展儲存格右側。`E=H` 跑完後，引擎會把這一欄推到最後一個國家的右邊。

### 1. 多級表頭：C11、C12、C13 都寫 `E=H`

Country 在 Area 正下方同一擴展欄，因此 **Country 是 Area 的下級**。三個儲存格都要 **顯式** `E=H`，否則國家會按預設 `E=V` 往下長。

### 2. 交叉表：C14

`{{ds.Revenue}}` 故意不寫 `E=` 也不寫 `C=`。預設上下文是左格 `B14`（產品）與上格 `C13`（國家）。

### 3. 上下文合計

| 儲存格 | 標記 | 含義 |
|--------|------|------|
| D14 | `{{=Sum(C14)(C=A14)}}` | 品類（A14）擴展後的區域都是 D14 的上下文 |
| C15 | `{{=Sum(C14)(C=C12)}}` | 區域（C12）擴展後的區域都是 C15 的上下文 |
| D15 | `{{=Sum(C15)}}` | 總計 |

`C=` 必須指向 **範本裡的儲存格**，不是某次產生結果裡的座標。

## JSON 結構

`ds` 是陣列；**鍵名保持英文**。

```json
[
  {
    "Category": "消費電子",
    "Name": "Bose 785593-0050",
    "Area": "北美",
    "Country": "加拿大",
    "Revenue": 5522
  }
]
```

## 下一步

返回 [實戰樣例](../)
