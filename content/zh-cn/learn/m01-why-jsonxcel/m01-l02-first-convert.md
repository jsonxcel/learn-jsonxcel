---
title: "第一次转换请求"
description: "调用 POST /api/convert：传入 template_name、language 与 JSON 数据源，下载 Excel 或 PDF。"
lesson_id: m01-l02
module: m01
weight: 20
level: beginner
template_name: lesson_m01_first_convert
data_sources: ["ds"]
output_formats: ["excel", "pdf"]

previews:
  template: "/previews/zh-CN/lesson_m01_first_convert/template.png"
  result: "/previews/zh-CN/lesson_m01_first_convert/result.png"
---

## 学习目标

- 拼出合法的 `POST /api/convert` 请求体
- 用 BCP-47 目录名选择 `language`（`en-US`、`zh-CN` 等）
- 在 `output_format: "excel"` 与 `"pdf"` 之间切换
- 理解 `return_file_stream` 控制的流式下载与元数据响应

{{< lesson_demo template_name="lesson_m01_first_convert" >}}

## 前置条件

- JsonXcel.WebServer 已运行（默认 `http://127.0.0.1:5000`）— 可从 [GitHub Releases](https://github.com/jsonxcel/learn-jsonxcel/releases) 下载（`JsonXcel-win-x64.zip` / `JsonXcel-linux-x64.zip`）
- 模板文件位于 `Templates/{language}/lesson_m01_first_convert.xlsx`

## 模板要点

`lesson_m01_first_convert` 是最小工作簿：少量标签与 `{{name}}`、`{{age}}` 一类标记。目的是在学习高级标记前先跑通端到端路径。

> 在模板管道产出 `.xlsx` 之前，把本课的 JSON 与 API 形状视为契约；convert 冒烟属后续阶段。

## JSON 结构说明

```json
{
  "name": "Ada",
  "age": 36,
  "title": "Engineer"
}
```

| 字段 | 说明 |
|------|------|
| `name` | 绑定到表上的文本标记 |
| `age` | 数值示例（格式可留在 Excel） |
| `title` | 若模板定义了对应标记则可选用 |

赋值给 `ds` 前务必先 `JSON.stringify`。

## API 调用示例

### JavaScript（Excel 流）

```javascript
const API = "http://127.0.0.1:5000";

const res = await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m01_first_convert",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({ name: "Ada", age: 36, title: "Engineer" })
  })
});

const blob = await res.blob();
// 浏览器保存为 .xlsx，或在 Node 写入磁盘
```

### curl（同一契约）

```bash
curl -X POST http://127.0.0.1:5000/api/convert \
  -H "Content-Type: application/json" \
  -d "{\"template_name\":\"lesson_m01_first_convert\",\"language\":\"zh-CN\",\"output_format\":\"excel\",\"return_file_stream\":true,\"ds\":\"{\\\"name\\\":\\\"Ada\\\",\\\"age\\\":36}\"}"
```

### PDF

需要打印就绪文件时设 `"output_format": "pdf"`。JSON 契约不变。

## 常见错误

| 错误 | 修正 |
|------|------|
| 请求体里 `ds` 是对象 | 用 `JSON.stringify`，使 `ds` 成为字符串字段 |
| `language` 写错 / 目录缺失 | 与 `Templates/zh-CN/` 等文件夹名完全一致 |
| `template_name` 拼写错误 | 使用 registry 中的名称，**不含** `.xlsx` |
| 以为失败返回 HTML | 失败时返回含 `success`、`error_code`、`error_message` 的 JSON |

## 检查点

你应能解释请求体中每个字段，并知道工作簿文件应放在何处。下一模块开始真正的模板标记。

## 下一步

- 模块 02 — 模板标记入门（发布后）
- 或查阅 `LESSON_REGISTRY.yaml` 大纲
