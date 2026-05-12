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

test("ai-sites page exposes task-first directory structure", () => {
  rebuildSite();
  const html = read("ai-sites.html");

  assert.match(html, /Browse AI by use case before you compare prices\./);
  assert.match(html, /Best starting points by job/);
  assert.match(html, /Compare the tools people pay for most often\./);
  assert.match(html, /Read a guide before you buy the tool\./);

  assert.ok((html.match(/class="site-route-card"/g) || []).length >= 4);
  assert.ok((html.match(/class="comparison-card"/g) || []).length >= 4);
});

test("category pages expose a start-here layer before the article grid", () => {
  rebuildSite();
  const html = read(path.join("categories", "writing.html"));

  assert.match(html, /Start with the highest-leverage page in this category\./);
  assert.match(html, /Use this category when/);
  assert.match(html, /Fastest way to get value from this cluster\./);
  assert.match(html, /class="cluster-start-card"/);
  assert.match(html, /class="cluster-route-card"/);
});
