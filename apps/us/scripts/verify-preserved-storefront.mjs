import assert from 'node:assert/strict';
import {languages} from '../src/lib/international/markets.ts';
import {publishedLocalizedPaths,isPublishedLocalizedPath} from '../src/lib/international/rollout.ts';
const base=process.argv[2]||'http://localhost:3223';
let checks=0;
for(const path of ['/','/products/buudy-led-mask','/cart']){
 const response=await fetch(base+path,{headers:{'accept-language':'en-GB,en;q=0.9'},signal:AbortSignal.timeout(30000)});
 assert.equal(new URL(response.url).pathname,path,'neutral/original paths must retain the original storefront');
 const html=await response.text();
 assert.ok(!html.includes('Display currency'),'extra currency control was rendered');
 assert.ok(!html.includes('Your bank may apply'),'unrequested bank-fee copy was rendered');
 assert.ok(!html.includes('Payment is processed in GBP'),'unrequested payment copy was rendered');
 assert.ok(!html.includes('buudy-language'),'extra language row was rendered');
 if(path.includes('products')){assert.ok(html.includes('buudy-glow'),'original product hero missing');assert.ok(html.includes('buudy-led-mask-front.webp'),'authentic product image missing');}
 checks+=6;
}
for(const locale of Object.keys(languages).filter(l=>l!=='en')){
 const r=await fetch(`${base}/${locale}/products/buudy-led-mask?currency=EUR`,{redirect:'manual',signal:AbortSignal.timeout(30000)});
 if(isPublishedLocalizedPath(locale,'/products/buudy-led-mask')){assert.equal(r.status,200,`${locale}: original-template translation`);checks++;continue;}
 assert.equal(r.status,307,`${locale}: temporary restoration redirect`);
 const target=new URL(r.headers.get('location'),base);
 assert.equal(target.pathname,'/products/buudy-led-mask');assert.equal(target.search,'?currency=EUR');
 checks+=3;
}
const xml=await (await fetch(base+'/sitemap.xml')).text();
const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
assert.equal(urls.length,18+Object.values(publishedLocalizedPaths).flat().filter(path=>path!=='/cart').length,'only published original-template translations enter the sitemap');
const report={base,checkedAt:new Date().toISOString(),checks,routes:urls.length,passed:true};
console.log(JSON.stringify(report));
