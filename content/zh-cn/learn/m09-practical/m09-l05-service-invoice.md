---
title: "简单服务发票"
description: "从 Target 目标效果反推 Template：内联标记、公式模板与 FM=overwrite。"
lesson_id: m09-l05
module: m09
weight: 50
level: intermediate
template_name: lesson_m09_service_invoice
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-CN/lesson_m09_service_invoice/template.png"
  result: "/previews/zh-CN/lesson_m09_service_invoice/result.png"
---

## 学习目标

- 先读 **Target**（目标效果），再设计 **Template** 标记
- 使用内联标记、公式模板 `{{==...}}`、明细区 `FM=overwrite`
- 掌握设计稿三表命名：`Template` / `Target` / `Description`

{{< lesson_demo template_name="lesson_m09_service_invoice" >}}

## 设计思路：从 Target 到 Template

本课工作簿按约定包含三张表（下载模板即可对照）：

| 工作表 | 作用 |
|--------|------|
| **Template** | 引擎模板（预览首表；转换读写此表） |
| **Target** | 填好的「成品」样例，版式与字段一目了然 |
| **Description** | 本模板用到的语法备忘（表内勿写真实 `{{` 标记，否则会被引擎解析） |

制作步骤建议：

1. **拆区块**（看 Target）  
   开票方信息、发票号/日期、受票方、明细表、小计/税/总计、页脚联系人。
2. **定 JSON 契约**  
   标量进根对象；明细进数组 `invoiceitem`（`description` / `qty` / `unitprice`）。
3. **写标记**（改 Template）  
   把 Target 里会变的单元格换成 `{{ds....}}`；金额列用公式模板，而不是把计算结果写进 JSON。
4. **选填充模式**  
   发票明细区版式固定（预留多行），用 `FM=overwrite` 覆盖写入，避免插行破坏下方「小计」区域。

## 模板要点（对照 Target）

### 1. 标量与内联标记

Target 中「电话：(123) 456-7890」在 Template 写成：

```text
电话：{{ds.issuer_telephone}}
```

静态文案与标记可在同一单元格（内联模板）。发票号、日期、受票方字段同理，使用整格标记，例如 `{{ds.invoice_number}}`。

### 2. 明细行 + overwrite

Target 第 16–18 行是三条明细。Template 只在**第一行明细**放集合标记：

```text
A16  {{ds.invoiceitem.description(FM=overwrite)}}
F16  {{ds.invoiceitem.qty}}
G16  {{ds.invoiceitem.unitprice}}
```

`FM=overwrite`：不插入新行，向下覆盖已有空白明细行，保留边框与「金额」列公式样式。明细条数不要超过预留行数（本模板约到第 30 行）。

### 3. 公式模板（双等号）

行金额、小计、税费、总计在 Target 里是计算结果；在 Template 用公式模板，让引擎在扩展后生成真正的 Excel 公式：

```text
H16  {{==IF(F16="",ROUND(1*G16,2),ROUND(F16*G16,2))}}
H31  {{==SUM(H16:H30)}}
H33  {{==H31*H32}}
H34  {{==H31+H33}}
```

扩展后引用会随填充调整。税率 `H32` 可留在表内为常量（本样例 `4.250%`），不必进 JSON。

### 4. 调试模式（可选）

名称管理器中的 `TemplateOptions.DebugMode`：设计时设为 `TRUE` 可在同一工作簿对照模板与结果；本课线上转换使用 `FALSE`。详见 **Description** 表。

## JSON 结构说明

与 Target 样例数据对齐的契约：

```json
{
  "issuer_companyname": "星辰咨询有限公司",
  "issuer_address2": "创新大道 88 号",
  "issuer_address1": "广东省深圳市南山区 518057",
  "issuer_telephone": "(123) 456-7890",
  "invoice_number": "2034",
  "invoice_date": "2018-02-21",
  "payee_name": "陈晓",
  "invoice_customerid": "564",
  "invoice_clause": "收到后付款",
  "payee_companyname": "广域贸易有限公司",
  "payee_address2": "中山路 100 号",
  "payee_address1": "广东省广州市天河区 510000",
  "payee_telephone": "(020) 8888-0000",
  "payee_email": "billing@wideworld.example",
  "invoiceitem": [
    {"description": "服务费用", "qty": 1, "unitprice": 200},
    {"description": "人工：75 美元/小时，5 小时", "qty": 5, "unitprice": 75},
    {"description": "新客户折扣", "qty": null, "unitprice": -50}
  ],
  "contact": "李敏、(0755) 123-4567、support@star.example"
}
```

| Target 区域 | JSON / 标记 |
|-------------|-------------|
| 开票方公司/地址/电话 | `issuer_*` |
| 发票编号、日期、条款、客户 ID | `invoice_*` |
| 受票方 | `payee_*` |
| 明细说明/数量/单价 | `invoiceitem[]` |
| 页脚联系人 | `contact` |
| 金额、小计、税、总计 | Excel 公式模板（不进 JSON） |

## API 调用示例

```javascript
const API = "http://127.0.0.1:5000";
await fetch(`${API}/api/convert`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m09_service_invoice",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({
      issuer_companyname: "星辰咨询有限公司",
      issuer_address2: "创新大道 88 号",
      issuer_address1: "广东省深圳市南山区 518057",
      issuer_telephone: "(123) 456-7890",
      invoice_number: "2034",
      invoice_date: "2018-02-21",
      payee_name: "陈晓",
      invoice_customerid: "564",
      invoice_clause: "收到后付款",
      payee_companyname: "广域贸易有限公司",
      payee_address2: "中山路 100 号",
      payee_address1: "广东省广州市天河区 510000",
      payee_telephone: "(020) 8888-0000",
      payee_email: "billing@wideworld.example",
      invoiceitem: [
        { description: "服务费用", qty: 1, unitprice: 200 },
        { description: "人工：75 美元/小时，5 小时", qty: 5, unitprice: 75 },
        { description: "新客户折扣", qty: null, unitprice: -50 }
      ],
      contact: "李敏、(0755) 123-4567、support@star.example"
    })
  })
});
```

## 相关课程

- [Mustache 字段标记](../../m02-template-basics/m02-l01-mustache/)
- [填充模式（overflow / overwrite）](../../m04-expansion-context/m04-l04-fillmode/)
- [表达式与公式](../../m02-template-basics/m02-l03-expression/)

## 下一步

返回 [实战样例](../) 或继续复习 [发货单](../m09-l04-shipping/)。
