'use client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { XpageQuote } from '@/lib/xpage-checkout';
import { currencies } from '@/lib/international/markets';
type Offer = {quote:XpageQuote;base:XpageQuote};
const Context=createContext<{offer:Offer|null;loading:boolean;failed:boolean;refresh:(currency?:string)=>void}|null>(null);
export function OfferProvider({children,initialOffer=null}:{children:React.ReactNode;initialOffer?:Offer|null}) {
  const [offer,setOffer]=useState<Offer|null>(initialOffer);
  const [loading,setLoading]=useState(true);
  const [failed,setFailed]=useState(false);
  const [selected,setSelected]=useState<string|undefined>();
  const [revision,setRevision]=useState(0);
  const refresh=useCallback((currency?:string)=>{
    if(currency&&currencies.includes(currency)){
      const url=new URL(window.location.href);
      url.searchParams.set('currency',currency);
      window.history.replaceState(null,'',url);
    }
    setLoading(true);setFailed(false);setSelected(currency);setRevision(n=>n+1);
  },[]);
  useEffect(()=>{
    const controller=new AbortController();
    const queryCurrency=new URLSearchParams(window.location.search).get('currency');
    const requested=selected || (queryCurrency&&currencies.includes(queryCurrency)?queryCurrency:undefined);
    fetch(`/api/offer${requested?`?currency=${requested}`:''}`,{signal:controller.signal,cache:'no-store'})
      .then(async response=>{if(!response.ok)throw new Error('Offer unavailable');return response.json() as Promise<Offer>;})
      .then(data=>{setOffer(data);document.cookie=`buudy_currency=${data.quote.currency}; Path=/; Max-Age=31536000; SameSite=Lax`;})
      .catch(error=>{if(error.name!=='AbortError'){setFailed(true);setOffer(null);}})
      .finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return ()=>controller.abort();
  },[selected,revision]);
  return <Context.Provider value={{offer,loading,failed,refresh}}>{children}</Context.Provider>;
}
export function useOffer(){const value=useContext(Context);if(!value)throw new Error('Missing offer provider');return value;}
