# hugo-theme-ete

Production-oriented Hugo theme for developer tools / enterprise software. First demo product: **JsonXcel**.

## Requirements

- Hugo **v0.164+** (this machine: `D:\Programs\Hugo\hugo.exe`)
- Node.js 18+ (Tailwind CSS build)
- Theme CSS is compiled with npm (does not require Hugo Extended PostCSS)

## Quick start (exampleSite)

```powershell
cd commercial_website\hugo_template\hugo-theme-ete
npm install
npm run build:css

cd exampleSite
D:\Programs\Hugo\hugo.exe server
```

Open http://localhost:1313/en/

## Customize the marketing homepage

Home sections are wired in `layouts/index.html` and rendered by `layouts/partials/home/*`.

| What to change | Where |
|----------------|--------|
| Section order | `layouts/index.html` |
| Structure (feature ids, FAQ ids, tiers) | `data/home.yaml` |
| All visible copy | `i18n/*.toml` (`hero_*`, `feature_*`, `pricing_*`, …) |
| Product name in chrome / hero eyebrow | `params.brand` in site config |
| Convert code sample | `layouts/partials/home/code-sample.html` |
| Illustrations | `layouts/partials/illustrations/*` |

Colors / fonts: edit `tailwind.config.js`, then `npm run build:css`.

## Locale map (API / template folders)

| Hugo lang | UI label | BCP-47 (`params.localeMap`) |
|-----------|----------|------------------------------|
| en | English | en-US |
| zh-cn | 中文 (简体) | zh-CN |
| zh-tw | 中文 (繁體) | zh-TW |
| ja | 日本語 | ja-JP |
| ko | 한국어 | ko-KR |

Configured as `params.localeMap` in `exampleSite/hugo.toml`. Product name **JsonXcel** stays untranslated.

### Language switcher behavior

1. Prefer the translated version of the **current page** (same path in the target language).
2. Else the translated **current section** (e.g. `/docs/` when deep EN-only pages have no twin).
3. Else that language’s **home**.

`hreflang` alternates are emitted in `<head>` for discovery. Deep English docs/blog posts may not have full translations yet — non-English docs roots link to a localized Quickstart plus English deep pages (documented limitation).

### i18n keys

All chrome / marketing / docs / blog UI strings live in `i18n/{en,zh-cn,zh-tw,ja,ko}.toml`. Do not hardcode user-visible sentences in `layouts/` (technical defaults like `type|default "info"` or API URLs are allowed).

## Milestone status

- [x] Milestone 0 — scaffold
- [x] Milestone 1 — full marketing home (`../1002.md`)
- [x] Milestone 2 — docs system (`../1003.md`)
- [x] Milestone 3 — blog (`../1004.md`)
- [x] Milestone 4 — i18n polish (`../1005.md`)

## How to add a docs page

1. Put Markdown under `exampleSite/content/{lang}/docs/...` (or consumer site `content/{lang}/docs/...`).
2. Section `_index.md` files need `type: docs` (cascade from the docs root is fine).
3. Set `weight` for sidebar order; optional `level`, `lesson_id`, `template_name`.
4. Shortcodes:
   - **Callouts:** `note`, `warning`, `tip`, or `callout type="tip"`
   - **Tabs:** delimiter panels (nested tab shortcodes are not supported):

```markdown
{{</* tabs */>}}
=== curl
curl example here
=== powershell
powershell example here
{{</* /tabs */>}}
```

   - **Mermaid:** `{{</* mermaid */>}} flowchart LR … {{</* /mermaid */>}}`
   - **Demo stub:** `{{</* lesson_demo template_name="…" */>}}`

5. Code fences get a Copy button automatically via the codeblock render hook.
6. Client search indexes docs titles/descriptions into `window.ETE_DOCS_INDEX` (Alpine `docsSearch` in the docs toolbar).

Docs chrome: left sidebar (collapsible on mobile), article + prev/next, desktop TOC, version stub (`params.docs.version`).

## How to write a blog post

1. Add Markdown under `exampleSite/content/{lang}/blog/your-slug.md`.
2. Front matter fields:

```yaml
title: "…"
description: "…"
date: 2026-07-01T10:00:00+08:00
categories: ["API"]
tags: ["api", "convert"]
series: ["Getting started with JsonXcel"]
```

3. Taxonomies (`categories`, `tags`, `series`) are configured in `exampleSite/hugo.toml`. Term pages appear under `/categories/`, `/tags/`, `/series/`.
4. Related posts use Hugo `.Related` (series/tags/categories) with a same-section fallback.
5. Reading time uses Hugo `.ReadingTime`. Single posts emit Open Graph, Twitter Card, and `BlogPosting` JSON-LD (image optional — graceful degrade).
6. Section RSS: `/en/blog/index.xml`.

Layouts: `layouts/blog/{list,single}.html`, taxonomy templates under `layouts/_default/`, SEO partials in `layouts/partials/seo/`.

## Home sections (M1)

1. Hero  
2. Trusted by (logo wall)  
3. Features  
4. Architecture  
5. Code example (`/api/convert`)  
6. Screenshot gallery (SVG tabs)  
7. Comparison table  
8. Testimonials  
9. FAQ  
10. Pricing  
11. Final CTA (+ site footer)

## Params

| Param | Purpose |
|-------|---------|
| `brand` | Product name in chrome |
| `apiBaseUrl` | JsonXcel WebServer base URL |
| `localeMap` | Hugo lang → API language |
| `siteKind` | `commercial` \| `tutorial` (consumer sites) |

## Scripts

Alpine is **vendored** at `assets/js/alpine.min.js` (not loaded from jsDelivr) to avoid browser Tracking Prevention blocking the CDN.

Load order is intentional: `main.js` (registers `eteShell` on `alpine:init`) → then `alpine.min.js`.

Language switcher uses a native `<select data-lang-switch>` (see `main.js`) so the OS dropdown is not clipped by the header, and Hugo `--minify` cannot break navigation.

## Known limitations

- Blog posts and most deep docs pages are English-first; other locales ship chrome + home + docs/blog/learn/pricing entries + localized Quickstart.
- `zh-tw` UI strings are Traditional Chinese; content must not be Simplified paste.
- Lesson bodies / xlsx assets live in the commercial `tutorial/` package (not this theme).
- Mermaid loads from jsDelivr ESM only when a page contains `.mermaid`.
- Lighthouse ≥ 95 not formally measured in CI for this milestone.

## License

MIT
