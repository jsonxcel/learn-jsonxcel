---
title: "图表随数据更新"
description: "把图表绑定到扩展的月份/销售额单元格。"
lesson_id: m06-l02
module: m06
weight: 20
level: intermediate
template_name: lesson_m06_chart
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m06_chart/template.png"
  result: "/previews/zh-CN/lesson_m06_chart/result.png"
---

## 学习目标

- 在图表下放置 `{{ds.points.month}}` / `{{ds.points.sales}}`
- 由扩展增加系列点
- 离散类别优先柱状图

{{< lesson_demo template_name="lesson_m06_chart" >}}

## 模板要点

柱状图锚定在 D4；系列来自 B 列。

## JSON 结构说明

```json
{
  "points": [
    {"month": "Jan", "sales": 120},
    {"month": "Feb", "sales": 150},
    {"month": "Mar", "sales": 90},
    {"month": "Apr", "sales": 180}
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
    template_name: "lesson_m06_chart",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"points\": [ {\"month\": \"Jan\", \"sales\": 120}, {\"month\": \"Feb\", \"sales\": 150}, {\"month\": \"Mar\", \"sales\": 90}, {\"month\": \"Apr\", \"sales\": 180} ] }"
  })
});
```

## 下一步

[条件格式](../m06-l03-conditional/)
