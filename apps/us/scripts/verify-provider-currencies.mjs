import fs from 'node:fs/promises';
import { currencies } from '../src/lib/international/markets.ts';
import { getXpageQuote } from '../src/lib/xpage-checkout.ts';
const result=[];
for(let i=0;i<currencies.length;i+=2){
 const batch=await Promise.allSettled(currencies.slice(i,i+2).map(currency=>getXpageQuote(currency)));
 for(let j=0;j<batch.length;j++){
  const item=batch[j];result.push(item.status==='fulfilled'?{currency:currencies[i+j],status:'native quote verified',quote:item.value}:{currency:currencies[i+j],status:'unavailable',reason:item.reason?.message||'Provider unavailable'});
 }
 console.log(JSON.stringify({checked:result.length,total:currencies.length,unavailable:result.filter(r=>r.status==='unavailable').length}));
}
const report={checkedAt:new Date().toISOString(),scope:'Public landing-page GETs only; no checkout sessions, addresses, payments or settings writes.',results:result};
if(process.argv[2])await fs.writeFile(process.argv[2],JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({checked:result.length,unavailable:result.filter(r=>r.status==='unavailable')}));
