'use client';
import { useState } from 'react';
import { useCart } from '@/components/cart/CartProvider';
import { useOffer } from './OfferProvider';
import { NativePrice } from './NativePrice';
export function NativeCartTotal({showTotal=true}:{showTotal?:boolean}){
  const {offer}=useOffer();
  const {lines,manualPromoCode,applyManualPromoCode,clearManualPromoCode}=useCart();
  const [code,setCode]=useState('');const [error,setError]=useState(false);
  const quantity=lines.filter(l=>l.type==='product'&&l.productId==='buudy-led-mask').reduce((n,l)=>n+l.quantity,0);
  return <div className="space-y-3 text-sm">
    <div>Price per mask: <NativePrice/></div>
    <form className="flex flex-wrap gap-2" onSubmit={e=>{e.preventDefault();setError(!applyManualPromoCode(code));}}><label className="flex-1">Promotional code<input className="mt-1 w-full rounded border p-2" maxLength={60} value={code} onChange={e=>setCode(e.target.value)}/></label><button className="self-end rounded border p-2" type="submit">Apply</button></form>
    {error&&<p role="alert">This code is not available.</p>}
    {manualPromoCode&&<p>{manualPromoCode} <button className="underline" type="button" onClick={clearManualPromoCode}>Remove</button></p>}
    {offer&&showTotal&&<p className="border-t pt-4 text-lg">Product total in GBP: <strong>{new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'}).format(offer.base.unitPrice*quantity-(manualPromoCode?offer.base.discount:0))}</strong></p>}
    {!showTotal&&<p role="alert">The mask bundle uses a separate checkout. Remove the other products to continue with the mask, or remove the mask to purchase those products separately.</p>}
    <p className="text-xs leading-5">The checkout converts the whole basket. Its rounding may differ from multiplying the displayed unit price. Shipping and applicable taxes are confirmed before payment.</p>
  </div>;
}
