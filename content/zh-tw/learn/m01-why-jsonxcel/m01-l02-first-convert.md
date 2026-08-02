---
title: "第一次轉換請求"
description: "呼叫 POST /api/convert：傳入 template_name、language 與 JSON 資料來源，下載 Excel 或 PDF。"
lesson_id: m01-l02
module: m01
weight: 20
level: beginner
template_name: lesson_m01_first_convert
data_sources: ["ds"]
output_formats: ["excel", "pdf"]

previews:
  template: "/previews/zh-TW/lesson_m01_first_convert/template.png"
  result: "/previews/zh-TW/lesson_m01_first_convert/result.png"
---

## 學習目標

- 拼出合法的 `POST /api/convert` 請求體
- 用 BCP-47 目錄名選擇 `language`（`en-US`、`zh-CN` 等）
- 在 `output_format: "excel"` 與 `"pdf"` 之間切換
- 理解 `return_file_stream` 控制的流式下載與後設資料響應

{{< lesson_demo template_name="lesson_m01_first_convert" >}}

## 前置條件

- JsonXcel.WebServer 已執行（預設 `http://127.0.0.1:5000`）
- P05 完成後存在 `Templates/{language}/lesson_m01_first_convert.xlsx`

## 模板要點

`lesson_m01_first_convert` 是最小工作簿：少量標籤與 `{{name}}`、`{{age}}` 一類標記。目的是在學習高階標記前先跑通端到端路徑。

> 在模板管道產出 `.xlsx` 之前，把本課的 JSON 與 API 形狀視為契約；convert 冒煙屬後續階段。

## JSON 結構說明

```json
{
  "name": "Ada",
  "age": 36,
  "title": "Engineer"
}
```

| 欄位 | 說明 |
|------|------|
| `name` | 繫結到表上的文字標記 |
| `age` | 數值示例（格式可留在 Excel） |
| `title` | 若模板定義了對應標記則可選用 |

賦值給 `ds` 前務必先 `JSON.stringify`。

## API 呼叫示例

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

### curl（同一契約）

```bash
curl -X POST http://127.0.0.1:5000/api/convert \
  -H "Content-Type: application/json" \
  -d "{\"template_name\":\"lesson_m01_first_convert\",\"language\":\"zh-CN\",\"output_format\":\"excel\",\"return_file_stream\":true,\"ds\":\"{\\\"name\\\":\\\"Ada\\\",\\\"age\\\":36}\"}"
```

### PDF

需要列印就緒檔案時設 `"output_format": "pdf"`。JSON 契約不變。

## 常見錯誤

| 錯誤 | 修正 |
|------|------|
| 請求體裡 `ds` 是物件 | 用 `JSON.stringify`，使 `ds` 成為字串欄位 |
| `language` 寫錯 / 目錄缺失 | 與 `Templates/zh-CN/` 等資料夾名完全一致 |
| `template_name` 拼寫錯誤 | 使用 registry 中的名稱，**不含** `.xlsx` |
| 以為失敗返回 HTML | 失敗時返回含 `success`、`error_code`、`error_message` 的 JSON |

## 檢查點

你應能解釋請求體中每個欄位，並知道工作簿檔案應放在何處。下一模組開始真正的模板標記。

## 下一步

- 模組 02 — 模板標記入門（釋出後）
- 或查閱 `LESSON_REGISTRY.yaml` 大綱
