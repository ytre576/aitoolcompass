const test = require("node:test");
const assert = require("node:assert/strict");

const siteJs = require("../assets/site.js");

test("buildVisitNamespace normalizes hostnames for counter keys", () => {
  assert.equal(siteJs.buildVisitNamespace("AItoolcompass.bbroot.com"), "aitoolcompass-bbroot-com");
  assert.equal(siteJs.buildVisitNamespace(""), "aitoolcompass-local");
});

test("fetchVisitCount uses CounterAPI v1 up endpoint and accepts count-based responses", async () => {
  const calls = [];
  const fetchMock = async (url) => {
    calls.push(url);
    return {
      ok: true,
      json: async () => ({ count: 27 }),
    };
  };

  const value = await siteJs.fetchVisitCount(fetchMock, "aitoolcompass.bbroot.com");

  assert.equal(value, 27);
  assert.deepEqual(calls, ["https://api.counterapi.dev/v1/aitoolcompass-bbroot-com/site-visits/up"]);
});

test("fetchVisitCount falls back to the readonly get endpoint when increment fails", async () => {
  const calls = [];
  const fetchMock = async (url) => {
    calls.push(url);
    if (url.endsWith("/up")) {
      throw new Error("network unavailable");
    }
    return {
      ok: true,
      json: async () => ({ count: 31 }),
    };
  };

  const value = await siteJs.fetchVisitCount(fetchMock, "aitoolcompass.bbroot.com");

  assert.equal(value, 31);
  assert.deepEqual(calls, [
    "https://api.counterapi.dev/v1/aitoolcompass-bbroot-com/site-visits/up",
    "https://api.counterapi.dev/v1/aitoolcompass-bbroot-com/site-visits",
  ]);
});
