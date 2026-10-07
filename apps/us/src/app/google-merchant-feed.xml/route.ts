import { buildGoogleMerchantXml, googleMerchantProducts } from "@/lib/googleMerchant";
import { getXpageQuote } from '@/lib/xpage-checkout';

export const dynamic = 'force-dynamic';

export async function GET() {
  let quote;
  try {quote=await getXpageQuote('GBP');} catch {return new Response('Offer temporarily unavailable',{status:503,headers:{'cache-control':'no-store'}});}
  const items=googleMerchantProducts.filter(product=>product.id!=='buudy-7-colour-led-mask-us').map(product=>product.id==='buudy-led-face-mask-us'?{
    ...product,price:`${quote.unitPrice.toFixed(2)} GBP`,link:product.link,
    description:'Buudy LED mask for face and neck, with seven visible colours and an 830 nm near-infrared mode. Cordless, rechargeable design. Premium Travel Box included. Check the current bundle, delivery availability and complete terms before purchase.',
  }:product);
  return new Response(buildGoogleMerchantXml(items), {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=60",
    },
  });
}
