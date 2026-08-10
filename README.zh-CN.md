# JsonXcel 教程（Learn）

面向 **[JsonXcel](https://www.jsonxcel.com/)** 的动手教程——用 JSON 数据与 Excel 模板，通过 `POST /api/convert` 生成 Excel 或 PDF。

本仓库同时是：

- 一条**多语言学习路径**（9 个模块 · 30+ 课时），以及
- 一个可本地运行或发布的 **Hugo 网站**（例如 GitHub Pages）。

**语言：** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

---

## 链接

| | |
|---|---|
| 在线教程站 | [learn.jsonxcel.com](https://learn.jsonxcel.com/) |
| 产品 / 文档 | [www.jsonxcel.com](https://www.jsonxcel.com/) |
| 本仓库 | [github.com/jsonxcel/learn-jsonxcel](https://github.com/jsonxcel/learn-jsonxcel) |
| 服务端下载 | [Releases](https://github.com/jsonxcel/learn-jsonxcel/releases) |

---

## 下载 JsonXcel 服务端

课时演示需要本地或托管的 **JsonXcel.WebServer**。预编译包发布在 GitHub Releases（后续会增加更多平台）。

| 平台 | 包名 | 下载 |
|------|------|------|
| Windows x64 | `JsonXcel-win-x64.zip` | [最新版](https://github.com/jsonxcel/learn-jsonxcel/releases/latest/download/JsonXcel-win-x64.zip) |
| Linux x64 | `JsonXcel-linux-x64.zip` | [最新版](https://github.com/jsonxcel/learn-jsonxcel/releases/latest/download/JsonXcel-linux-x64.zip) |

全部版本：<https://github.com/jsonxcel/learn-jsonxcel/releases>

解压后启动服务（默认 `http://127.0.0.1:5000`），将课时模板放到 `Templates/{language}/`，再打开课时页面使用「生成 Excel」。

> 上表文件名即「最新版」直链约定。发布 Release 时请使用**完全相同**的附件名（或同步修改本 README 与 `hugo.toml` 中的链接）。

---

## 浏览教程

站点运行后或线上访问：

- English: `/en/learn/`
- 简体中文: `/zh-cn/learn/`
- 繁體中文: `/zh-tw/learn/`
- 日本語: `/ja/learn/`
- 한국어: `/ko/learn/`

技术正文以 **英文** 与 **简体中文** 为主；其他语言共用相同的标记、JSON 键与 `template_name`。

---

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

---

## 仓库结构

```text
content/{lang}/learn/       # 课时 Markdown
assets/templates/{BCP-47}/  # lesson_*.xlsx
assets/samples/{BCP-47}/    # 演示用 JSON
assets/previews/{BCP-47}/   # template.png + result.png
hugo.toml                   # 站点配置（baseURL、API、官网链接、下载）
```

资源目录 BCP-47：`en-US`、`zh-CN`、`zh-TW`、`ja-JP`、`ko-KR`。

---

## 相关

- 产品站与 API 文档：[www.jsonxcel.com](https://www.jsonxcel.com/)
- 维护者 / 单体仓库说明：[DEVELOPING.md](DEVELOPING.md)

---

## 许可

详见仓库发布后的 `LICENSE`。教程内容与示例工作簿供学习 JsonXcel 使用。
