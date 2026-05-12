const STORAGE_KEYS = {
  siteSaved: "aitoolcompass:site-saved",
  savedArticles: "aitoolcompass:saved-articles",
  recentArticles: "aitoolcompass:recent-articles",
  visitCache: "aitoolcompass:visit-cache",
};

function readStoredJson(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStoredJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage failures in privacy-restricted browsers.
  }
}

function readStoredFlag(key) {
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function writeStoredFlag(key, value) {
  try {
    window.localStorage.setItem(key, value ? "1" : "0");
  } catch {
    // Ignore storage failures in privacy-restricted browsers.
  }
}

function formatShortDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Saved";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatCount(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function buildVisitNamespace(hostname) {
  const normalized = String(hostname || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return normalized || "aitoolcompass-local";
}

function extractVisitCount(payload) {
  if (payload && typeof payload.value === "number") return payload.value;
  if (payload && typeof payload.count === "number") return payload.count;
  throw new Error("Visit counter payload did not contain a numeric count");
}

function counterApiUrls(namespace) {
  const base = `https://api.counterapi.dev/v1/${encodeURIComponent(namespace)}/site-visits`;
  return {
    up: `${base}/up`,
    get: base,
  };
}

async function fetchCounterJson(fetchImpl, url) {
  const response = await fetchImpl(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Visit counter request failed with ${response.status}`);
  }

  return response.json();
}

async function fetchVisitCount(fetchImpl, hostname) {
  const namespace = buildVisitNamespace(hostname);
  const urls = counterApiUrls(namespace);

  try {
    const payload = await fetchCounterJson(fetchImpl, urls.up);
    return extractVisitCount(payload);
  } catch (incrementError) {
    const payload = await fetchCounterJson(fetchImpl, urls.get);
    return extractVisitCount(payload);
  }
}

function setButtonLabel(button, text) {
  button.textContent = text;
  button.setAttribute("aria-label", text);
}

async function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "absolute";
  helper.style.left = "-9999px";
  document.body.appendChild(helper);
  helper.select();
  document.execCommand("copy");
  helper.remove();
}

function currentArticle() {
  const { dataset } = document.body;
  if (dataset.pageType !== "article") return null;
  return {
    slug: dataset.articleSlug,
    title: dataset.articleTitle,
    url: dataset.articleUrl,
  };
}

function renderReaderList(container, items, metaLabel, emptyText) {
  container.textContent = "";
  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = emptyText;
    container.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const link = document.createElement("a");
    link.className = "reader-loop-item";
    link.href = item.url;

    const title = document.createElement("strong");
    title.textContent = item.title;

    const meta = document.createElement("span");
    meta.className = "reader-loop-item-meta";
    meta.textContent = metaLabel(item);

    link.appendChild(title);
    link.appendChild(meta);
    container.appendChild(link);
  });
}

function refreshReaderLoops() {
  const saved = readStoredJson(STORAGE_KEYS.savedArticles, []);
  const recent = readStoredJson(STORAGE_KEYS.recentArticles, []);

  document.querySelectorAll("[data-saved-articles]").forEach((container) => {
    renderReaderList(
      container,
      saved,
      (item) => `Saved ${formatShortDate(item.savedAt)}`,
      "No saved guides yet. Open an article and use the Save article button to start a private shortlist in this browser."
    );
  });

  document.querySelectorAll("[data-recent-articles]").forEach((container) => {
    renderReaderList(
      container,
      recent,
      (item) => `Visited ${formatShortDate(item.seenAt)}`,
      "No recent reading history yet. Open a guide and it will appear here automatically."
    );
  });
}

function refreshSiteSaveButtons() {
  const saved = readStoredFlag(STORAGE_KEYS.siteSaved);
  document.querySelectorAll("[data-bookmark-site]").forEach((button) => {
    setButtonLabel(button, saved ? "Site saved" : "Save site");
    button.classList.toggle("is-active", saved);
  });
}

function refreshArticleSaveButtons() {
  const article = currentArticle();
  if (!article) return;

  const savedArticles = readStoredJson(STORAGE_KEYS.savedArticles, []);
  const isSaved = savedArticles.some((item) => item.slug === article.slug);

  document.querySelectorAll("[data-save-article]").forEach((button) => {
    setButtonLabel(button, isSaved ? "Saved article" : "Save article");
    button.classList.toggle("is-active", isSaved);
  });
}

function rememberArticleVisit() {
  const article = currentArticle();
  if (!article) return;

  const recent = readStoredJson(STORAGE_KEYS.recentArticles, []);
  const next = [
    {
      slug: article.slug,
      title: article.title,
      url: article.url,
      seenAt: new Date().toISOString(),
    },
    ...recent.filter((item) => item.slug !== article.slug),
  ].slice(0, 6);

  writeStoredJson(STORAGE_KEYS.recentArticles, next);
}

function initSiteSaveButtons() {
  refreshSiteSaveButtons();

  document.querySelectorAll("[data-bookmark-site]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = !readStoredFlag(STORAGE_KEYS.siteSaved);
      writeStoredFlag(STORAGE_KEYS.siteSaved, next);
      refreshSiteSaveButtons();
    });
  });
}

function initArticleSaveButtons() {
  const article = currentArticle();
  if (!article) return;

  refreshArticleSaveButtons();

  document.querySelectorAll("[data-save-article]").forEach((button) => {
    button.addEventListener("click", () => {
      const savedArticles = readStoredJson(STORAGE_KEYS.savedArticles, []);
      const exists = savedArticles.some((item) => item.slug === article.slug);
      const next = exists
        ? savedArticles.filter((item) => item.slug !== article.slug)
        : [
            {
              slug: article.slug,
              title: article.title,
              url: article.url,
              savedAt: new Date().toISOString(),
            },
            ...savedArticles,
          ].slice(0, 12);

      writeStoredJson(STORAGE_KEYS.savedArticles, next);
      refreshArticleSaveButtons();
      refreshReaderLoops();
    });
  });
}

function initShareButtons() {
  document.querySelectorAll("[data-share-page]").forEach((button) => {
    const defaultLabel = button.textContent.trim();
    button.addEventListener("click", async () => {
      const payload = {
        title: document.title,
        text: "Useful AI tool guides and workflow notes.",
        url: window.location.href,
      };

      try {
        if (navigator.share) {
          await navigator.share(payload);
          return;
        }

        await copyText(payload.url);
        setButtonLabel(button, "Link copied");
        window.setTimeout(() => setButtonLabel(button, defaultLabel), 1500);
      } catch {
        setButtonLabel(button, defaultLabel);
      }
    });
  });
}

function initFeedCopyButtons() {
  document.querySelectorAll("[data-copy-feed-url]").forEach((button) => {
    const defaultLabel = button.textContent.trim();
    button.addEventListener("click", async () => {
      const feedUrl = button.getAttribute("data-feed-url");
      if (!feedUrl) return;

      try {
        await copyText(feedUrl);
        setButtonLabel(button, "Feed copied");
        window.setTimeout(() => setButtonLabel(button, defaultLabel), 1500);
      } catch {
        setButtonLabel(button, defaultLabel);
      }
    });
  });
}

function initVisitCounter() {
  const nodes = document.querySelectorAll("[data-site-visit-count]");
  if (!nodes.length) return;

  const namespace = buildVisitNamespace(window.location.hostname);
  const cacheKey = `${STORAGE_KEYS.visitCache}:${namespace}`;
  const cached = readStoredJson(cacheKey, null);

  if (cached && typeof cached.value === "number") {
    nodes.forEach((node) => {
      node.textContent = formatCount(cached.value);
    });
  }

  fetchVisitCount(window.fetch.bind(window), window.location.hostname)
    .then((value) => {
      writeStoredJson(cacheKey, { value });
      nodes.forEach((node) => {
        node.textContent = formatCount(value);
      });
    })
    .catch(() => {
      if (cached && typeof cached.value === "number") return;
      nodes.forEach((node) => {
        node.textContent = "Live";
      });
    });
}

if (typeof document !== "undefined" && typeof window !== "undefined") {
  const currentYear = new Date().getFullYear();
  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = currentYear;
  });

  document.querySelectorAll(".ad-slot").forEach((slot) => {
    slot.setAttribute("aria-label", "Reserved advertising placement");
  });

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach((link) => {
    const linkPath = link.getAttribute("href").split("/").pop();
    if (linkPath === currentPath) {
      link.setAttribute("aria-current", "page");
    }
  });

  rememberArticleVisit();
  initSiteSaveButtons();
  initArticleSaveButtons();
  initShareButtons();
  initFeedCopyButtons();
  refreshReaderLoops();
  initVisitCounter();

  const revealTargets = document.querySelectorAll(
    ".section-header, .card, .article-card, .site-mini-card, .path-card, .tech-panel, .offer-row, .roadmap > div, .stat, .directory-strip, .site-route-card, .cluster-start-card, .cluster-route-card, .article-route-card, .article-return-card, .return-panel, .reader-loop-item"
  );

  if ("IntersectionObserver" in window) {
    revealTargets.forEach((node, index) => {
      node.classList.add("reveal-ready");
      node.style.setProperty("--reveal-delay", `${Math.min(index % 8, 7) * 45}ms`);
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("reveal-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    revealTargets.forEach((node) => revealObserver.observe(node));
  } else {
    revealTargets.forEach((node) => node.classList.add("reveal-in"));
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    buildVisitNamespace,
    extractVisitCount,
    counterApiUrls,
    fetchVisitCount,
  };
}
