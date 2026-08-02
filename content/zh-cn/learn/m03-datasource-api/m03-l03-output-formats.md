---
title: "输出 Excel vs PDF"
description: "在同一模板与 JSON 载荷上切换 output_format 为 excel 或 pdf。"
lesson_id: m03-l03
module: m03
weight: 30
level: beginner
template_name: lesson_m03_output_formats
data_sources: ["ds"]
output_formats: ["excel", "pdf"]

previews:
  template: "/previews/zh-CN/lesson_m03_output_formats/template.png"
  result: "/previews/zh-CN/lesson_m03_output_formats/result.png"
---

## 学习目标

- 在不改 JSON 形状的前提下，切换 `output_format` 为 `"excel"` 或 `"pdf"`
- 当 PDF 是一等交付物时，按打印版式设计模板
- 理解 PDF 是快照，Excel 可保留可编辑公式

{{< lesson_demo template_name="lesson_m03_output_formats" >}}

## 模板要点

`lesson_m03_output_formats` 用同一工作簿产出两种格式。PDF 友好检查清单：

| 关注点 | 建议 |
|--------|------|
| 纸张 / 页边距 | 转换前在 Excel 页面布局中设好 |
| 打印区域 | 限制在设计好的区域 |
| 字体 | 优先使用服务器上可用的字体 |
| 仅 Excel 交互功能 | PDF 中不要依赖 |

JSON 与标记跨格式保持一致 —— 只变响应字节。

> 模板二进制：P05。以下契约供 convert 冒烟断言。

## JSON 结构说明

```json
{
  "docTitle": "Shipment notice",
  "recipient": "Wide World Importers",
  "shipDate": "2026-07-18",
  "packages": 2
}
```

## API 调用示例

### Excel

```javascript
const API = "http://127.0.0.1:5000";
const ds = JSON.stringify({
  docTitle: "Shipment notice",
  recipient: "Wide World Importers",
  shipDate: "2026-07-18",
  packages: 2
});

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m03_output_formats",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds
  })
});
```

### PDF

同一请求体，将 `"output_format": "pdf"`，把流保存为 `.pdf`。

## 常见错误

| 错误 | 修正 |
|------|------|
| 每种格式用不同 JSON | 契约保持一份；只改 `output_format` |
| 忽略打印版式 | 先调页面设置再期望干净 PDF |
| 指望在 PDF 里改公式 | 需要编辑时输出 Excel |
| 错误处理 `Accept` / 文件名 | 跟随响应的 `Content-Type` / disposition |

## 下一步

- [响应选项（stream / metadata）](../m03-l04-response-options/)
