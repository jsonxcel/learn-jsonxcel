---
title: "上下文（主從）"
description: "用 C= 上下文屬性讓明細行對齊到主欄位。"
lesson_id: m04-l02
module: m04
weight: 20
level: intermediate
template_name: lesson_m04_context
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m04_context/template.png"
  result: "/previews/zh-TW/lesson_m04_context/result.png"
---

## 學習目標

- 擴充套件主列表（如部門），並在其下巢狀明細行
- 用 `C=`（上下文）把明細標記指向主單元格
- 保持 JSON 為主物件各自包含明細陣列的形狀

{{< lesson_demo template_name="lesson_m04_context" >}}

## 模板要點

`lesson_m04_context` 是小型「部門 → 員工」報表：

| 單元格意圖 | 標記 |
|------------|------|
| 部門名 | `{{ds.depts.name}}` |
| 該部門下的員工 | `{{ds.depts.people.name(C=A5)}}`（示例 — 上下文單元格為主欄位） |
| 員工職位 | `{{ds.depts.people.title(C=A5)}}` |

`C=` 指定擁有當前主例項的單元格。主欄位擴充套件時，每個明細帶都在該例項上下文中求值。

工作簿中的實際單元格地址必須與標記裡的 `C=` 引數一致。

## JSON 結構說明

```json
{
  "company": "Northwind",
  "depts": [
    {
      "name": "Sales",
      "people": [
        { "name": "Ada", "title": "AE" },
        { "name": "Grace", "title": "SE" }
      ]
    },
    {
      "name": "Ops",
      "people": [
        { "name": "Lin", "title": "Lead" }
      ]
    }
  ]
}
```

| 路徑 | 作用 |
|------|------|
| `company` | 標量表頭 |
| `depts[]` | 主擴充套件 |
| `depts[].people[]` | 主上下文中的明細擴充套件 |

## API 呼叫示例

```javascript
const API = "http://127.0.0.1:5000";

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m04_context",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      company: "Northwind",
      depts: [
        {
          name: "Sales",
          people: [
            { name: "Ada", title: "AE" },
            { name: "Grace", title: "SE" }
          ]
        },
        {
          name: "Ops",
          people: [{ name: "Lin", title: "Lead" }]
        }
      ]
    })
  })
});
```

## 常見錯誤

| 錯誤 | 修正 |
|------|------|
| 明細標記沒有 `C=` | 把上下文設為主單元格 |
| `C=` 地址寫錯 | 與實際主標記單元格一致 |
| 扁平列表沒有巢狀 | 把 `people` 嵌在每個 `depts` 物件下 |

## 下一步

- [範圍與預設值](../m04-l03-range-default/)
