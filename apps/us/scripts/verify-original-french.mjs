import assert from 'node:assert/strict';
const base=process.argv[2]||'http://localhost:3226';
let checks=0;
const get=path=>fetch(base+path,{headers:{'accept-language':'en'},redirect:'manual',signal:AbortSignal.timeout(30000)});
const original=await get('/products/buudy-led-mask');
const translated=await get('/fr/products/buudy-led-mask');
assert.equal(original.status,200);assert.equal(translated.status,200);checks+=2;
const en=await original.text(),fr=await translated.text();
for(const html of [en,fr]){
 for(const marker of ['buudyLED-23435t23-Container','hero-cta','free-gifts','buudy-ai','id="faq"','font-playfair']) {assert.ok(html.includes(marker),`original component marker missing: ${marker}`);checks++;}
 for(const forbidden of ['intl-hero','intl-header','Display currency','Payment is processed in GBP','Your bank may apply','buudy-language']) {assert.ok(!html.includes(forbidden),`rejected replacement or copy: ${forbidden}`);checks++;}
}
for(const phrase of ['Masque LED','AJOUTER + CADEAUX OFFERTS','Coffret de transport premium','La lumière bleue.','Pourquoi choisir Buudy','Questions','Proche infrarouge']) {assert.ok(fr.includes(phrase),`missing French copy: ${phrase}`);checks++;}
assert.match(fr,/<html[^>]+lang="fr"/);checks++;
assert.ok(en.includes('ADD TO CART + FREE GIFTS'));checks++;
const assets=html=>[...new Set([...html.matchAll(/(?:src|srcSet)="([^"<>]+)/g)].map(m=>m[1]).filter(value=>value.includes('/media/')||value.includes('url=%2Fmedia%2F')).map(value=>value.split(' ')[0]))].sort();
assert.deepEqual(assets(fr),assets(en),'original product imagery changed');checks++;
const auto=await fetch(`${base}/products/buudy-led-mask?currency=EUR&utm_source=locale-qa`,{headers:{'accept-language':'fr-FR,fr;q=0.9'},redirect:'manual'});
assert.equal(auto.status,307);assert.equal(new URL(auto.headers.get('location'),base).pathname,'/fr/products/buudy-led-mask');assert.equal(new URL(auto.headers.get('location'),base).search,'?currency=EUR&utm_source=locale-qa');checks+=3;
const explicitEnglish=await fetch(`${base}/products/buudy-led-mask`,{headers:{'accept-language':'fr-FR',cookie:'buudy_language=en'},redirect:'manual'});assert.equal(explicitEnglish.status,200);checks++;
for(const path of ['shipping-policy','return-policy','refund-policy','privacy-policy','terms-of-service','cookies-policy']) {
 const r=await get(`/fr/policies/${path}`);assert.equal(r.status,200);const html=await r.text();assert.ok(html.includes('buudy-policy-content'));assert.ok(html.includes('Politiques de la boutique'));assert.match(html,/<html[^>]+lang="fr"/);assert.ok(html.includes(`https://www.buudy.com/fr/policies/${path}`));checks+=5;
}
const cart=await get('/fr/cart');assert.equal(cart.status,200);const cartHtml=await cart.text();assert.ok(cartHtml.includes('noindex'));assert.ok(!cart.headers.get('cache-control')?.includes('s-maxage'));checks+=3;
console.log(JSON.stringify({base,checkedAt:new Date().toISOString(),checks,passed:true}));
