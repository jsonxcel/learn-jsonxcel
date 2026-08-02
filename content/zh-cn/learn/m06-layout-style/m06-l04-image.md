---
title: "图片字段"
description: "用 img=true 渲染 Base64 图片（ka=true 保持比例）。"
lesson_id: m06-l04
module: m06
weight: 40
level: intermediate
template_name: lesson_m06_image
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m06_image/template.png"
  result: "/previews/zh-CN/lesson_m06_image/result.png"
---

## 学习目标

- 在 JSON 中传 PNG/JPEG 的 Base64
- 单元格写 `{{ds.logo(img=true, ka=true)}}`
- 用 w/h 定尺寸或保持比例

{{< lesson_demo template_name="lesson_m06_image" >}}

> JSON 中的图片建议使用 data:image/png;base64,... 前缀（纯 Base64 在部分环境下会失败）。

> 转换时传入真实 Base64（冒烟使用极小 PNG）。

## 模板要点

支持 byte[] / Base64。简写：img、w、h、ka。

## JSON 结构说明

```json
{
  "name": "Acme",
  "logo": "<base64-png>"
}
```

## API 调用示例

```javascript
const API = "http://127.0.0.1:5000";
await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m06_image",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: "{ \"name\": \"Acme\", \"logo\": \"<base64-png>\" }"
  })
});
```

## 下一步

模块 07 — [分页](../../m07-pagination/)
