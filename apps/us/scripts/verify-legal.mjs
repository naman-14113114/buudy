import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { legalLanguages } from '../src/lib/international/legal-registry.ts';
const dir=new URL('../src/data/locales/policies/',import.meta.url);
const en=JSON.parse(await fs.readFile(new URL('en.json',dir),'utf8'));
let documents=0;
for(const locale of legalLanguages){
 const raw=await fs.readFile(new URL(`${locale}.json`,dir),'utf8');
 assert.notEqual(raw.charCodeAt(0),0xfeff,`${locale}: BOM`);
 const data=JSON.parse(raw);
 assert.deepEqual(Object.keys(data).sort(),Object.keys(en).sort());
 assert.deepEqual(Object.keys(data.labels).sort(),Object.keys(en.labels).sort());
 assert.deepEqual(Object.keys(data.documents).sort(),Object.keys(en.documents).sort());
 for(const [key,html] of Object.entries(data.documents)){
  assert.equal(typeof html,'string');assert.ok(html.trim());
  assert.ok(!/[\uFFFD\u0000-\u0008]/.test(html));
  assert.ok(!/<(?:script|iframe|object)\b|\son[a-z]+\s*=|javascript:/i.test(html),`${locale}.${key}: unsafe markup`);
  const tags=s=>s.match(/<[^>]+>/g)||[];
  assert.deepEqual(tags(html),tags(en.documents[key]),`${locale}.${key}: missing/changed HTML tag, link or attribute`);
  const numbers=s=>s.replace(/<[^>]+>/g,'').match(/\d+(?:[.,]\d+)?/g)||[];
  assert.deepEqual(numbers(html),numbers(en.documents[key]),`${locale}.${key}: changed date, window or numeric clause`);
  if(locale!=='en')assert.notEqual(html,en.documents[key],`${locale}.${key}: untranslated`);
  documents++;
 }
}
console.log(JSON.stringify({languages:legalLanguages,documents,passed:true}));
