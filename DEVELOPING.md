# Developing JsonXcel Learn

Notes for maintainers. End users should start with [README.md](README.md).

## Monorepo vs public repo

In the **JsonXcel_WebService** monorepo, this folder (`commercial_website/tutorial`) is the **canonical source** for Learn content. The commercial Hugo site copies `/learn` at build time via `../scripts/sync_learn_for_site.ps1` and mounts the same `assets/` (templates, samples, previews).

Do **not** edit `../site/content/*/learn` by hand — it is generated.

The public GitHub repo [jsonxcel/learn-jsonxcel](https://github.com/jsonxcel/learn-jsonxcel) is expected to publish this tree (or a filtered export). Keep `README*.md` visitor-facing (product one-liner, demo GIF, product/Learn/Download links, Quickstart, license); keep packaging and sync details here.

Rebuild the README GIF after the sales-order story changes:

```powershell
python commercial_website\scripts\media\build_readme_gif.py
# writes tutorial/docs/media/json-in-excel-out.gif (~30s, needs Pillow + ffmpeg)
```

## Local monorepo workflow

```powershell
# Theme CSS
cd commercial_website\hugo_template\hugo-theme-ete
npm install
npm run build:css

# Tutorial site
cd ..\..\tutorial
hugo server -D --port 1313

# Optional: commercial site with synced Learn
cd ..\scripts
.\sync_learn_for_site.ps1
cd ..\site
hugo server -D --port 1314
```

Interactive demos against a local WebServer:

```powershell
cd commercial_website\scripts
python sync_assets.py
python smoke_convert.py --langs en-US
```

Full rebuild helpers: `../scripts/README.md` (`new_lesson.py`, `validate_registry.py`, preview rebuild, `build.ps1`).

## zh-TW lesson Markdown

Generated from `zh-cn` with OpenCC:

```powershell
python commercial_website\scripts\i18n\gen_zh_tw_from_zh_cn.py
```

Then re-run `sync_learn_for_site.ps1` if you need the commercial site copy.

## Release binaries (naming contract)

Publish under <https://github.com/jsonxcel/learn-jsonxcel/releases> with stable asset names so “latest” links stay valid:

| Asset file name | Platform |
|-----------------|----------|
| `JsonXcel-win-x64.zip` | Windows x64 |
| `JsonXcel-linux-x64.zip` | Linux x64 |

URLs used by README and `hugo.toml`:

- `…/releases/latest/download/JsonXcel-win-x64.zip`
- `…/releases/latest/download/JsonXcel-linux-x64.zip`

When adding macOS or other RIDs, append rows in all `README*.md` and extend `[params]` download URLs.

## GitHub Pages

Workflow draft (monorepo): repo root `.github/workflows/pages-tutorial.yml`.  
Set `vars.TUTORIAL_BASE_URL` (for example `https://jsonxcel.github.io/learn-jsonxcel/` or `https://learn.jsonxcel.com/`). Rebuild with that `-b` / `--baseURL` so the root language redirect is correct.

Checklist: `../DEPLOY.md`.
