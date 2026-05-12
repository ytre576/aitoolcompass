const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const root = path.resolve(__dirname, "..");

function runGenerator() {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [path.join("tools", "generate-site.js")], {
      cwd: root,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("close", (code) => {
      resolve({ code, stdout, stderr });
    });
  });
}

test("site generator tolerates concurrent rebuild requests", async () => {
  const results = await Promise.all([runGenerator(), runGenerator(), runGenerator()]);

  for (const result of results) {
    assert.equal(result.code, 0, `generator exited with ${result.code}\n${result.stderr}`);
  }

  assert.ok(fs.existsSync(path.join(root, "index.html")));
  assert.ok(fs.existsSync(path.join(root, "best-ai-tools-by-job.html")));
});
