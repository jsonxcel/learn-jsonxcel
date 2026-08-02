---
title: "表达式与公式单元格"
description: "把 JSON 绑定值与 Excel 公式搭配，转换后合计仍可重算。"
lesson_id: m02-l03
module: m02
weight: 30
level: beginner
template_name: lesson_m02_expression
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m02_expression/template.png"
  result: "/previews/zh-CN/lesson_m02_expression/result.png"
---

## 学习目标

- 用 mustache 绑定输入单元格，用 **Excel 公式** 计算派生值
- 仅在引擎文档明确支持时使用模板表达式；否则把运算留在原生公式里
- 转换后打开工作簿，确认公式仍然有效

{{< lesson_demo template_name="lesson_m02_expression" >}}

## 模板要点

`lesson_m02_expression`（P05 管道）通常类似：

| 单元格 | 内容 | 作用 |
|--------|------|------|
| 数量 | `{{qty}}` | 来自 JSON |
| 单价 | `{{unitPrice}}` | 来自 JSON |
| 行合计 | `=B2*C2`（示例） | 原生 Excel 公式 —— **不被** JSON 替换 |
| 可选表达式格 | 引擎文档中的表达式标记 | 处理时求值 |

JsonXcel 教程设计规则：

1. **业务输入**放进 JSON（`qty`、`unitPrice`、税率等）。
2. **计算**放在 Excel 公式里，便于业务方核对。
3. 模板引擎表达式只使用已文档化的算子 —— 不要自造语法。

转换后，公式应仍引用已填充的单元格（后续模块的扩展区域同理）。

> 在 `.xlsx` 产出前，以下方 JSON 字段为模板必须绑定的契约。

## JSON 结构说明

```json
{
  "product": "Alpine Desk",
  "qty": 3,
  "unitPrice": 249.0,
  "taxRate": 0.08
}
```

| 字段 | 用途 |
|------|------|
| `product` | 名称 / 说明单元格 |
| `qty` | 供公式使用的数值输入 |
| `unitPrice` | 供公式使用的数值输入 |
| `taxRate` | 例如 `=lineTotal*taxRate` 使用的税率 |

本课 **不要** 在 JSON 里预先算好 `lineTotal` —— 交给 Excel。

## API 调用示例

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

## 常见错误

| 错误 | 修正 |
|------|------|
| JSON 只传已算好的合计 | 输入留在 JSON；公式留在表上 |
| 用 `{{total}}` 覆盖公式格 | 只绑定输入；公式格不要放标记 |
| 以为 PDF 还能改公式 | PDF 是快照；Excel 才保留活动公式 |
| 自造未文档化的表达式语法 | 坚持 mustache + Excel 公式，除非文档另有说明 |

## 下一步

- [内联文本中的标记](../m02-l04-inline/)
