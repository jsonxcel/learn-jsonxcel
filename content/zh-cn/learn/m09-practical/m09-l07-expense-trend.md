---
title: "支出趋势预算"
description: "工作表模板 + 摘要表格 + 柱状图 + 迷你图：扁平 items[].month 驱动各月明细并汇总趋势。"
lesson_id: m09-l07
module: m09
weight: 70
level: intermediate
template_name: lesson_m09_expense_trend
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m09_expense_trend/template.png"
  result: "/previews/zh-CN/lesson_m09_expense_trend/result.png"
---

## 学习目标

- 用**工作表模板**按 `month` 生成 1月…12月工作表（不必手写 12 张表）
- 在「摘要」表用 **Excel 表格** + **公式模板 SUMIF（带 C=A5）** 汇总各类别各月支出
- 保留 **柱状图** 与 **迷你图**
- JSON 用扁平 `items[]` + `month` 属性，而不是 `jan`/`feb` 十二个数组

{{< lesson_demo template_name="lesson_m09_expense_trend" >}}

## 设计思路：从微软「支出趋势预算」到模板

| 微软原版 | 本课模板 |
|----------|----------|
| 12 张固定月份表 | 一张工作表模板 `{{ds.items.month(S=None)}}` |
| 表名 ExpJan… | 月份表明细**不建** Excel 表（见下）；摘要用「支出摘要」 |
| 摘要 SUMIFS(ExpJan[金额],…) | `{{==SUMIF('1月'!$D$5:$D$1000,INDIRECT("A"&ROW()),…)(C=A5)}}` |
| 趋势迷你图 | OOXML sparkline + `{{(C=A5)}}` |

**月份表为何不建 Excel 表？** 表名必须全书唯一。工作表模板复制带表的工作表时，重复名会变成 `Table1`/`Table2`…。本课用工作表名 + SUMIF 跨表汇总。JSON `ds` 目前也不能用 `F=` 按月过滤。

## 模板要点

### 1. 工作表模板

```text
工作表名：{{ds.items.month(S=None)}}
```

### 2. 月份表明细（G=normal，无 Excel 表）

```text
A5  {{ds.items.date(G=normal)}}
B5  {{ds.items.po}}
C5  {{ds.items.amount}}
D5  {{ds.items.category}}
E5  {{ds.items.desc}}
```

### 3. 摘要：类别扩展 + SUMIF(C=A5) + 迷你图

```text
A5  {{ds.categories.name(G=normal)}}
B5  {{==SUMIF('1月'!$D$5:$D$1000,INDIRECT("A"&ROW()),'1月'!$C$5:$C$1000)(C=A5)}}
…
N5  {{==B5+C5+D5+E5+F5+G5+H5+I5+J5+K5+L5+M5(C=A5)}}
O5  {{(C=A5)}}
```

**必须**给每个月份公式加上 `(C=A5)`（官方公式模板同款：`{{==SUM(C14)(C=A14)}}`）。缺少时只有「1月」列会按行展开，2–12 月会变成对 `A5:A9` 的数组公式并 **#溢出!**。

条件用 `INDIRECT("A"&ROW())`，避免公式模板把 `A5` 扩成区域。汇总行用 `{{==SUM(B5)}}`（需要把 `B5` 扩成 `B5:B9`）。不要写整列 `$D:$D`。

### 4. JSON：月份是属性

```json
{
  "title": "支出趋势预算",
  "year": 2026,
  "categories": [{ "name": "支出 1" }],
  "items": [
    {
      "month": "1月",
      "code": "ExpJan",
      "date": "2026-01-04",
      "po": "A-12345",
      "amount": 33,
      "category": "支出 1",
      "desc": "补给"
    }
  ]
}
```

`code` 仅对照微软 ExpJan…；驱动拆表的是 **`month`**。

## 下一步

返回 [实战样例](../)
