'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart, writeCheckoutSnapshot } from '@/components/cart/CartProvider';
import { buudyMask } from '@/data/products';
import { currencies, localePath, type Locale } from '@/lib/international/markets';
import type { Dictionary } from '@/lib/international/dictionaries';
import { useOffer } from './OfferProvider';

export function LocalizedShop({locale,d,cart=false}:{locale:Locale;d:Dictionary;cart?:boolean}) {
  const state=useCart();
  const {offer,loading,failed,refresh}=useOffer();
  const [code,setCode]=useState('');
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const [added,setAdded]=useState(false);
  const line=state.lines.find(item=>item.type==='product'&&item.productId==='buudy-led-mask');
  const mixed=state.lines.some(item=>item.type==='product'&&item.productId!=='buudy-led-mask');
  const quantity=line?.quantity || 1;
  const money=(amount:number,currency:string)=>new Intl.NumberFormat(locale,{style:'currency',currency}).format(amount);
  useEffect(()=>{const reset=()=>setBusy(false);window.addEventListener('pageshow',reset);return()=>window.removeEventListener('pageshow',reset);},[]);
  async function checkout(){
    if(!line||!offer||busy||mixed)return;
    setBusy(true);setError('');
    writeCheckoutSnapshot({lines:state.lines,giftMessage:state.giftMessage,promoCode:state.promoCode,manualPromoCode:state.manualPromoCode});
    window.dispatchEvent(new CustomEvent('buudy:started-checkout',{detail:{lines:state.lines,currency:'GBP',unitPrice:offer.base.unitPrice,total:offer.base.unitPrice*quantity-(state.manualPromoCode?offer.base.discount:0),quantity,locale,checkoutUrl:localePath(locale,'/cart'),productUrl:localePath(locale,'/products/buudy-led-mask'),totals:{totalCents:Math.round((offer.base.unitPrice*quantity-(state.manualPromoCode?offer.base.discount:0))*100),currency:'GBP'}}}));
    try {
      const response=await fetch('/api/checkout/prepare',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({currency:offer.quote.currency,cart:{lines:state.lines,manualPromoCode:state.manualPromoCode}})});
      const result=await response.json();
      if(!response.ok||!result.checkoutUrl)throw new Error('Checkout unavailable');
      const url=new URL(result.checkoutUrl);
      if(url.origin!=='https://mask.buudy.com')throw new Error('Unexpected checkout');
      const link=document.createElement('a');link.href=url.href;link.referrerPolicy='no-referrer';link.rel='noreferrer';link.click();
    }catch{setBusy(false);setError(d.checkoutError);}
  }
  if(cart&&!state.isHydrated)return <p role="status">{d.loading}</p>;
  if(cart&&!line)return <div className="intl-panel"><p>{d.empty}</p>{mixed&&<p><Link href="/cart">{d.englishCart}</Link></p>}<a href={localePath(locale,'/products/buudy-led-mask')}>{d.continue}</a></div>;
  return <div className="intl-offer">
    {cart&&<div className="flex items-center gap-5"><Image src="/images/products/buudy-led-mask/01-buudy-led-mask-front.webp" width={96} height={96} alt={d.imageAlt} className="rounded-xl"/><h2>{d.productTitle}</h2></div>}
    <label className="intl-field">{d.currency}<select aria-label={d.currency} value={offer?.quote.currency || ''} disabled={loading} onChange={event=>refresh(event.target.value)}><option value="" disabled>…</option>{currencies.map(c=><option key={c} value={c}>{c}</option>)}</select></label>
    <div aria-live="polite">
      {loading&&<p>{d.loading}</p>}
      {failed&&<p role="alert">{d.priceError} <button type="button" onClick={()=>refresh()}>{d.retry}</button></p>}
      {offer&&<><p className="intl-price"><small>{d.unit}</small><bdi>{money(offer.quote.unitPrice,offer.quote.currency)}</bdi></p>{!cart&&offer.quote.currency!=='GBP'&&<p className="intl-note">{d.total}: <bdi>{money(offer.base.unitPrice,'GBP')}</bdi></p>}</>}
    </div>
    <p>{d.gift}<br/><small>{d.free}</small></p>
    {cart ? <>
      <label className="intl-field">{d.quantity}<input type="number" min="1" max="100" step="1" value={quantity} onChange={e=>{const q=Number(e.target.value);if(Number.isInteger(q)&&q>=1&&q<=100)state.setQuantity('buudy-led-mask',q);}}/></label>
      <button type="button" onClick={()=>state.removeProduct('buudy-led-mask')}>{d.remove}</button>
      <form className="intl-promo" onSubmit={e=>{e.preventDefault();setError(state.applyManualPromoCode(code)?'':d.invalidPromo);}}>
        <label>{d.promo}<input value={code} onChange={e=>setCode(e.target.value)} maxLength={60}/></label><button type="submit">{d.apply}</button>
      </form>
      {state.manualPromoCode&&<p>{state.manualPromoCode} <button type="button" onClick={()=>state.clearManualPromoCode()}>{d.remove}</button></p>}
      {offer&&<><p>{d.total}: <strong><bdi>{money(offer.base.unitPrice*quantity-(state.manualPromoCode?offer.base.discount:0),'GBP')}</bdi></strong></p>{state.manualPromoCode&&<p>{d.discount}: <bdi>{money(offer.base.discount,'GBP')}</bdi></p>}<p className="intl-note">{d.basketConversion}</p></>}
      {mixed&&<p role="alert">{d.mixedCart} <Link href="/cart">{d.englishCart}</Link></p>}
      <button className="intl-button" type="button" disabled={!offer||loading||busy||mixed} onClick={checkout}>{busy?d.loading:d.checkout}</button>
    </> : <>
      <button className="intl-button" type="button" disabled={!offer||loading} onClick={()=>{if(offer)state.addProduct(buudyMask,{currency:offer.quote.currency,unitPrice:offer.quote.unitPrice,quantity:1,locale,checkoutUrl:localePath(locale,'/cart'),productUrl:localePath(locale,'/products/buudy-led-mask')});setAdded(true);}}>{d.add}</button>
      {added&&<p role="status">{d.added} · <a href={localePath(locale,'/cart')}>{d.cart}</a></p>}
    </>}
    {error&&<p role="alert">{error}</p>}
    <p className="intl-note">{d.settlement}</p>
  </div>;
}
