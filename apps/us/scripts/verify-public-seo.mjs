import assert from "node:assert/strict";

// Check crawler-visible output, including deploy-time environment drift.
const base = (process.argv[2] || "https://www.buudy.com").replace(/\/$/, "");
const canonicalOrigin = "https://www.buudy.com";
let checks = 0;
const failures = [];
function check(condition, message) {
  checks++;
  if (!condition) failures.push(message);
}
async function get(path) {
  const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(30000) });
  check(response.ok, `${path}: HTTP ${response.status}`);
  return response.text();
}
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
}
const robots = await get("/robots.txt");
check(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`), "robots advertises the current sitemap host");
const sitemap = await get("/sitemap.xml");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
assert.ok(urls.length > 0, "sitemap must contain canonical pages");
check(new Set(urls).size === urls.length, "sitemap contains duplicate URLs");
for (const url of urls) {
  check(new URL(url).origin === canonicalOrigin, `sitemap has stale host: ${url}`);
  const path = new URL(url).pathname;
  const html = await get(path);
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => attributes(m[0]));
  const canonical = links.filter((a) => a.rel === "canonical");
  check(canonical.length === 1, `${path}: must have one canonical`);
  if (canonical.length) {
    check(new URL(canonical[0].href).origin === canonicalOrigin, `${path}: canonical points to stale host`);
    check(new URL(canonical[0].href).pathname === path, `${path}: sitemap includes non-canonical page`);
  }
  check(!/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(html), `${path}: sitemap page is noindex`);
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    let data;
    try { data = JSON.parse(m[1]); } catch { check(false, `${path}: invalid JSON-LD`); continue; }
    check(!JSON.stringify(data).includes("us.buudy.com"), `${path}: structured data has stale host`);
    if (data["@type"] === "Product") {
      check(!data.aggregateRating, `${path}: unverified aggregate rating still published`);
      check(!data.offers?.hasMerchantReturnPolicy, `${path}: conflicting return policy still published`);
      check(!data.offers?.shippingDetails, `${path}: unsupported delivery terms still published`);
      for (const image of (Array.isArray(data.image) ? data.image : data.image ? [data.image] : [])) {
        check(new URL(image).origin === canonicalOrigin, `${path}: product image has wrong host`);
      }
    }
  }
}
const feed = await get("/google-merchant-feed.xml");
check(!feed.includes("us.buudy.com"), "merchant feed has stale product or image host");
const llms = await get("/llms.txt");
check(!llms.includes("us.buudy.com"), "AI navigation file has stale host");
check(!llms.includes("236.40"), "AI navigation file contains stale fixed offer");
console.log(JSON.stringify({ base, checkedAt: new Date().toISOString(), routes: urls.length, checks, failures }, null, 2));
if (failures.length) process.exitCode = 1;
