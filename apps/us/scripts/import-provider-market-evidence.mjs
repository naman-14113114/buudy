import fs from 'node:fs/promises';
import path from 'node:path';
const folder = process.argv[2];
if (!folder) throw new Error('Provide the public, sanitized checkout evidence directory.');
const html = await fs.readFile(path.join(folder, 'provider-landing.sanitized.html'), 'utf8');
const literal = html.match(/var COUNTRY_TO_CURRENCY = \{([\s\S]*?)\};/)?.[1];
if (!literal) throw new Error('Missing provider country/currency map.');
const currencyByCountry = Object.fromEntries([...literal.matchAll(/\b([A-Z]{2}):'([A-Z]{3})'/g)].map(m => [m[1],m[2]]));
if (Object.keys(currencyByCountry).length < 239) throw new Error('Incomplete country map.');
const audit = JSON.parse(await fs.readFile(path.join(folder, 'deliverability-checks.json'), 'utf8'));
const countries = audit.results.map(r => ({country:r.code, currency:currencyByCountry[r.code] || 'GBP',
  accepted:r.status === 200 ? r.data?.drop?.is_shippable ?? null : null}));
await fs.mkdir(new URL('../src/lib/international/',import.meta.url), {recursive:true});
await fs.writeFile(new URL('../src/lib/international/provider-markets.ts',import.meta.url),
  `// Public XPage data only. Country acceptance is not address-level delivery confirmation.\n`+
  `export const providerMarketCheckedAt = ${JSON.stringify(audit.checkedAt)};\n`+
  `export const currencyByCountry: Record<string,string> = ${JSON.stringify(currencyByCountry,null,2)};\n`+
  `export const providerDestinations = ${JSON.stringify(countries,null,2)};\n`);
console.log(JSON.stringify({countries:countries.length,accepted:countries.filter(c=>c.accepted).length,currencies:new Set(Object.values(currencyByCountry)).size}));
