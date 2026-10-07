import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { ProductPage } from '@/components/product/ProductPage';
import { CartPageContent } from '@/components/cart/CartPageContent';
import { CartMinimalHeader } from '@/components/layout/CartMinimalHeader';
import { CartMinimalFooter } from '@/components/layout/CartMinimalFooter';
import { PolicyPage, type PolicyType } from '@/components/policies/PolicyPage';
import { buudyMask } from '@/data/products';
import { getLegalPolicies, localizePolicyLinks } from '@/lib/international/legal-policies';
import { languageAlternates } from '@/lib/international/markets';
import { publishedLocalizedPaths, isPublishedLocalizedPath } from '@/lib/international/rollout';
import { getInitialOffer } from '@/lib/international/server-offer';
import { getCurrentAccount } from '@/lib/account';
import french from '@/data/locales/storefront-fr.json';

type Props = {params: Promise<{locale: string; path?: string[]}>};
export const dynamicParams = false;
export function generateStaticParams({params:{locale}}:{params:{locale:string}}) { return (publishedLocalizedPaths[locale] || []).map(path => ({path:path.slice(1).split('/')})); }
async function route(params:Props['params']) { const p=await params; const path=`/${(p.path||[]).join('/')}`; if(p.locale!=='fr'||!isPublishedLocalizedPath(p.locale,path))notFound(); return {locale:p.locale,path}; }
export async function generateMetadata({params}:Props):Promise<Metadata> {
  const {path}=await route(params);
  const labels:Record<string,string>={'privacy-policy':'Politique de confidentialité','return-policy':'Politique de retour','shipping-policy':'Politique de livraison','refund-policy':'Politique de remboursement','terms-of-service':'Conditions de service','cookies-policy':'Politique relative aux cookies'};
  const label=labels[path.split('/').at(-1)||''];
  const title=path==='/cart'?'Panier':label||'Masque LED visage et cou Buudy';
  const description=path.includes('/products/')?'Découvrez le masque LED Buudy : 192 LED, sept couleurs, proche infrarouge à 830 nm, couverture du visage et du cou, coffret et cadeaux inclus.':path==='/cart'?'Retrouvez votre sélection Buudy et vos cadeaux inclus.':`Consultez ${title.toLowerCase()} de Buudy.`;
  return {title,description,alternates:{canonical:`/fr${path}`,...(path!=='/cart'?{languages:languageAlternates(path)}:{})},robots:path==='/cart'?{index:false,follow:false}:undefined,openGraph:{title,description,url:`/fr${path}`,locale:'fr_FR',siteName:'Buudy',images:[{url:buudyMask.gallery[0].src,alt:'Masque LED Buudy pour le visage et le cou'}]},twitter:{card:'summary_large_image',title,description}};
}
export default async function Page({params}:Props) {
  const {path}=await route(params);
  if(path==='/products/buudy-led-mask') {
    const offer=await getInitialOffer();
    const url='https://www.buudy.com/fr/products/buudy-led-mask';
    const schema={'@context':'https://schema.org','@type':'Product',name:'Masque LED Buudy pour le visage et le cou',description:'192 LED, sept couleurs visibles, proche infrarouge à 830 nm et design sans fil.',image:buudyMask.gallery.map(image=>new URL(image.src,'https://www.buudy.com').href),brand:{'@type':'Brand',name:'Buudy'},url,...(offer?{offers:{'@type':'Offer',price:offer.base.unitPrice,priceCurrency:'GBP',availability:'https://schema.org/InStock',url}}:{})};
    return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/><ProductPage product={buudyMask}/></>;
  }
  if(path==='/cart') {
    await connection();
    const account=await getCurrentAccount();
    return <><CartMinimalHeader/><CartPageContent initialCustomer={{fullName:account.profile?.full_name||'',email:account.user?.email||account.profile?.email||'',phone:account.profile?.phone||'',shippingLine1:account.profile?.shipping_line1||'',shippingLine2:account.profile?.shipping_line2||'',shippingCity:account.profile?.shipping_city||'',shippingState:account.profile?.shipping_state||'',shippingPostalCode:account.profile?.shipping_postal_code||'',shippingCountry:account.profile?.shipping_country||'FR',marketingOptIn:account.profile?.marketing_opt_in||false}}/><CartMinimalFooter/></>;
  }
  const legal=await getLegalPolicies('fr');
  const key=path.split('/').at(-1) as PolicyType;
  const html=legal?.documents[key==='refund-policy'?'return-policy':key];
  if(!html)notFound();
  const subtitles:Record<string,string>={'privacy-policy':'La collecte, la protection et l’utilisation de vos données personnelles.','return-policy':'Les conditions de retour et de remplacement.','refund-policy':'Annulations, remplacements et remboursements.','shipping-policy':'Préparation des commandes, délais et suivi de livraison.','terms-of-service':'Les conditions applicables à votre utilisation du site et à vos commandes.','cookies-policy':'L’utilisation des cookies sur le site Buudy.'};
  const englishTitles:Record<string,string>={'privacy-policy':'Privacy Policy','return-policy':'Return Policy','refund-policy':'Refund Policy','shipping-policy':'Shipping Policy','terms-of-service':'Terms of Service','cookies-policy':'Cookies Policy'};
  return <PolicyPage policyType={key} content={{title:french[englishTitles[key] as keyof typeof french],subtitle:subtitles[key],html:localizePolicyLinks(html,'fr'),eyebrow:'Politiques de la boutique'}}/>;
}
