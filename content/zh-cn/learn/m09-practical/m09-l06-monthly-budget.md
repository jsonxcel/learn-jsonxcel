---
title: "个人月度预算"
description: "12 个 Excel 表格分区绑定：G=normal 扩展、表格样式与 SUBTOTAL 合计。"
lesson_id: m09-l06
module: m09
weight: 60
level: intermediate
template_name: lesson_m09_monthly_budget
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m09_monthly_budget/template.png"
  result: "/previews/zh-CN/lesson_m09_monthly_budget/result.png"
---

## 学习目标

- 在**同一工作表**上使用多个命名 **Excel 表格（Table）**
- 每个表格绑定一个 JSON 数组，明细用 `G=normal` 扩展
- 理解表格内为何用 `G=normal`（不支持 `G=merge`），以及合计行 `SUBTOTAL` 如何随扩展保留
- 对照 [表格样式保留](../../m06-layout-style/m06-l01-table-style/) 的单表示例，升级到真实多表预算簿

{{< lesson_demo template_name="lesson_m09_monthly_budget" >}}

## 设计思路：从 Target 到 Template

工作簿约定与 [简单服务发票](../m09-l05-service-invoice/) 相同：

| 工作表 | 作用 |
|--------|------|
| **Template** | 12 个 Excel 表格 + 标记（预览/转换首表） |
| **Target** | 填好的样例外观（对照用；无表格对象，避免与 Template 重名） |
| **Description** | 语法备忘（勿写真实 `{{`） |

原微软「个人月度预算」样例在「个人月度预算」表上放了 **12 个表格**：住房、娱乐、贷款、交通、保险、税款、存款、食品、礼品、宠物、法务、个人护理。每个表结构相同：项目 / 预计费用 / 实际费用 / 差额，外加「小计」合计行。

制作步骤：

1. **保留表格外壳** — 主题、条纹、合计行公式不要拆成普通区域。  
2. **每表收缩为「表头 + 一行标记 + 合计」** — 让引擎按数组长度扩行，而不是预留十几行空明细。  
3. **JSON 一表一数组** — 键名用稳定 ASCII（`housing`、`food`…），与表显示名解耦。  
4. **差额用公式模板** — 与发票课相同，用 `{{==C16-D16}}`（双等号）；转换后生成真正的 Excel 公式。合计用 `{{==SUBTOTAL(...)}}`。

## 模板要点（表格能力）

### 1. 多表并存

Template 上同时存在 12 个命名表格。引擎按单元格标记解析集合路径；**表格主题与名称管理器中的表名**负责版式与合计引用（页脚总支出公式仍引用 `住房[预计费用]` 等列）。

### 2. `G=normal` 在表格内

```text
{{ds.housing.item(G=normal)}}
{{ds.housing.budget}}
{{ds.housing.actual}}
```

与模块 06 一致：Excel 表格内使用 `G=normal`。`G=merge` 在表格中不受支持。

### 3. 公式模板与合计行

标记约定（不要和取值表达式搞混）：

| 写法 | 含义 |
|------|------|
| `{{ds.housing.budget}}` | 绑定 JSON 字段 |
| `{{=...}}` | 模板表达式（求值成**值**） |
| `{{==C16-D16}}` | **公式模板**（双等号 → 产出 Excel 公式） |

差额与小计示例：

```text
{{==C16-D16}}
{{==SUBTOTAL(109,住房[差额])}}
```

扩展插入明细后，表格区域变大，条纹样式覆盖新行，`SUBTOTAL` 仍对整列生效——这是「表格」相对普通单元格区域的核心收益。

### 4. 收入区：非表格的 overwrite

预计/实际收入两行使用 `FM=overwrite`（不在 Excel 表格内），避免插行挤乱下方 12 表布局。对比：

| 区域 | 机制 |
|------|------|
| 12 个分类明细 | Excel Table + `G=normal`（可插行扩表） |
| 收入两行 | `FM=overwrite`（固定版式） |

## JSON 结构说明

每个分类数组元素：`item` / `budget` / `actual`。

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

| Excel 表格名 | JSON 数组键 |
|--------------|-------------|
| 住房 | `housing` |
| 娱乐 | `entertainment` |
| 贷款 | `loans` |
| 交通 | `transportation` |
| 保险 | `insurance` |
| 税款 | `taxes` |
| 存款 | `savings` |
| 食品 | `food` |
| 礼品 | `gifts` |
| 宠物 | `pets` |
| 法务 | `legal` |
| 个人护理 | `personal_care` |

完整样例见课程附件 JSON（含全部 12 类）。

## API 调用示例

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

## 相关课程

- [表格样式保留](../../m06-layout-style/m06-l01-table-style/)
- [填充模式](../../m04-expansion-context/m04-l04-fillmode/)
- [简单服务发票](../m09-l05-service-invoice/)

## 下一步

返回 [实战样例](../)。
