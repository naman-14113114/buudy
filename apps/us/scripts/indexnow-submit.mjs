import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// IndexNow ownership keys are public verification files, not private API credentials.
// This script submits only after an explicit --submit, and only live canonical URLs.
const configs = {
  '@buudy/us': { origin: 'https://www.buudy.com', key: 'fc1064006101bed6308001d2cb27fbce' },
};
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageName = JSON.parse(await fs.readFile(path.join(root, 'package.json'), 'utf8')).name;
const config = configs[packageName];
if (!config) throw new Error('Unknown project package; configure the canonical origin explicitly.');
const args = process.argv.slice(2);
const allowed = new Set(['--submit', '--dry-run', '--url', '--report', '--help']);
for (let i = 0; i < args.length; i += 1) {
  if (!allowed.has(args[i])) throw new Error(`Unknown argument: ${args[i]}`);
  if (['--url', '--report'].includes(args[i])) {
    if (!args[i + 1] || args[i + 1].startsWith('--')) throw new Error(`Missing value for ${args[i]}`);
    i += 1;
  }
}
if (args.includes('--help')) {
  console.log('node scripts/indexnow-submit.mjs [--dry-run | --submit] [--url CANONICAL_URL ...] [--report FILE]');
  console.log('Defaults to a dry run of live sitemap URLs. HTTP 200/202 means accepted, not indexed or ranked.');
  process.exit(0);
}
if (args.includes('--submit') && args.includes('--dry-run')) throw new Error('Choose --submit or --dry-run.');
const submit = args.includes('--submit');
const keyLocation = `${config.origin}/${config.key}.txt`;
async function fetchOk(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000), redirect: 'follow' });
  if (!response.ok) throw new Error(`Preflight failed: ${url} returned HTTP ${response.status}`);
  if (new URL(response.url).origin !== config.origin) throw new Error(`Unexpected redirect origin for ${url}`);
  return response;
}
const key = await (await fetchOk(keyLocation)).text();
if (key.trim() !== config.key) throw new Error('Live ownership key does not match. Deploy the verification file first.');
const explicitUrls = [];
for (let i = 0; i < args.length; i += 1) if (args[i] === '--url') explicitUrls.push(args[++i]);
let urls = explicitUrls;
if (!urls.length) {
  const xml = await (await fetchOk(`${config.origin}/sitemap.xml`)).text();
  if (/<sitemapindex\b/i.test(xml)) throw new Error('Sitemap indexes need an explicit URL list; refusing to submit child sitemaps as pages.');
  urls = [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map((match) => match[1].trim().replaceAll('&amp;', '&'));
}
urls = [...new Set(urls.map((url) => new URL(url).href))];
if (!urls.length || urls.length > 10000) throw new Error('Expected 1 to 10,000 live page URLs.');
for (const value of urls) {
  const url = new URL(value);
  if (url.origin !== config.origin || url.search || url.hash) throw new Error(`Not a clean canonical URL: ${value}`);
}
// Validate every submitted page. Four concurrent requests avoid overwhelming the site.
for (let i = 0; i < urls.length; i += 4) {
  await Promise.all(urls.slice(i, i + 4).map(async (url) => {
    const response = await fetchOk(url);
    if (response.url !== url) throw new Error(`URL redirects; use its canonical target: ${url}`);
    if (/noindex/i.test(response.headers.get('x-robots-tag') ?? '')) throw new Error(`URL is noindex: ${url}`);
    const html = await response.text();
    const metaRobots = [...html.matchAll(/<meta\b[^>]*>/gi)].filter((m) => /name=["'](?:robots|googlebot)["']/i.test(m[0]));
    if (metaRobots.some((m) => /noindex/i.test(m[0]))) throw new Error(`URL has a noindex meta tag: ${url}`);
    const tag = [...html.matchAll(/<link\b[^>]*>/gi)].find((m) => /rel=["']canonical["']/i.test(m[0]));
    const canonical = tag?.[0].match(/href=["']([^"']+)["']/i)?.[1]?.replaceAll('&amp;', '&');
    if (!canonical || new URL(canonical, url).href !== url) throw new Error(`Missing or mismatched canonical on ${url}: ${canonical ?? 'missing'}`);
  }));
}
const report = {
  recordedAt: new Date().toISOString(), origin: config.origin, mode: submit ? 'submit' : 'dry-run',
  keyLocation, count: urls.length, urls, status: null, outcome: 'Preflight passed; nothing submitted.',
};
if (submit) {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(config.origin).hostname, key: config.key, keyLocation, urlList: urls }),
    signal: AbortSignal.timeout(30000),
  });
  report.status = response.status;
  report.response = (await response.text()).slice(0, 2000);
  report.outcome = response.status === 200 ? 'Submission accepted. Indexing and ranking are not confirmed.'
    : response.status === 202 ? 'Submission received; ownership validation pending. Indexing and ranking are not confirmed.'
    : 'Submission was not accepted.';
}
const reportIndex = args.indexOf('--report');
if (reportIndex >= 0) {
  const reportPath = path.resolve(args[reportIndex + 1]);
  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
}
console.log(JSON.stringify(report, null, 2));
if (submit && ![200, 202].includes(report.status)) process.exitCode = 1;
