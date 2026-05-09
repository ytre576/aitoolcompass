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

const revealTargets = document.querySelectorAll(
  ".section-header, .card, .article-card, .site-mini-card, .path-card, .tech-panel, .offer-row, .roadmap > div, .stat, .directory-strip"
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
