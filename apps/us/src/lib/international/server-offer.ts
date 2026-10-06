import { unstable_cache } from 'next/cache';
import { getXpageQuote } from '@/lib/xpage-checkout';
// Persist only validated public amounts. Provider session data never enters this cache.
const readBase=unstable_cache(()=>getXpageQuote('GBP'),['buudy-native-base-offer-v1'],{revalidate:60});
export async function getInitialOffer(){
  try {const base=await readBase();return Date.now()-Date.parse(base.checkedAt)<600000?{quote:base,base}:null;}
  catch {return null;}
}
