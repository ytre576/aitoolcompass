const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const indexPath = path.join(root, "index.html");

function rebuildSite() {
  execFileSync(process.execPath, [path.join("tools", "generate-site.js")], {
    cwd: root,
    stdio: "pipe",
  });
}

function readHome() {
  return fs.readFileSync(indexPath, "utf8");
}

test("homepage exposes the new mixed search-and-editorial growth structure", () => {
  rebuildSite();
  const html = readHome();

  assert.match(html, /Pick the right AI tool, then put it to work\./);
  assert.match(html, />AI Tool Finder</);
  assert.match(html, /Browse by job, not by brand\./);
  assert.match(html, /Creator workflows that lead to published output\./);
  assert.match(html, /Popular comparisons before you upgrade/);
  assert.match(html, /This week's AI signals worth tracking\./);

  assert.ok((html.match(/class="command-card"/g) || []).length >= 4);
  assert.ok((html.match(/class="finder-card"/g) || []).length >= 6);
  assert.ok((html.match(/class="creator-card"/g) || []).length >= 4);
  assert.ok((html.match(/class="comparison-card"/g) || []).length >= 4);
  assert.ok((html.match(/class="signal-card"/g) || []).length >= 4);
});
