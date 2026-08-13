/* ETE theme — must load before Alpine (see scripts.html). */
document.addEventListener("alpine:init", () => {
  Alpine.data("eteShell", () => ({
    mobileOpen: false,
    dark: false,
    init() {
      try {
        const stored = localStorage.getItem("ete-appearance");
        this.dark = stored === "dark";
      } catch (_) {
        this.dark = false;
      }
      this.apply();
    },
    toggleDark() {
      this.dark = !this.dark;
      try {
        localStorage.setItem("ete-appearance", this.dark ? "dark" : "light");
      } catch (_) {
        /* Tracking Prevention / private mode may block storage */
      }
      this.apply();
    },
    apply() {
      document.documentElement.classList.toggle("dark", this.dark);
    },
  }));

  Alpine.data("docsSearch", () => ({
    open: false,
    query: "",
    results: [],
    index: [],
    init() {
      try {
        let data = window.ETE_DOCS_INDEX;
        if (typeof data === "string") data = JSON.parse(data);
        this.index = Array.isArray(data) ? data : [];
      } catch (_) {
        this.index = [];
      }
    },
    search() {
      const q = (this.query || "").trim().toLowerCase();
      if (!q) {
        this.results = [];
        return;
      }
      this.results = this.index
        .filter((item) => {
          const title = (item.title || "").toLowerCase();
          const body = (item.body || "").toLowerCase();
          return title.includes(q) || body.includes(q);
        })
        .slice(0, 8);
      this.open = true;
    },
  }));
});

document.addEventListener("DOMContentLoaded", () => {
  // Full page navigations on Learn/Docs should land at the article top
  // (avoids "only the bottom changed" when scroll position was restored mid-page).
  if (document.querySelector(".docs-shell")) {
    try {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
    } catch (_) {}
    const hash = window.location.hash;
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView();
    }
  }

  document.querySelectorAll("select[data-lang-switch]").forEach((el) => {
    el.addEventListener("change", () => {
      const href = el.value;
      if (href) window.location.assign(href);
    });
  });

  document.querySelectorAll("[data-copy-code]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-copy-code");
      const root = document.getElementById(id);
      const text = root ? root.innerText : "";
      try {
        await navigator.clipboard.writeText(text);
        const prev = btn.textContent;
        btn.textContent = btn.dataset.copiedLabel || "Copied";
        setTimeout(() => {
          btn.textContent = prev;
        }, 1500);
      } catch (_) {
        /* ignore */
      }
    });
  });

  if (document.querySelector(".mermaid")) {
    const s = document.createElement("script");
    s.type = "module";
    s.textContent = `
      import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.esm.min.mjs";
      mermaid.initialize({ startOnLoad: true, theme: document.documentElement.classList.contains("dark") ? "dark" : "neutral" });
    `;
    document.body.appendChild(s);
  }
});
