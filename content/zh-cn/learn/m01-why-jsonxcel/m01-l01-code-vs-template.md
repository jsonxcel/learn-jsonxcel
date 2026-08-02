---
title: "代码画表 vs 模板解耦"
description: "为什么在应用代码里画 Excel 单元格难以扩展 —— JsonXcel 如何把版式与 JSON 分开。"
lesson_id: m01-l01
module: m01
weight: 10
level: beginner
template_name: lesson_m01_pain_vs_template
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m01_pain_vs_template/template.png"
  result: "/previews/zh-CN/lesson_m01_pain_vs_template/result.png"
---

## 学习目标

- 说明在 C# / Java / TypeScript 中「画单元格」的长期成本
- 描述 JsonXcel 边界：**Excel 管版式**，**JSON 管数据**，**API 管转换**
- 区分哪些内容应放进模板，哪些应放进 `ds`

{{< lesson_demo template_name="lesson_m01_pain_vs_template" >}}

## 为什么先学这一课

很多团队从代码写单元格起步：设字体、合并区域、循环行、硬编码列号。演示能过，但财务改文案、运营加列、亚太要第二语言时就会卡住。

JsonXcel 把工作簿放在 `Templates/{language}/`，通过 `POST /api/convert` 接收业务载荷。改版式等于换文件 —— 而不是重新发布画表逻辑。

## 模板要点

示例工作簿 `lesson_m01_pain_vs_template`（由 P05 模板流水线提供）对比两个区域：

| 区域 | 意图 |
|------|------|
| 「代码画表」说明 | 提醒过去要在源码里维护的内容 |
| 「模板绑定」单元格 | 由 `ds` 填充的 Mustache 风格标记 |

现在不必记全所有标记 —— 模块 02 会讲。本课关注 **归属**：设计师改 `.xlsx`；服务只发送 JSON。

> 模板二进制由构建 / P05 管道产出。若 `Templates/{language}/` 下尚无文件，convert 可能失败。

## JSON 结构说明

主数据源：`ds`（HTTP 体中的 **JSON 字符串**）。

```json
{
  "scenario": "monthly-invoice",
  "approach": "template",
  "customer": "Northwind Traders",
  "amount": 1280.5,
  "currency": "USD",
  "notes": "版式在 Excel；服务只 POST JSON。"
}
```

| 字段 | 作用 |
|------|------|
| `scenario` | 在表上标注演示场景 |
| `approach` | 例如 `template`，对比「代码画表」叙事 |
| `customer` / `amount` / `currency` | 典型业务字段，由标记绑定 |
| `notes` | 对比说明用的自由文本 |

各语言保持 **相同的属性名**。本地化文案写在工作簿里，不要靠改 JSON 键名。

## API 调用示例

```javascript
const API = "http://127.0.0.1:5000"; // 或站点 params.apiBaseUrl

const res = await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m01_pain_vs_template",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      scenario: "monthly-invoice",
      approach: "template",
      customer: "Northwind Traders",
      amount: 1280.5,
      currency: "USD",
      notes: "版式在 Excel；服务只 POST JSON。"
    })
  })
});

if (!res.ok) {
  console.error(await res.text());
}
```

## 常见错误

| 错误 | 修正 |
|------|------|
| 把嵌套 JSON 对象直接放进 `ds` | `ds` 必须是 **字符串**（`JSON.stringify(...)`） |
| 在客户端编码版式规则 | 字体、合并、文案放到工作簿 |
| 每种语言用不同 JSON 键 | 键名保持一致；只替换 `Templates/{language}/` |
| 指望本课讲完所有标记 | 继续 m01-l02 完成第一次完整 convert |

## 下一步

- [第一次转换请求](../m01-l02-first-convert/)
