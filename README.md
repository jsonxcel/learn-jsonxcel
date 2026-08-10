# JsonXcel Learn

Hands-on tutorials for **[JsonXcel](https://www.jsonxcel.com/)** — turn JSON data and Excel templates into Excel or PDF through `POST /api/convert`.

This repository is both:

- a **multilingual learning path** (9 modules · 30+ lessons), and
- a **Hugo site** you can run locally or publish (for example to GitHub Pages).

**Languages:** [English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md) · [한국어](README.ko.md)

---

## Links

| | |
|---|---|
| Live Learn site | [learn.jsonxcel.com](https://learn.jsonxcel.com/) |
| Product / docs | [www.jsonxcel.com](https://www.jsonxcel.com/) |
| This repo | [github.com/jsonxcel/learn-jsonxcel](https://github.com/jsonxcel/learn-jsonxcel) |
| Server downloads | [Releases](https://github.com/jsonxcel/learn-jsonxcel/releases) |

---

## Download JsonXcel server

Lesson demos call a local or hosted **JsonXcel.WebServer**. Prebuilt packages are published on GitHub Releases (more platforms will be added later).

| Platform | Package | Download |
|----------|---------|----------|
| Windows x64 | `JsonXcel-win-x64.zip` | [Latest](https://github.com/jsonxcel/learn-jsonxcel/releases/latest/download/JsonXcel-win-x64.zip) |
| Linux x64 | `JsonXcel-linux-x64.zip` | [Latest](https://github.com/jsonxcel/learn-jsonxcel/releases/latest/download/JsonXcel-linux-x64.zip) |

All versions: <https://github.com/jsonxcel/learn-jsonxcel/releases>

After unpacking, start the server (default `http://127.0.0.1:5000`), sync or copy lesson templates into its `Templates/{language}/` folders, then open a lesson and use **Generate Excel**.

> Release asset names above are the contract for “latest” links. When you publish a Release, attach files with **exactly** these names (or update the links in this README and in `hugo.toml`).

---

## Browse the tutorials

Start here once the site is running or online:

- English: `/en/learn/`
- 简体中文: `/zh-cn/learn/`
- 繁體中文: `/zh-tw/learn/`
- 日本語: `/ja/learn/`
- 한국어: `/ko/learn/`

Primary technical prose is **English** and **简体中文**. Other locales share the same markers, JSON keys, and `template_name` values.

---

## Run this Hugo site locally

Requirements: [Hugo Extended](https://gohugo.io/installation/) (0.120+ recommended), Node.js 20+ (theme CSS).

```bash
# Theme CSS (once, or when styles change)
cd hugo-theme-ete   # or ../hugo_template/hugo-theme-ete in the monorepo layout
npm install
npm run build:css

# From the tutorial site root (this directory)
hugo server -D --port 1313
# Open e.g. http://localhost:1313/en/learn/
```

Do **not** open `public/index.html` via `file://` — Hugo sites need an HTTP server, and the root page redirects into a language subdirectory (`/en/`, …).

Build for deployment (set your real public URL):

```bash
hugo --minify -b https://learn.jsonxcel.com/
# or GitHub Pages, e.g. https://jsonxcel.github.io/learn-jsonxcel/
```

---

## Repository layout

```text
content/{lang}/learn/       # lesson Markdown
assets/templates/{BCP-47}/  # lesson_*.xlsx
assets/samples/{BCP-47}/    # sample JSON for demos
assets/previews/{BCP-47}/   # template.png + result.png
hugo.toml                   # site config (baseURL, API, product link, downloads)
```

BCP-47 asset folders: `en-US`, `zh-CN`, `zh-TW`, `ja-JP`, `ko-KR`.

---

## Related

- Product site & API docs: [www.jsonxcel.com](https://www.jsonxcel.com/)
- Maintainer / monorepo notes: [DEVELOPING.md](DEVELOPING.md)

---

## License

See the repository `LICENSE` file when published. Tutorial content and sample workbooks are provided for learning JsonXcel.
