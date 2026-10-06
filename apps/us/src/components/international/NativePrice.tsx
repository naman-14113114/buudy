'use client';
import { useOffer } from './OfferProvider';
import { currencies } from '@/lib/international/markets';
export function NativePrice({controls=false}:{controls?:boolean}){
  const {offer,loading,failed,refresh}=useOffer();
  const label=offer?new Intl.NumberFormat('en',{style:'currency',currency:offer.quote.currency}).format(offer.quote.unitPrice):loading?'Loading current price…':'Price unavailable';
  return <><span aria-live="polite">{label}</span>{controls&&<div className="mt-2 text-xs font-normal">
    <label>Display currency <select className="ml-2 rounded border p-1" disabled={loading} value={offer?.quote.currency||''} onChange={e=>refresh(e.target.value)}><option value="" disabled>…</option>{currencies.map(c=><option key={c} value={c}>{c}</option>)}</select></label>
    {failed&&<button className="ml-2 underline" type="button" onClick={()=>refresh()}>Try again</button>}
    <p className="mt-2 leading-5">Payment is processed in GBP. Review the final amount, shipping and taxes before paying. Your bank may apply currency conversion or fees.</p>
  </div>}</>;
}
