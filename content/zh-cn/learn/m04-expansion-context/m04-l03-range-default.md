---
title: "范围与默认值"
description: "用 R= 设置后备上下文区域，用 DV= 处理空字段默认值。"
lesson_id: m04-l03
module: m04
weight: 30
level: intermediate
template_name: lesson_m04_range_default
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m04_range_default/template.png"
  result: "/previews/zh-CN/lesson_m04_range_default/result.png"
---

## 学习目标

- 使用 `R=` 让矩形区域内的字段共享后备上下文
- 在 JSON 为 null / 缺失时用 `DV=` / `defaultValue=` 显示后备值
- 在稀疏主从表中组合范围与默认值

{{< lesson_demo template_name="lesson_m04_range_default" >}}

## 模板要点

| 属性 | 含义 |
|------|------|
| `R=B3:F10` | 该区域内未写 `C=` 的字段，以定义范围的单元格为上下文 |
| `DV=-` 或 `defaultValue=0` | 绑定值为空时显示 |

标记示例：

```text
{{ds.regions.name(R=A6:C20)}}
{{ds.regions.revenue(DV=0)}}
{{ds.regions.note(DV="-")}}
```

## JSON 结构说明

```json
{
  "report": "Regional revenue",
  "regions": [
    { "name": "West", "revenue": 12000, "note": "On plan" },
    { "name": "East", "revenue": null, "note": null },
    { "name": "APAC", "revenue": 8000, "note": "" }
  ]
}
```

## API 调用示例

```javascript
const API = "http://127.0.0.1:5000";

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m04_range_default",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      report: "Regional revenue",
      regions: [
        { name: "West", revenue: 12000, note: "On plan" },
        { name: "East", revenue: null, note: null },
        { name: "APAC", revenue: 8000, note: "" }
      ]
    })
  })
});
```

## 常见错误

| 错误 | 修正 |
|------|------|
| 期望公式单元格也有 `DV` | 默认值作用于数据字段，不是 Excel 公式 |
| 范围未覆盖明细标记 | 扩大 `R=` 以包含所有依赖单元格 |

## 下一步

- [填充模式（overflow / overwrite）](../m04-l04-fillmode/)
