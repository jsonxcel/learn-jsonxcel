---
title: "蓝色销售报表"
description: "E=H 季度表头 × G=normal 产品行：交叉扩展、Table_SalesData、货币格式与斑马纹。"
lesson_id: m09-l08
module: m09
weight: 80
level: intermediate
template_name: lesson_m09_blue_sales
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m09_blue_sales/template.png"
  result: "/previews/zh-CN/lesson_m09_blue_sales/result.png"
---

## 学习目标

- 用 **`E=H`** 让「季度名称」在表头**水平扩展**
- 用 **`G=normal`** 让「产品」明细**垂直扩展**（Excel 表内）
- 销量数组 `amounts` 用 **`E=H, C=B3, G=list`** 按行水平展开，并与季度列对齐
- 使用表格 **`Table_SalesData`**、货币格式与行斑马纹；保留原版透视表工作表

{{< lesson_demo template_name="lesson_m09_blue_sales" >}}

## 设计思路：从微软「蓝色销售报表」到模板

微软联机模板含「销售数据」明细表（`Table_SalesData`）及透视表。本课模板化明细表以突出**水平 × 垂直交叉扩展**，并保留原版透视表工作表。

| 工作表 | 作用 |
|--------|------|
| **销售数据** | 引擎模板（预览首表；布局同原版从 B 列起） |
| **按产品 / 按客户 / 十大产品 / 十大客户** | 原版透视表（设计簿为活动透视；引擎模板为数值快照，避免转换崩溃） |
| **Target** | 目标效果样例 |
| **Description** | 语法备忘（勿写真实 `{{`） |

| 微软原版 | 本课模板 |
|----------|----------|
| 固定「第 1–4 季度」列 | `{{ds.季度名称(E=H)}}` 水平扩展 |
| 产品/客户多行 | `{{ds.rows.product(G=normal)}}` 垂直扩展 |
| 季度销量单元格 | `{{ds.rows.amounts(E=H, C=B3, G=list)}}` |
| 汇总列公式 | `{{==SUM(D3)(C=B3)}}` → 扩展后 `SUM(D3:G3)` |
| `Table_SalesData` + 斑马纹 | 同名表 + `TableStyleMedium2` 行条纹 |
| 货币格式 | `¥#,##0.00` |

## 模板要点

### 1. 水平扩展：季度表头

```text
D2  {{ds.季度名称(E=H)}}
E2  汇总
```

`E=H` 把字符串数组从左向右铺开。`汇总` 紧挨在扩展单元格右侧，引擎会在季度列生成后把「汇总」推到最右。

### 2. 垂直扩展：产品行

```text
B3  {{ds.rows.product(G=normal)}}
C3  {{ds.rows.customer}}
```

表内使用 `G=normal`（与模块 06 / 月度预算一致）。布局与原版一致，明细从 **B 列** 起。

### 3. 交叉：每行金额水平展开

```text
D3  {{ds.rows.amounts(E=H, C=B3, G=list)}}
E3  {{==SUM(D3)(C=B3)}}
```

**`C=B3` 不能省**：否则各行的 `amounts` 会挤进第一行，并打乱季度表头的水平扩展。`C=B3` 把金额数组绑定到当前产品行上下文。

**`G=list` 不能省**：水平扩展默认按值合并；销量里大量相同的 `0` 会被合并丢掉。`G=list` 按数组下标逐格展开，保留零值与顺序。

汇总用公式模板（官方同款 `{{==SUM(...)(C=...)}}`），随季度列数变成 `=SUM(D3:G3)`。

表列名必须与表头单元格文字一致（含标记字符串）；否则 Excel 会报「修复表」并改写 `table1.xml`。

### 4. JSON 契约

```json
{
  "title": "蓝色销售报表",
  "季度名称": ["第 1 季度", "第 2 季度", "第 3 季度", "第 4 季度"],
  "rows": [
    {
      "product": "Alice Mutton（爱丽丝羊肉）",
      "customer": "ANTON",
      "amounts": [0, 702, 0, 0]
    }
  ]
}
```

| 字段 | 作用 |
|------|------|
| `季度名称[]` | 表头水平扩展（属性名按需求固定为中文） |
| `rows[].product` / `customer` | 垂直扩展行 |
| `rows[].amounts[]` | 与季度一一对应的销量；长度必须一致 |

注意：样例里每个产品只保留一行。若 `product` 值重复，`G=normal` 会按产品归组，客户挤到子行、金额错位。多客户场景请为每行使用唯一键（例如 `id`）作为垂直扩展驱动。

## 与 m04 扩展课的关系

[单元格扩展](../../m04-expansion-context/m04-l01-expansion/) 分别演示了 `E=V` 与 `E=H`。本课把两者放进同一张业务表：表头水平、明细垂直，再用上下文把金额数组钉在每一行上。

## 下一步

返回 [实战样例](../)
