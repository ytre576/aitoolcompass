const fs = require("fs");
const path = require("path");

const root = process.cwd();

const supportFiles = [
  "index.html",
  "robots.txt",
  "sitemap.xml",
  "ads.txt",
  "privacy.html",
  "affiliate-disclosure.html",
  "review-methodology.html",
  "editorial-policy.html",
  "contact.html",
  "ai-sites.html",
  "ai-skills.html",
  "best-ai-tools-by-job.html",
  "assets/styles.css",
  "assets/site.js",
  "assets/hero-ai-tool-compass.svg",
  "assets/hero-ai-sites.svg",
  "assets/hero-ai-skills.svg",
  "assets/article-tool-map.svg",
  "assets/article-chatbot-compare.svg",
  "assets/article-research-stack.svg",
  "assets/article-image-prompts.svg",
  "assets/article-video-storyboard.svg",
  "assets/article-design-workflow.svg",
  "categories/chatbots.html",
  "categories/research.html",
  "categories/image.html",
  "categories/video.html",
  "categories/productivity.html",
  "categories/design.html",
  "articles/best-ai-tools-2026.html",
  "articles/chatgpt-vs-claude-vs-gemini.html",
  "articles/perplexity-ai-research-workflow.html",
  "articles/midjourney-prompt-guide.html",
  "articles/runway-ai-video-guide.html",
  "articles/canva-ai-design-workflow.html",
];

function listHtmlFiles(dir) {
  return fs
    .readdirSync(path.join(root, dir), { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => `${dir}/${entry.name}`);
}

const articleFiles = listHtmlFiles("articles");
const categoryFiles = listHtmlFiles("categories");
const htmlFiles = [
  ...supportFiles.filter((file) => file.endsWith(".html")),
  ...categoryFiles,
  ...articleFiles,
];

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function extractLinks(html) {
  const links = [];
  const regex = /\b(?:href|src)=["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    links.push(match[1]);
  }
  return links;
}

function normalizeLocalTarget(fromFile, target) {
  if (
    target.startsWith("http://") ||
    target.startsWith("https://") ||
    target.startsWith("mailto:") ||
    target.startsWith("#") ||
    target.startsWith("javascript:")
  ) {
    return null;
  }

  const clean = target.split("#")[0].split("?")[0];
  if (!clean) return null;

  if (clean.startsWith("/")) {
    return clean.slice(1);
  }

  return path.normalize(path.join(path.dirname(fromFile), clean)).replace(/\\/g, "/");
}

for (const file of supportFiles) {
  assert(exists(file), `Missing required file: ${file}`);
}

assert(articleFiles.length >= 100, `Expected at least 100 article pages, found ${articleFiles.length}`);
assert(categoryFiles.length >= 10, `Expected at least 10 category pages, found ${categoryFiles.length}`);

for (const file of htmlFiles) {
  const html = read(file);
  assert(/<title>[^<]{25,70}<\/title>/i.test(html), `${file} needs a 25-70 character title`);
  assert(/<meta\s+name=["']description["']\s+content=["'][^"']{80,170}["']/i.test(html), `${file} needs a meta description`);
  assert(/<link\s+rel=["']canonical["']/i.test(html), `${file} needs canonical URL`);
  assert(/<meta\s+property=["']og:title["']/i.test(html), `${file} needs Open Graph title`);
  assert(/<main\b/i.test(html), `${file} needs a main landmark`);
  assert(/<h1\b/i.test(html), `${file} needs an h1`);
  assert(/application\/ld\+json/i.test(html), `${file} needs JSON-LD structured data`);
  assert(!/lorem ipsum/i.test(html), `${file} contains placeholder text`);

  for (const link of extractLinks(html)) {
    const target = normalizeLocalTarget(file, link);
    if (target) {
      assert(exists(target), `${file} links to missing local asset/page: ${link}`);
    }
  }
}

const index = read("index.html");
assert(index.includes("AI Tool Compass"), "Homepage must include the site name");
assert(index.includes("Pick the right AI tool, then put it to work."), "Homepage needs the new task-first hero positioning");
assert(index.includes("AI Sites"), "Homepage must link to the AI sites directory");
assert(index.includes("AI Skills"), "Homepage must link to the AI skills library");
assert(index.includes("best-ai-tools-by-job.html"), "Homepage must link to the by-job hub");
assert(index.includes("AI Tool Finder"), "Homepage needs the AI Tool Finder section");
assert(index.includes("Browse by job, not by brand."), "Homepage needs task-based browsing copy");
assert(index.includes("Creator workflows that lead to published output."), "Homepage needs the creator workflow section");
assert(index.includes("Popular comparisons before you upgrade"), "Homepage needs the comparison section");
assert(index.includes("This week's AI signals worth tracking."), "Homepage needs the weekly AI signals section");
assert(index.includes("Prompt Playbooks"), "Homepage must promote prompt playbooks");
assert(index.includes("Featured AI websites"), "Homepage needs a filled AI websites section");
assert(index.includes("Learning paths"), "Homepage needs learning paths content");
assert(index.includes("Offer watch"), "Homepage needs offer watch content");
assert(index.includes("Editor's toolkit"), "Homepage needs an editor toolkit section");
assert(index.includes("Monetization roadmap"), "Homepage needs a monetization roadmap section");
assert((index.match(/site-mini-card/g) || []).length >= 6, "Homepage should show at least six AI site cards");
assert((index.match(/path-card/g) || []).length >= 4, "Homepage should show at least four learning path cards");
assert((index.match(/command-card/g) || []).length >= 4, "Homepage should show at least four start-here cards");
assert((index.match(/finder-card/g) || []).length >= 6, "Homepage should show at least six tool finder cards");
assert((index.match(/creator-card/g) || []).length >= 4, "Homepage should show at least four creator workflow cards");
assert((index.match(/comparison-card/g) || []).length >= 4, "Homepage should show at least four comparison cards");
assert((index.match(/signal-card/g) || []).length >= 4, "Homepage should show at least four signal cards");
assert((index.match(/ai-skills\.html/g) || []).length >= 3, "Homepage should link to AI skills in multiple useful places");
assert((index.match(/articles\//g) || []).length >= 12, "Homepage should link to at least 12 articles");
assert((index.match(/categories\//g) || []).length >= 10, "Homepage should link to at least 10 category pages");

const aiSkills = read("ai-skills.html");
assert(aiSkills.includes("AI Skills & Prompt Playbooks"), "AI skills page needs clear page positioning");
assert(aiSkills.includes("Skill Playbooks"), "AI skills page needs skill playbooks section");
assert(aiSkills.includes("Prompt Library"), "AI skills page needs prompt library section");
assert(aiSkills.includes("Copy-ready prompt"), "AI skills page needs copy-ready prompt labels");
assert(aiSkills.includes("Quality checklist"), "AI skills page needs quality checklist section");
assert(aiSkills.includes("Source Verification Analyst"), "AI skills page needs source verification content");
assert(aiSkills.includes("Privacy Redaction Assistant"), "AI skills page needs privacy redaction content");
assert(aiSkills.includes("Weak"), "AI skills page needs bad vs better prompt examples");
assert((aiSkills.match(/class=["']skill-card/g) || []).length >= 10, "AI skills page should include at least ten skill cards");
assert((aiSkills.match(/class=["']prompt-card/g) || []).length >= 9, "AI skills page should include at least nine prompt cards");
assert((aiSkills.match(/class=["']source-card/g) || []).length >= 4, "AI skills page should cite at least four official source families");
assert((aiSkills.match(/prompt-box/g) || []).length >= 20, "AI skills page should include many practical prompt blocks");

const aiSites = read("ai-sites.html");
assert(aiSites.includes("Browse AI by use case before you compare prices."), "AI sites page needs a task-first hero");
assert(aiSites.includes("best-ai-tools-by-job.html"), "AI sites page must link to the by-job hub");
assert(aiSites.includes("Best starting points by job"), "AI sites page needs task-first route cards");
assert(aiSites.includes("Compare the tools people pay for most often."), "AI sites page needs a comparison route section");
assert(aiSites.includes("Read a guide before you buy the tool."), "AI sites page needs deeper editorial handoff");
assert((aiSites.match(/site-route-card/g) || []).length >= 4, "AI sites page should include at least four route cards");
assert((aiSites.match(/comparison-card/g) || []).length >= 4, "AI sites page should include at least four comparison cards");

const byJob = read("best-ai-tools-by-job.html");
assert(byJob.includes("Find the best AI stack by job, not by tool category."), "By-job hub needs a role-based hero");
assert(byJob.includes("Best starting routes by role"), "By-job hub needs route cards by role");
assert(byJob.includes("Get to a first useful win without testing every tool."), "By-job hub needs a starter stack section");
assert(byJob.includes("Return to the right pages, not random tabs."), "By-job hub needs a return-loop section");
assert((byJob.match(/class=["']job-route-card["']/g) || []).length >= 6, "By-job hub should include at least six role route cards");
assert((byJob.match(/class=["']job-stack-card["']/g) || []).length >= 4, "By-job hub should include at least four starter stack cards");
assert(/data-recent-articles/i.test(byJob), "By-job hub needs a recent-articles return loop");

const writingCategory = read("categories/writing.html");
assert(writingCategory.includes("Start with the highest-leverage page in this category."), "Category pages need a start-here layer");
assert(writingCategory.includes("Fastest way to get value from this cluster."), "Category pages need a route guidance section");
assert(writingCategory.includes("Use this category when"), "Category pages need usage guidance");
assert((writingCategory.match(/cluster-start-card/g) || []).length >= 3, "Category pages should include multiple start cards");
assert((writingCategory.match(/cluster-route-card/g) || []).length >= 4, "Category pages should include route guidance cards");

for (const file of articleFiles) {
  const html = read(file);
  assert(/<article\b/i.test(html), `${file} needs article markup`);
  assert(/<nav class=["']toc["']/i.test(html), `${file} needs a table of contents`);
  assert(/class=["']ad-slot/i.test(html), `${file} needs an ad slot placeholder`);
  assert(/FAQPage|Article/i.test(html), `${file} needs Article or FAQ schema`);
  assert(/<img\b[^>]+alt=["'][^"']{12,}/i.test(html), `${file} needs meaningful image alt text`);
  assert(/class=["']focus-box["']/i.test(html), `${file} needs a focus box for key takeaways`);
  assert(/class=["']field-note["']/i.test(html), `${file} needs a community-inspired field note`);
  assert(/class=["']depth-panel["']/i.test(html), `${file} needs a deeper explanation panel`);
  assert(/class=["']mistake-grid["']/i.test(html), `${file} needs specific beginner mistake guidance`);
  assert(/<table\b/i.test(html), `${file} needs at least one comparison table`);
  assert((html.match(/<h2\b/gi) || []).length >= 8, `${file} needs at least eight H2 sections`);
  assert(html.includes("Continue with the next highest-value page."), `${file} needs a next-step route section`);
  assert(html.includes("Keep the research thread alive."), `${file} needs a return surface section`);
  assert((html.match(/class=["']article-route-card["']/g) || []).length >= 4, `${file} should include at least four article route cards`);
  assert(/data-saved-articles/i.test(html), `${file} needs a saved-articles return loop`);
  assert(/data-recent-articles/i.test(html), `${file} needs a recent-articles return loop`);
  assert(/href=["']#next-step-routes["']/i.test(html), `${file} needs a next-step TOC link`);
  assert(/href=["']#return-surface["']/i.test(html), `${file} needs a return-surface TOC link`);
  const localImages = [...html.matchAll(/<img\b[^>]+src=["']([^"']+)["']/gi)].map((match) => normalizeLocalTarget(file, match[1])).filter(Boolean);
  assert(localImages.some((image) => image === `assets/article-art/${path.basename(file, ".html")}.svg`), `${file} needs its own article illustration`);
  const textLength = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim().length;
  assert(textLength >= 5200, `${file} is too thin: ${textLength} text characters`);
  assert(
    /Community-inspired field note|spec-driven|context engineering|project memory|CLAUDE\.md|\/ask|\/spec|zero-shot|few-shot|free tier|human review/i.test(html),
    `${file} needs practical community-inspired details`
  );
}

const sitemap = read("sitemap.xml");
for (const file of ["index.html", ...categoryFiles, ...articleFiles, "privacy.html", "affiliate-disclosure.html", "contact.html"]) {
  assert(sitemap.includes(file), `sitemap.xml missing ${file}`);
}
assert(sitemap.includes("ai-sites.html"), "sitemap.xml missing ai-sites.html");
assert(sitemap.includes("ai-skills.html"), "sitemap.xml missing ai-skills.html");
assert(sitemap.includes("best-ai-tools-by-job.html"), "sitemap.xml missing best-ai-tools-by-job.html");

const robots = read("robots.txt");
assert(/Sitemap:/i.test(robots), "robots.txt needs Sitemap directive");

const css = read("assets/styles.css");
assert(!/font-size:\s*[^;]*vw/i.test(css), "CSS must not scale font size with viewport width");
assert(!/letter-spacing:\s*-/i.test(css), "CSS must not use negative letter spacing");
assert(/--page-bg:\s*#06111f/i.test(css), "CSS must use the blue technology background token");
assert(/tech-panel/i.test(css), "CSS must include upgraded tech panel styling");
assert(/Taste-skill final theme: blue technology command center/i.test(css), "CSS must include the blue technology final theme");
assert(/reveal-ready/i.test(css), "CSS must include the scroll reveal state");
assert(/prefers-reduced-motion/i.test(css), "CSS must include reduced motion handling");
assert(/#7dd3fc/i.test(css), "CSS must include the clear blue technology accent");
assert(/skill-playbook-grid/i.test(css), "CSS must include AI skills page layout styling");
assert(/prompt-library-grid/i.test(css), "CSS must include prompt library styling");
assert(/example-compare/i.test(css), "CSS must include prompt comparison styling");

console.log(`Validated ${htmlFiles.length} HTML files, ${articleFiles.length} articles, and ${supportFiles.length} required support files.`);
