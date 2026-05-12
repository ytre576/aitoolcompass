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

test("article pages expose next-step routing and return-surface blocks", () => {
  rebuildSite();
  const html = read(path.join("articles", "chatgpt-vs-claude-vs-gemini.html"));

  assert.match(html, /Continue with the next highest-value page\./);
  assert.match(html, /Keep the research thread alive\./);
  assert.ok((html.match(/class="article-route-card"/g) || []).length >= 4);
  assert.match(html, /data-saved-articles/);
  assert.match(html, /data-recent-articles/);
});
