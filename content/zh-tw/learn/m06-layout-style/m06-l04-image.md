---
title: "圖片欄位"
description: "用 img=true 渲染 Base64 圖片（ka=true 保持比例）。"
lesson_id: m06-l04
module: m06
weight: 40
level: intermediate
template_name: lesson_m06_image
data_sources: ["ds"]
output_formats: ["excel"]

previews:
  template: "/previews/zh-TW/lesson_m06_image/template.png"
  result: "/previews/zh-TW/lesson_m06_image/result.png"
---

## 學習目標

- 在 JSON 中傳 PNG/JPEG 的 Base64
- 單元格寫 `{{ds.logo(img=true, ka=true)}}`
- 用 w/h 定尺寸或保持比例

{{< lesson_demo template_name="lesson_m06_image" >}}

> JSON 中的圖片建議使用 data:image/png;base64,... 字首（純 Base64 在部分環境下會失敗）。

> 轉換時傳入真實 Base64（冒煙使用極小 PNG）。

## 模板要點

支援 byte[] / Base64。簡寫：img、w、h、ka。

## JSON 結構說明

```json
{
  "name": "Acme",
  "logo": "<base64-png>"
}
```

## API 呼叫示例

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

模組 07 — [分頁](../../m07-pagination/)
