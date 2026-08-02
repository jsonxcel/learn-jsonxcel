---
title: "按组重复页眉"
description: "用主从上下文让每组明细上方保留组标题。"
lesson_id: m07-l02
module: m07
weight: 20
level: intermediate
template_name: lesson_m07_repeat_group
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m07_repeat_group/template.png"
  result: "/previews/zh-CN/lesson_m07_repeat_group/result.png"
---

## 学习目标

- 用 G=merge 扩展组名
- 明细用 C= 挂到组单元格
- 按打印版式把每组做成小节

{{< lesson_demo template_name="lesson_m07_repeat_group" >}}

## 模板要点

`{{ds.groups.name(G=merge)}}` + `{{ds.groups.lines.label(C=A7)}}`。

## JSON 结构说明

```json
{
  "company": "Northwind",
  "groups": [
    {"name": "Hardware", "lines": [{"label": "SSD", "amount": 120}, {"label": "RAM", "amount": 80}]},
    {"name": "Services", "lines": [{"label": "Support", "amount": 200}]}
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
    template_name: "lesson_m07_repeat_group",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"company\": \"Northwind\", \"groups\": [ {\"name\": \"Hardware\", \"lines\": [{\"label\": \"SSD\", \"amount\": 120}, {\"label\": \"RAM\", \"amount\": 80}]}, {\"name\": \"Services\", \"lines\": [{\"label\": \"Support\", \"amount\": 200}]} ] }"
  })
});
```

## 下一步

模块 08 — [多语言发票](../../m08-i18n/)
