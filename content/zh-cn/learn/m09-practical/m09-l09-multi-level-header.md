---
title: "多级表头销售交叉表"
description: "区域→国家横向表头、品类×产品行，以及 C= 上下文合计。"
lesson_id: m09-l09
module: m09
weight: 90
level: intermediate
template_name: lesson_m09_multi_level_header
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m09_multi_level_header/template.png"
  result: "/previews/zh-CN/lesson_m09_multi_level_header/result.png"
---

## 学习目标

- 做 **两级横向表头**：上面是区域（Area），下面是国家（Country），都用 `E=H`
- 用 **扁平 JSON 数组** 填 **交叉表**：`{{ds.Revenue}}` 默认取左边单元格和上边单元格作为上下文
- 用 **`C=`** 钉住合计：品类合计 `C=A14`，区域合计 `C=C12`

{{< lesson_demo template_name="lesson_m09_multi_level_header" >}}

## 为什么用这种模板

业务库或 ERP 导出常常是「一行一个 产品×国家」。报表却要长得像透视表：左边是产品，上面是区域/国家，交叉格是金额，并且小计跟着分组走。

这 **不必** 把 JSON 做成 `areas[].countries[]` 嵌套。`ds` 保持为记录数组即可。引擎会按 `Area` / `Country` 去重做表头，按 `Category` / `Name` 去重做行，再把每条 `Revenue` 放到对应交叉点。

## 模板要点

```text
C11  区域 {{(E=H)}}
C12  {{ds.Area(E=H)}}
C13  {{ds.Country(E=H)}}
A14  {{ds.Category}}
B14  {{ds.Name}}
C14  {{ds.Revenue}}
D14  {{=Sum(C14)(C=A14)}}
C15  {{=Sum(C14)(C=C12)}}
D15  {{=Sum(C15)}}
```

`D11`（「品类合计」）紧挨在横向扩展单元格右侧。`E=H` 跑完后，引擎会把这一列推到最后一个国家的右边。`A11:B13` 是合并后的拐角标题（「销售」）。

英文模板里 C11 是 `Area {{(E=H)}}`；中文模板只本地化「区域」二字，**`{{(E=H)}}` 与 JSON 键名都不翻译**。

### 1. 多级表头：C11、C12、C13 都写 `E=H`

| 单元格 | 标记 | 作用 |
|--------|------|------|
| C11 | `区域 {{(E=H)}}` | 标题随 Area 带一起横向扩展（没有数据路径，只有 `E=H`） |
| C12 | `{{ds.Area(E=H)}}` | 父级表头。一个区域会盖住它下面的全部国家列 |
| C13 | `{{ds.Country(E=H)}}` | 子级表头。每个国家一列 |

C13 在 C12 正下方同一扩展列里，所以 **Country 是 Area 的下级**。转换后例如：北美盖住加拿大 / 古巴 / 巴拿马，南美盖住巴西 / 智利 / 哥伦比亚 / 厄瓜多尔 / 秘鲁。

三个单元格都要 **显式** `E=H`。C13 若漏写，国家会按默认 `E=V` **往下长**，表头就坏了。

### 2. 交叉表：C14

```text
C14  {{ds.Revenue}}
```

这里故意不写 `E=` 也不写 `C=`。引擎默认上下文是：

- **左单元格** → `B14` `{{ds.Name}}`（当前产品行）
- **上单元格** → `C13` `{{ds.Country(E=H)}}`（当前国家列）

扩展后的每个 C14 就是「这个产品 × 这个国家」。没有数据的组合留空；JSON 里重复的 (Name, Country) 会进同一格并合计。

### 3. 上下文合计：D14 与 C15

| 单元格 | 标记 | 含义 |
|--------|------|------|
| D14 | `{{=Sum(C14)(C=A14)}}` | Category 扩展之后，**A14** 是上下文。对该品类、所有国家的 Revenue 求和 |
| C15 | `{{=Sum(C14)(C=C12)}}` | Area 扩展之后，**C12** 是上下文。对该区域、所有产品的 Revenue 求和。数值落在该区域的 **第一个国家列** |
| D15 | `{{=Sum(C15)}}` | 区域合计的总计 |

`C=` 必须指向 **模板里的单元格地址**，也就是分组主人所在的那一格，而不是某次生成结果里「北美」落到的 C26。下次转换列数一变，写死结果坐标就会丢上下文。

## JSON 结构

`ds` 是 **JSON 数组**，不是 `{ "rows": [ ... ] }`。各语言目录里 **键名保持英文**；只有取值做本地化。

```json
[
  {
    "Category": "消费电子",
    "Name": "Bose 785593-0050",
    "Area": "北美",
    "Country": "加拿大",
    "Revenue": 5522
  },
  {
    "Category": "手机",
    "Name": "Iphone XR",
    "Area": "南美",
    "Country": "秘鲁",
    "Revenue": 6568
  }
]
```

| 字段 | 绑定 | 扩展方式 |
|------|------|----------|
| `Area` | C12 | 横向，Country 的父级 |
| `Country` | C13 | 横向，Area 的下级 |
| `Category` | A14 | 纵向（默认） |
| `Name` | B14 | 纵向，从属于 Category |
| `Revenue` | C14 | 交叉填充 |

`Revenue` 请用数字（不要 `"5522"` 字符串），货币格式才能生效。

## API 调用示例

```javascript
const API = "http://127.0.0.1:5000";

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m09_multi_level_header",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify([
      {
        Category: "消费电子",
        Name: "Bose 785593-0050",
        Area: "北美",
        Country: "加拿大",
        Revenue: 5522
      }
    ])
  })
});
```

## 常见错误

| 错误 | 现象 | 改法 |
|------|------|------|
| JSON 做成 `areas[].countries[]` | `ds.Area` / `ds.Country` 对不上扁平列表 | 保持「一行一个 产品×国家」 |
| C13 不写 `E=H` | 国家变成往下增行 | `{{ds.Country(E=H)}}` |
| `C=` 写成生成结果里的格子 | 下次转换合计为空或错 | 用模板地址 `C=A14`、`C=C12` |
| 把数组再包一层 `{ "ds": [ ... ] }` | 路径变成 `ds.ds.Area` | `ds` 字符串的内容就是数组本身 |
| 在第二张表里放源数据 | 转换会原样带上那张表 | 数据放 JSON，不要放进模板 |

## 相关课程

- [单元格扩展](../../m04-expansion-context/m04-l01-expansion/) — `E=H` / `E=V`
- [上下文](../../m04-expansion-context/m04-l02-context/) — 嵌套列表上的 `C=`
- [蓝色销售报表](../m09-l08-blue-sales/) — `E=H` 季度 × 纵向产品（嵌套 `rows[].amounts`）

## 下一步

返回 [实战样例](../)
