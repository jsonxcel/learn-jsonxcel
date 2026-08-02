---
title: "响应选项（stream / metadata）"
description: "用 return_file_stream 及相关标志控制直接下载字节或返回 JSON 元数据。"
lesson_id: m03-l04
module: m03
weight: 40
level: beginner
template_name: lesson_m03_single_ds
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m03_single_ds/template.png"
  result: "/previews/zh-CN/lesson_m03_single_ds/result.png"
---

## 学习目标

- 使用 `return_file_stream: true` 直接下载文件
- 使用 `return_file_stream: false`（及相关标志）走 JSON 元数据流程
- 复用 `lesson_m03_single_ds` —— 本课讲 **API 响应形态**，不是新标记

{{< lesson_demo template_name="lesson_m03_single_ds" >}}

## 模板要点

没有新标记。模板与 [单数据源 ds](../m03-l01-single-ds/) 相同。关注 JsonXcel.WebServer 常用请求标志：

| 标志 | 典型效果 |
|------|----------|
| `return_file_stream` | `true` → 文件字节；`false` → JSON 信封 |
| `return_file_name` | 在元数据 / 头中包含生成文件名 |
| `return_file_size` | 元数据模式时包含大小 |
| `return_file_path` | 服务器路径 —— 公开演示通常 **关闭** |

头与正文的具体落点以当前 WebServer 版本为准 —— 查阅对应构建的 Convert API 文档。

## JSON 结构说明

复用单数据源文档：

```json
{
  "reportTitle": "Weekly inventory",
  "warehouse": "WH-East",
  "asOf": "2026-07-16",
  "lines": [
    { "sku": "A-100", "onHand": 40 },
    { "sku": "B-200", "onHand": 12 }
  ]
}
```

## API 调用示例

### 流式下载

```javascript
const API = "http://127.0.0.1:5000";
const ds = JSON.stringify({
  reportTitle: "Weekly inventory",
  warehouse: "WH-East",
  asOf: "2026-07-16",
  lines: [
    { sku: "A-100", onHand: 40 },
    { sku: "B-200", onHand: 12 }
  ]
});

const res = await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m03_single_ds",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds
  })
});
const blob = await res.blob();
```

### 元数据模式

```javascript
const res = await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m03_single_ds",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: false,
    return_file_name: true,
    return_file_size: true,
    return_file_path: false,
    ds
  })
});
const meta = await res.json();
// meta 可能包含 success、file_name、file_size 等
```

## 常见错误

| 错误 | 修正 |
|------|------|
| 流模式下按 JSON 解析 | 读取 `blob` / 字节 |
| 在公开站点打开 `return_file_path` | 路径保持私有；用自有管线存文件 |
| 忽略 `success: false` 信封 | 在客户端映射 `error_code` / `error_message` |
| 以为需要新模板 | 复用 `lesson_m03_single_ds` |

## 模块检查点

你已能选择数据源、输出格式与响应模式。模块 04 开始列表扩展。

## 下一步

- 模块 04 — [单元格扩展（列表展开）](../../m04-expansion-context/m04-l01-expansion/)（后续批次）
