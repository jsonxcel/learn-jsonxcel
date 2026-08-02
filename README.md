# JsonXcel Learn (SSOT)

Independent Hugo tutorial site for **JsonXcel** — JSON data sources into multilingual Excel templates via `POST /api/convert`.

This directory is the **single source of truth**. The commercial site copies `/learn` at build time (`scripts/sync_learn_for_site.ps1`) and mounts the same `assets/` (templates, samples, previews).

Brand home: link back to the commercial site (`params.commercialSiteURL` in `hugo.toml`).

## Quick start

```powershell
# Theme CSS (once / when styles change)
cd commercial_website\hugo_template\hugo-theme-ete
npm install
npm run build:css

# Tutorial server (Learn SSOT — this site has /learn, not /docs)
cd ..\..\tutorial
D:\Programs\Hugo\hugo.exe server -D --port 1313
# Open the URL Hugo prints (e.g. http://localhost:1313/en/learn/)
```

> **Why not just open `public/index.html`?** Hugo builds an HTTP-served site, not a flat file tree — double-clicking `public/index.html` (file://) breaks theme CSS/JS and multilingual URLs. Also, with `defaultContentLanguageInSubdir = true` and `defaultContentLanguage = "en"`, Hugo generates a root redirect page `public/index.html` (meta refresh + canonical) that points at `{baseURL}en/`. Locally it reads `http://localhost:1313/en/` only because `baseURL = "http://localhost:1313/"` in `hugo.toml` — the target is **not hardcoded**. Rebuild with `-b <real URL>` so the deployed root redirect points at the live site (see GitHub Pages below).

**Docs vs Learn:** API/product **Docs** live on the **commercial** site (`commercial_website/site`, typically `:1314`). The tutorial nav shows **Learn** plus an optional **Product site** link. To browse Docs locally:

```powershell
cd commercial_website\scripts
.\sync_learn_for_site.ps1
cd ..\site
D:\Programs\Hugo\hugo.exe server -D --port 1314
# http://localhost:1314/en/docs/
```

Interactive demos need JsonXcel.WebServer on `http://127.0.0.1:5000` with templates synced:

```powershell
cd commercial_website\scripts
python sync_assets.py
python smoke_convert.py --langs en-US
```

## Layout

```text
content/{lang}/learn/          # 9 modules · 30 lessons
assets/templates/{BCP-47}/     # lesson_*.xlsx
assets/samples/{BCP-47}/       # *.json (+ *.request.json for multi-ds)
assets/previews/{BCP-47}/…/    # template.png + result.png
hugo.toml
```

Do **not** edit `../site/content/*/learn` by hand — it is generated.

## Rebuild from monorepo

```powershell
cd commercial_website\scripts
.\build.ps1
```

See `../scripts/README.md` for `new_lesson.py`, `validate_registry.py`, and preview rebuild.

## zh-TW content

Lesson Markdown under `content/zh-tw/learn` is generated from `zh-cn` via:

```powershell
python commercial_website\scripts\i18n\gen_zh_tw_from_zh_cn.py
```

Then re-run `scripts\sync_learn_for_site.ps1` for the commercial site.

## GitHub Pages (split-repo ready)

1. Publish this `tutorial/` tree as `jsonxcel-tutorial` (or keep monorepo + Actions).
2. Keep `themesDir` / theme as a module or vendor `hugo-theme-ete`.
3. Set `baseURL` to the Pages URL; keep `defaultContentLanguageInSubdir = true`. Rebuild with the deployed URL so the root redirect `public/index.html` targets the live site (not `localhost:1313`) — this makes the deployed site work straight from the Pages URL:

   ```powershell
   cd commercial_website\tutorial
   D:\Programs\Hugo\hugo.exe -b https://<org>.github.io/jsonxcel-tutorial/
   ```
4. Monorepo CI draft: repo root `.github/workflows/pages-tutorial.yml` (enable after `approve public deploy`).
5. Full checklist: `../DEPLOY.md`.

## Languages

`en` · `zh-cn` · `zh-tw` · `ja` · `ko` (BCP-47 folders for assets: `en-US`, `zh-CN`, …).

Primary technical prose: **en** + **zh-cn**. Secondary locales use localized titles + lead notes; markers and `template_name` stay identical across languages.
