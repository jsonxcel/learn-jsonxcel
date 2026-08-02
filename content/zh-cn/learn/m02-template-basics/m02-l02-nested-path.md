---
title: "嵌套对象与数组扩展"
description: "用点路径访问嵌套 JSON，并用集合字段扩展数组行。"
lesson_id: m02-l02
module: m02
weight: 20
level: beginner
template_name: lesson_m02_nested_path
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m02_nested_path/template.png"
  result: "/previews/zh-CN/lesson_m02_nested_path/result.png"
---

## 学习目标

- 用 `{{ds.buyer.address.city}}` 一类点路径绑定嵌套属性
- 用 `{{ds.items.sku}}` 一类集合字段扩展数组行
- 明确 `items.0.sku` 这类数字下标 **不是** 引擎路径 — 版式控制见扩展（模块 04）

{{< lesson_demo template_name="lesson_m02_nested_path" >}}

## 模板要点

`lesson_m02_nested_path` 演示在单个 `ds` 对象内做路径导航：

| 标记 | 解析到 |
|------|--------|
| `{{ds.buyer.name}}` | 嵌套对象字段 |
| `{{ds.buyer.address.city}}` | 更深一层 |
| `{{ds.items.sku}}` | SKU 列 — 按数组元素扩展行 |
| `{{ds.items.qty}}` | 数量列 — 与同一集合一起扩展 |

把集合标记放在模板的一行上，引擎会插入更多行。更细的扩展选项见模块 04。

> 模板文件在 P05 产出。缺少 `.xlsx` 不改变本课教授的 JSON 契约。

## JSON 结构说明

```json
{
  "buyer": {
    "name": "Contoso Ltd",
    "address": {
      "city": "Seattle",
      "country": "US"
    }
  },
  "items": [
    { "sku": "A-100", "qty": 2, "price": 40 },
    { "sku": "B-200", "qty": 1, "price": 120 }
  ]
}
```

| 路径 | 示例值 |
|------|--------|
| `buyer.name` | `"Contoso Ltd"` |
| `buyer.address.city` | `"Seattle"` |
| `items[].sku` | `"A-100"`, `"B-200"`（经扩展） |
| `items[].qty` | `2`, `1` |

## API 调用示例

```javascript
const API = "http://127.0.0.1:5000";

const payload = {
  buyer: {
    name: "Contoso Ltd",
    address: { city: "Seattle", country: "US" }
  },
  items: [
    { sku: "A-100", qty: 2, price: 40 },
    { sku: "B-200", qty: 1, price: 120 }
  ]
};

await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m02_nested_path",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify(payload)
  })
});
```

## 常见错误

| 错误 | 修正 |
|------|------|
| 单元格写成 `buyer[address][city]` 风格 | 使用引擎支持的点路径标记（`{{buyer.address.city}}`） |
| 下标超出数组长度 | 保证 JSON 始终提供这些槽位，或改版式 |
| 只用下标试图循环多行 | 学习模块 04 的扩展 |
| 按语言重命名嵌套键 | 路径保持一致；本地化写在 Excel 标签上 |

## 下一步

- [表达式与公式单元格](../m02-l03-expression/)（下一批）
- 或复习 [Mustache 字段标记](../m02-l01-mustache/)
