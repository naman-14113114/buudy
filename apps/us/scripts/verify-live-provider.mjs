// Creates ONE fresh unpaid test session. Never supplies contact/address/payment data.
import { createXpageCheckout, getXpageQuote } from '../src/lib/xpage-checkout.ts';
import fs from 'node:fs/promises';
const session=await createXpageCheckout(2,true,fetch,'EUR');
const results=[];
for(const currency of ['GBP','USD','EUR','DKK','SEK']){
 const [quote,r]=await Promise.all([getXpageQuote(currency),fetch(session.checkoutUrl.replace('currency=EUR',`currency=${currency}`),{signal:AbortSignal.timeout(30000)})]);
 const html=await r.text();
 const text=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
 const summary=text.slice(text.indexOf('Order summary'),text.indexOf('Pay now'));
 const settlementCurrency=html.match(/currency:\s*['"]([a-z]{3})['"]/)?.[1];
 results.push({currency,status:r.status,quote,summary,settlementCurrency,hasPayment:r.ok&&text.includes('Pay now')});
}
const evidence={checkedAt:new Date().toISOString(),quantity:2,promo:'BUUDY10',scope:'Unpaid session; no contact, address or payment; provider configuration unchanged.',results};
if(process.argv[2])await fs.writeFile(process.argv[2],JSON.stringify(evidence,null,2));
console.log(JSON.stringify(evidence,null,2));
