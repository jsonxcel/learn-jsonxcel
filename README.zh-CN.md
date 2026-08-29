# JsonXcel

**自托管 Excel 模板引擎。JSON 进去，Excel / PDF 出来。**

JsonXcel 用一次 `POST /api/convert`，把多语言 Excel 模板和 JSON 绑在一起。版式留在 Excel，数据留在你的网络。

**语言：** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

![30 秒演示：销售订单 Excel 模板 + JSON → 生成工作簿](docs/media/json-in-excel-out.gif)

## 从这里开始

| | |
|---|---|
| 产品官网 | [jsonxcel.com/zh-cn/](https://www.jsonxcel.com/zh-cn/) |
| 教程 Learn | [jsonxcel.com/zh-cn/learn/](https://www.jsonxcel.com/zh-cn/learn/) |
| 下载 | [jsonxcel.com/zh-cn/download/](https://www.jsonxcel.com/zh-cn/download/) |

本仓库是 **Learn** 教程站（9 个模块 · 30+ 课时）。GitHub Pages 镜像：[jsonxcel.github.io/learn-jsonxcel/zh-cn/](https://jsonxcel.github.io/learn-jsonxcel/zh-cn/)。英文入口见 [jsonxcel.com/en/](https://www.jsonxcel.com/en/)、[/en/learn/](https://www.jsonxcel.com/en/learn/)、[/en/download/](https://www.jsonxcel.com/en/download/)。

## 快速上手

本地运行 **JsonXcel.WebServer**（默认 `http://127.0.0.1:5000`），把工作簿放到 `Templates/{language}/`，然后转换：

```javascript
const res = await fetch("http://127.0.0.1:5000/api/convert", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    template_name: "lesson_m01_first_convert",
    language: "zh-CN",
    output_format: "excel",
    return_file_stream: true,
    ds: JSON.stringify({ name: "Ada", age: 36 })
  })
});
const blob = await res.blob(); // 存成 .xlsx
```

同样的请求用 curl：

```bash
curl -X POST http://127.0.0.1:5000/api/convert \
  -H "Content-Type: application/json" \
  -d "{\"template_name\":\"lesson_m01_first_convert\",\"language\":\"zh-CN\",\"output_format\":\"excel\",\"return_file_stream\":true,\"ds\":\"{\\\"name\\\":\\\"Ada\\\",\\\"age\\\":36}\"}"
```

`ds` 必须是 **JSON 字符串**（先 `JSON.stringify`），不能在请求体里嵌套对象。需要印刷件时把 `output_format` 改成 `"pdf"`。上面的 GIF 用的是 [销售订单](https://jsonxcel.github.io/learn-jsonxcel/zh-cn/learn/m09-practical/m09-l01-sales-order/) 课时——同一套契约，模板更完整。

## 许可

每个版本都是**完整产品**。许可只决定导出是否带未授权标记，以及密钥有效期。

| 版本 | 价格 | 导出 |
|---|---|---|
| **Unlicensed（未授权）** | 免费下载 | 功能完整。Excel 多一个未授权 sheet；PDF 页头有未授权提示 |
| **1-month licensed（评估）** | 免费领码 | 无未授权标记。绑一台设备码，一个月到期 |
| **Lifetime licensed（终身）** | **$900** 一次 | 无未授权标记。绑一台设备码；换机需新密钥 |

领码与购买见 [定价](https://www.jsonxcel.com/zh-cn/pricing/)。数字商品：终身密钥签发后不退款。

## 下载 JsonXcel.WebServer

预编译自包含包（不要求安装 .NET SDK）：

| 平台 | 包名 | 下载 |
|------|------|------|
| Windows x64 | `JsonXcel-win-x64.zip` | [最新版](https://github.com/jsonxcel/learn-jsonxcel/releases/latest/download/JsonXcel-win-x64.zip) |
| Linux x64 | `JsonXcel-linux-x64.zip` | [最新版](https://github.com/jsonxcel/learn-jsonxcel/releases/latest/download/JsonXcel-linux-x64.zip) |

全部版本：<https://github.com/jsonxcel/learn-jsonxcel/releases>

解压后启动服务，将课时模板放到 `Templates/{language}/`，再打开课时页面使用「生成 Excel」。

> 上表文件名即「最新版」直链约定。发布 Release 时请使用**完全相同**的附件名（或同步修改本 README 与 `hugo.toml` 中的链接）。

## 浏览教程

- English: `/en/learn/`
- 简体中文: `/zh-cn/learn/`
- 繁體中文: `/zh-tw/learn/`
- 日本語: `/ja/learn/`
- 한국어: `/ko/learn/`

技术正文以 **英文** 与 **简体中文** 为主；其他语言共用相同的标记、JSON 键与 `template_name`。

## 本地运行本 Hugo 站

需要：[Hugo Extended](https://gohugo.io/installation/)（建议 0.120+）、Node.js 20+（主题 CSS）。

```bash
# 主题 CSS（首次或样式变更时）
cd hugo-theme-ete   # 单体仓库中多为 ../hugo_template/hugo-theme-ete
npm install
npm run build:css

# 在教程站根目录（本目录）
hugo server -D --port 1313
# 例如打开 http://localhost:1313/zh-cn/learn/
```

请勿用 `file://` 直接打开 `public/index.html`——需要 HTTP 服务，且根页会跳转到语言子目录（`/en/`、`/zh-cn/` 等）。

部署构建（换成真实公网地址）：

```bash
hugo --minify -b https://learn.jsonxcel.com/
# 或 GitHub Pages，例如 https://jsonxcel.github.io/learn-jsonxcel/
```

## 仓库结构

```text
content/{lang}/learn/       # 课时 Markdown
assets/templates/{BCP-47}/  # lesson_*.xlsx
assets/samples/{BCP-47}/    # 演示用 JSON
assets/previews/{BCP-47}/   # template.png + result.png
docs/media/                 # README 演示 GIF
hugo.toml                   # 站点配置（baseURL、API、官网链接、下载）
```

资源目录 BCP-47：`en-US`、`zh-CN`、`zh-TW`、`ja-JP`、`ko-KR`。

## 相关

- 产品站与 API 文档：[www.jsonxcel.com](https://www.jsonxcel.com/)
- 维护者 / 单体仓库说明：[DEVELOPING.md](DEVELOPING.md)

教程内容与示例工作簿供学习 JsonXcel 使用。引擎本身是商业软件（见上方[许可](#许可)）。
