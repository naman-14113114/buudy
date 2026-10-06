import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { languages, indexedLocalizedPaths, localePath } from '../src/lib/international/markets.ts';
const dir=new URL('../src/data/locales/',import.meta.url);
const en=JSON.parse(await fs.readFile(new URL('en.json',dir),'utf8'));
let assertions=0;
for(const locale of Object.keys(languages)){
 const d=JSON.parse(await fs.readFile(new URL(`${locale}.json`,dir),'utf8'));
 assert.deepEqual(Object.keys(d).sort(),Object.keys(en).sort(),`${locale}: missing or surplus dictionary keys`);assertions++;
 for(const [key,value] of Object.entries(d)){
  assert.equal(typeof value,'string');assert.ok(value.trim().length>0);assert.ok(!/[\uFFFD\u0000-\u0008]/.test(value));
  if(locale!=='en'&&!['home','contact'].includes(key))assert.notEqual(value,en[key],`${locale}.${key}: untranslated`);
  assertions+=4;
 }
}
const origin=process.argv[2];
if(origin){
 for(const locale of Object.keys(languages).filter(l=>l!=='en')){
  for(const path of indexedLocalizedPaths){
   const url=localePath(locale,path);const response=await fetch(`${origin}${url}`);assert.equal(response.status,200,url);
   const html=await response.text();assert.match(html,new RegExp(`<html[^>]*lang="${locale}"`),url);
   assert.ok(html.includes(`href="https://www.buudy.com${url}"`),`${url}: canonical`);
   assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${url}: one H1`);
   for(const alternate of Object.keys(languages))assert.ok(html.includes(`hrefLang="${alternate}"`),`${url}: ${alternate} hreflang`);
   assert.ok(!html.includes('name="robots" content="noindex'),`${url}: indexable`);assertions+=11;
  }
 }
 const r=await fetch(`${origin}/?utm_source=locale-qa`,{headers:{'accept-language':'fr-FR,fr;q=0.9'},redirect:'manual'});
 assert.equal(r.status,307);assert.ok(r.headers.get('location').endsWith('/fr?utm_source=locale-qa'));assertions+=2;
 const english=await fetch(`${origin}/`,{headers:{'accept-language':'fr-FR',cookie:'buudy_language=en'},redirect:'manual'});assert.equal(english.status,200);assertions++;
 for(const path of ['/zz/products/buudy-led-mask','/fr/not-a-page']){const r=await fetch(origin+path);assert.equal(r.status,404,path);assertions++;}
 for(const locale of Object.keys(languages).filter(l=>l!=='en')){const html=await(await fetch(`${origin}/${locale}/cart`)).text();assert.match(html,/name="robots" content="noindex/);assertions++;}
}
console.log(JSON.stringify({languages:Object.keys(languages),assertions,origin:origin||'dictionaries only',passed:true}));
