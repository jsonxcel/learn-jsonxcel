(() => {
  function qs(root, sel) {
    return root.querySelector(sel);
  }

  function siteRoot(panel) {
    const raw = panel.dataset.siteRoot || "/";
    return raw.endsWith("/") ? raw.slice(0, -1) : raw;
  }

  function sampleCandidates(panel, lang, name) {
    const root = siteRoot(panel);
    const kind = (panel.dataset.sampleKind || panel.dataset.mode || "ds").toLowerCase();
    // Only fetch .request.json when the shortcode confirmed it exists — avoids 404 noise.
    if (kind === "request") {
      return [`${root}/samples/${lang}/${name}.request.json`];
    }
    return [`${root}/samples/${lang}/${name}.json`];
  }

  function templateUrl(panel, lang, name) {
    return `${siteRoot(panel)}/templates/${lang}/${name}.xlsx`;
  }

  function showError(panel, msg) {
    const box = qs(panel, ".jx-demo-error");
    box.textContent = msg;
    box.classList.remove("hidden");
  }

  function clearError(panel) {
    const box = qs(panel, ".jx-demo-error");
    box.textContent = "";
    box.classList.add("hidden");
  }

  function filenameFromDisposition(header, fallback) {
    if (!header) return fallback;
    const m = /filename\*?=(?:UTF-8''|")?([^\";]+)/i.exec(header);
    return m ? decodeURIComponent(m[1].replace(/"/g, "")) : fallback;
  }

  function stringifyDsFields(obj) {
    const out = { ...obj };
    for (const key of Object.keys(out)) {
      if (/^ds\d*$/i.test(key) && out[key] != null && typeof out[key] === "object") {
        out[key] = JSON.stringify(out[key]);
      }
    }
    return out;
  }

  async function loadJson(panel) {
    const status = qs(panel, ".jx-demo-status");
    const ta = qs(panel, ".jx-demo-json");
    const lang = qs(panel, ".jx-demo-lang").value.trim();
    const name = panel.dataset.templateName;
    clearError(panel);
    status.textContent = "Loading sample…";

    let lastErr = null;
    for (const url of sampleCandidates(panel, lang, name)) {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          lastErr = new Error(`HTTP ${res.status} for ${url}`);
          continue;
        }
        const data = await res.json();
        const isRequest = url.endsWith(".request.json");
        panel.dataset.mode = isRequest ? "request" : "ds";
        ta.value = JSON.stringify(data, null, 2);
        panel.dataset.sampleUrl = url;
        status.textContent = `Loaded ${url}${isRequest ? " (multi-ds request)" : ""}`;
        return;
      } catch (err) {
        lastErr = err;
      }
    }
    status.textContent = "Failed to load sample JSON.";
    showError(panel, String((lastErr && lastErr.message) || lastErr || "not found"));
  }

  function buildBody(panel, format) {
    const ta = qs(panel, ".jx-demo-json");
    const lang = qs(panel, ".jx-demo-lang").value.trim();
    const name = panel.dataset.templateName;
    const parsed = JSON.parse(ta.value || "{}");
    const mode = panel.dataset.mode || "ds";

    if (mode === "request" || typeof parsed.ds === "string" || parsed.ds01 != null) {
      const body = stringifyDsFields(parsed);
      body.template_name = name;
      body.language = lang;
      body.output_format = format;
      body.return_file_stream = true;
      body.return_file_name = true;
      body.return_file_size = true;
      if (body.ds != null && typeof body.ds === "object") {
        body.ds = JSON.stringify(body.ds);
      }
      return body;
    }

    return {
      template_name: name,
      language: lang,
      output_format: format,
      return_file_stream: true,
      return_file_name: true,
      return_file_size: true,
      ds: JSON.stringify(parsed),
    };
  }

  async function convert(panel, format) {
    const status = qs(panel, ".jx-demo-status");
    const apiInput = qs(panel, ".jx-demo-api");
    const name = panel.dataset.templateName;
    clearError(panel);

    let body;
    try {
      body = buildBody(panel, format);
    } catch (err) {
      showError(panel, "Invalid JSON: " + err.message);
      return;
    }

    const apiBase = (apiInput.value || panel.dataset.apiBase || "").replace(/\/$/, "");

    status.textContent = `Converting (${format})…`;
    try {
      const res = await fetch(`${apiBase}/api/convert`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "*/*" },
        body: JSON.stringify(body),
      });
      const ct = res.headers.get("content-type") || "";
      if (!res.ok) {
        const text = await res.text();
        let msg = text;
        try {
          const j = JSON.parse(text);
          const code = j.error_code ? `[${j.error_code}] ` : "";
          msg = code + (j.error_message || j.message || j.error || text);
        } catch (_) {}
        throw new Error(msg);
      }
      if (ct.includes("application/json")) {
        const j = await res.json();
        if (j.success === false || j.error || j.error_code) {
          const code = j.error_code ? `[${j.error_code}] ` : "";
          throw new Error(code + (j.error_message || j.message || JSON.stringify(j)));
        }
      }
      const blob = await res.blob();
      const ext = format === "pdf" ? "pdf" : "xlsx";
      const fileName = filenameFromDisposition(
        res.headers.get("content-disposition"),
        `${name}.${ext}`
      );
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);
      status.textContent = `Downloaded ${fileName} (${blob.size} bytes)`;
    } catch (err) {
      status.textContent = "Convert failed.";
      showError(panel, String(err.message || err));
    }
  }

  function syncTemplateLink(panel) {
    const lang = qs(panel, ".jx-demo-lang").value.trim();
    const name = panel.dataset.templateName;
    const a = qs(panel, ".jx-demo-dl-tpl");
    if (a) a.href = templateUrl(panel, lang, name);
  }

  function ensureLightbox() {
    let root = document.getElementById("jx-demo-lightbox");
    if (root) return root;
    root = document.createElement("div");
    root.id = "jx-demo-lightbox";
    root.className = "jx-demo-lightbox";
    root.hidden = true;
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.innerHTML = `
      <div class="jx-demo-lightbox__panel">
        <button type="button" class="jx-demo-lightbox__close" aria-label="Close">&times;</button>
        <img class="jx-demo-lightbox__img" alt="" />
        <p class="jx-demo-lightbox__caption"></p>
      </div>`;
    document.body.appendChild(root);
    const close = () => {
      root.hidden = true;
      document.body.style.overflow = "";
    };
    root.addEventListener("click", (e) => {
      if (e.target === root || e.target.classList.contains("jx-demo-lightbox__close")) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !root.hidden) close();
    });
    root._jxClose = close;
    return root;
  }

  function openLightbox(src, caption) {
    const root = ensureLightbox();
    const img = root.querySelector(".jx-demo-lightbox__img");
    const cap = root.querySelector(".jx-demo-lightbox__caption");
    img.src = src;
    img.alt = caption || "";
    cap.textContent = caption || "";
    root.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function bind(panel) {
    // API base comes from Hugo params.apiBaseUrl (data-api-base / input value). No localStorage override.
    qs(panel, ".jx-demo-load").addEventListener("click", () => loadJson(panel));
    qs(panel, ".jx-demo-lang").addEventListener("change", () => {
      syncTemplateLink(panel);
      loadJson(panel);
    });
    panel.querySelectorAll(".jx-demo-convert").forEach((btn) => {
      btn.addEventListener("click", () => convert(panel, btn.dataset.format || "excel"));
    });
    panel.querySelectorAll(".jx-demo-preview-zoom").forEach((btn) => {
      btn.addEventListener("click", () => {
        openLightbox(btn.dataset.previewSrc, btn.dataset.previewCaption || "");
      });
    });

    syncTemplateLink(panel);
    loadJson(panel);
  }

  function init() {
    document.querySelectorAll("[data-jx-demo]").forEach(bind);
  }

  if (window.__jxLessonDemoInit) return;
  window.__jxLessonDemoInit = true;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
