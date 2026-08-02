---
title: "上下文（主从）"
description: "用 C= 上下文属性让明细行对齐到主字段。"
lesson_id: m04-l02
module: m04
weight: 20
level: intermediate
template_name: lesson_m04_context
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m04_context/template.png"
  result: "/previews/zh-CN/lesson_m04_context/result.png"
---

## 学习目标

- 扩展主列表（如部门），并在其下嵌套明细行
- 用 `C=`（上下文）把明细标记指向主单元格
- 保持 JSON 为主对象各自包含明细数组的形状

{{< lesson_demo template_name="lesson_m04_context" >}}

## 模板要点

`lesson_m04_context` 是小型「部门 → 员工」报表：

| 单元格意图 | 标记 |
|------------|------|
| 部门名 | `{{ds.depts.name}}` |
| 该部门下的员工 | `{{ds.depts.people.name(C=A5)}}`（示例 — 上下文单元格为主字段） |
| 员工职位 | `{{ds.depts.people.title(C=A5)}}` |

`C=` 指定拥有当前主实例的单元格。主字段扩展时，每个明细带都在该实例上下文中求值。

工作簿中的实际单元格地址必须与标记里的 `C=` 参数一致。

## JSON 结构说明

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

| 路径 | 作用 |
|------|------|
| `company` | 标量表头 |
| `depts[]` | 主扩展 |
| `depts[].people[]` | 主上下文中的明细扩展 |

## API 调用示例

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

## 常见错误

| 错误 | 修正 |
|------|------|
| 明细标记没有 `C=` | 把上下文设为主单元格 |
| `C=` 地址写错 | 与实际主标记单元格一致 |
| 扁平列表没有嵌套 | 把 `people` 嵌在每个 `depts` 对象下 |

## 下一步

- [范围与默认值](../m04-l03-range-default/)
