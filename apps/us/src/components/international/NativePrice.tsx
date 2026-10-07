'use client';
import { useOffer } from './OfferProvider';
import { Price } from '@/components/ui/Price';
export function NativePrice({large=false}:{large?:boolean}){
  const {offer,loading}=useOffer();
  if(large&&offer)return <Price priceCents={Math.round(offer.quote.unitPrice*100)} compareAtCents={offer.quote.compareAtPrice&&offer.quote.compareAtPrice>offer.quote.unitPrice?Math.round(offer.quote.compareAtPrice*100):undefined} currency={offer.quote.currency}/>;
  const label=offer?new Intl.NumberFormat('en',{style:'currency',currency:offer.quote.currency}).format(offer.quote.unitPrice):loading?'Loading current price…':'Price unavailable';
  return <span aria-live="polite">{label}</span>;
}
