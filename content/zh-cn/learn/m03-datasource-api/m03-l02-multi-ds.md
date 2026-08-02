---
title: "多数据源 ds + ds01"
description: "当载荷来自不同服务时，用 ds 与 ds01 绑定工作簿中的不同区域。"
lesson_id: m03-l02
module: m03
weight: 20
level: beginner
template_name: lesson_m03_multi_ds
data_sources: ["ds", "ds01"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m03_multi_ds/template.png"
  result: "/previews/zh-CN/lesson_m03_multi_ds/result.png"
---

## 学习目标

- 将 `ds` 与 `ds01` 作为两个独立的 JSON **字符串**发送
- 使模板区域与正确的数据源序号对齐（按引擎命名）
- 判断何时该用多数据源，何时应合并为一份嵌套文档

{{< lesson_demo template_name="lesson_m03_multi_ds" >}}

## 模板要点

`lesson_m03_multi_ds` 使用两份载荷：

| 字段 | 典型区域 |
|------|----------|
| `ds` | 订单 / 表头块 |
| `ds01` | 公司资料、术语表，或另一 API 的列表 |

模板设计者在工作簿里把各区块接到数据源（引擎特定的模板选项）。作为 API 调用方你只需：

1. 分别 stringify 每份载荷。
2. 保持形状稳定，便于任一服务单独发版。
3. 每次 convert 都带上两者 —— 若模板需要该源，不要省略（可按情况传 `"{}"` 或 `"[]"`）。

> 两部分总是一起下发时，优先用单个 `ds` 文档。多数据源适合团队或后端已经拆分的场景。

## JSON 结构说明

**`ds` — 订单表头**

```json
{
  "orderNo": "SO-10042",
  "customer": "Northwind Traders",
  "orderDate": "2026-07-16"
}
```

**`ds01` — 公司信息块**

```json
{
  "legalName": "Northwind Holdings LLC",
  "taxId": "US-98-7654321",
  "supportEmail": "ops@northwind.example"
}
```

## API 调用示例

```javascript
const API = "http://127.0.0.1:5000";

const order = {
  orderNo: "SO-10042",
  customer: "Northwind Traders",
  orderDate: "2026-07-16"
};

const company = {
  legalName: "Northwind Holdings LLC",
  taxId: "US-98-7654321",
  supportEmail: "ops@northwind.example"
};

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m03_multi_ds",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify(order),
    ds01: JSON.stringify(company)
  })
});
```

## 常见错误

| 错误 | 修正 |
|------|------|
| 把 `ds01` 嵌进 `ds` 字符串里 | 请求上两个顶层字符串字段 |
| 两份载荷对调 | 对照模板的数据源映射 |
| 需要时却不传 `ds01` | 始终传字符串（至少 `"{}"`） |
| 两份里复制同一对象 | 只在真实边界处拆分 |

## 下一步

- [输出 Excel vs PDF](../m03-l03-output-formats/)（下一批）
