const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");

function rebuildSite() {
  execFileSync(process.execPath, [path.join("tools", "generate-site.js")], {
    cwd: root,
    stdio: "pipe",
  });
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

test("by-job hub page exposes role-based routing and return loops", () => {
  rebuildSite();
  const html = read("best-ai-tools-by-job.html");

  assert.match(html, /Find the best AI stack by job, not by tool category\./);
  assert.match(html, /Best starting routes by role/);
  assert.match(html, /Get to a first useful win without testing every tool\./);
  assert.match(html, /Return to the right pages, not random tabs\./);
  assert.ok((html.match(/class="job-route-card"/g) || []).length >= 6);
  assert.ok((html.match(/class="job-stack-card"/g) || []).length >= 4);
  assert.match(html, /data-recent-articles/);
});

test("homepage and directory pages link into the by-job hub", () => {
  rebuildSite();
  const home = read("index.html");
  const directory = read("ai-sites.html");

  assert.match(home, /best-ai-tools-by-job\.html/);
  assert.match(directory, /best-ai-tools-by-job\.html/);
});
