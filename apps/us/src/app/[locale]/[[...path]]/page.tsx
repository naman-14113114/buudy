import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { hasLocale, pathsForLocale, languageAlternates, localePath } from '@/lib/international/markets';
import { getLegalPolicies, localizePolicyLinks, type LegalPolicies } from '@/lib/international/legal-policies';
import { getDictionary, type Dictionary } from '@/lib/international/dictionaries';
import { LocalizedShop } from '@/components/international/LocalizedShop';
import { getInitialOffer } from '@/lib/international/server-offer';
type Props={params:Promise<{locale:string;path?:string[]}>};
export const dynamicParams=false;
export function generateStaticParams({params:{locale}}:{params:{locale:string}}){return pathsForLocale(locale).map(path=>({path:path==='/'?[]:path.slice(1).split('/')}));}
async function context(params:Props['params']){
  const p=await params;const path=`/${(p.path||[]).join('/')}`;
  if(!hasLocale(p.locale)||p.locale==='en'||!pathsForLocale(p.locale).includes(path))notFound();
  const [d,legal]=await Promise.all([getDictionary(p.locale),getLegalPolicies(p.locale)]);
  return {locale:p.locale,path,d,legal};
}
function pageTitle(path:string,d:Dictionary,legal:LegalPolicies|null=null){
  if(legal){const titles:Record<string,string>={'/policies/privacy-policy':legal.labels.privacy,'/policies/terms-of-service':legal.labels.terms,'/policies/cookies-policy':legal.labels.cookies,'/policies/refund-policy':legal.labels.refund};if(titles[path])return titles[path];}
  const titles:Record<string,string>={'/':d.homeTitle,'/products/buudy-led-mask':d.productTitle,'/cart':d.cart,'/pages/contact-us':d.contact,'/pages/about-us':d.about,'/pages/faqs':d.faq,'/policies/shipping-policy':d.shipping,'/policies/return-policy':d.returns};
  return titles[path];
}
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {locale,path,d,legal}=await context(params);
  const title=pageTitle(path,d,legal);
  const legalKey=(path.endsWith('refund-policy')?'return-policy':path.split('/').at(-1)) as keyof LegalPolicies['documents'];
  const legalHtml=legal&&path.startsWith('/policies/')?legal.documents[legalKey]:null;
  const legalDescription=legalHtml?.match(/<p>[^]*?<\/p>/g)?.map(p=>p.replace(/<[^>]+>/g,'').trim()).find(p=>p.length>70)?.slice(0,240);
  const description=legalDescription||(path==='/'?d.homeIntro:path.includes('product')?d.productDescription:path.includes('shipping')?d.shippingTimes:path.includes('return')?d.returnText:path.includes('contact')?d.contactText:d.aboutText);
  return {title,description,alternates:{canonical:localePath(locale,path),...(path!=='/cart'?{languages:languageAlternates(path)}:{})},robots:path==='/cart'?{index:false,follow:true}:undefined,
    openGraph:{title,description,url:localePath(locale,path),siteName:'Buudy',type:'website',locale,images:[{url:'/images/products/buudy-led-mask/01-buudy-led-mask-front.webp',alt:d.imageAlt}]},twitter:{card:'summary_large_image',title,description}};
}
function Questions({d}:{d:Dictionary}){return <section className="intl-section"><h2>{d.faq}</h2>{[1,2,3,4,5].map(i=><details className="intl-faq" key={i}><summary>{d[`faq${i}q` as keyof Dictionary]}</summary><p>{d[`faq${i}a` as keyof Dictionary]}</p></details>)}</section>;}
export default async function Page({params}:Props){
  const {locale,path,d,legal}=await context(params);
  const initialOffer=path==='/products/buudy-led-mask'?await getInitialOffer():null;
  if(legal&&path.startsWith('/policies/')){
    const key=path.split('/').at(-1)==='refund-policy'?'return-policy':path.split('/').at(-1) as keyof LegalPolicies['documents'];
    const html=legal.documents[key];
    if(!html)notFound();
    return <article className="intl-section intl-document intl-legal"><h1>{pageTitle(path,d,legal)}</h1>{key==='return-policy'&&<aside className="intl-panel"><p>{d.returnText}</p></aside>}<div dangerouslySetInnerHTML={{__html:localizePolicyLinks(html,locale)}}/><p><a href={localePath(locale,'/products/buudy-led-mask')}>{d.explore}</a></p></article>;
  }
  if(path==='/')return <>
    <section className="intl-hero"><div><p className="intl-eyebrow">BUUDY</p><h1>{d.homeTitle}</h1><p>{d.homeIntro}</p><a className="intl-button" href={localePath(locale,'/products/buudy-led-mask')}>{d.explore}</a></div><Image priority src="/images/products/buudy-led-mask/09-buudy-led-mask-home-spa.webp" width={1200} height={900} alt={d.imageAlt}/></section>
    <section className="intl-section"><h2>{d.featuresTitle}</h2><div className="intl-features">{[d.feature1,d.feature2,d.feature3,d.feature4].map(text=><p key={text}>{text}</p>)}</div><p>{d.homeDetail}</p></section><Questions d={d}/>
  </>;
  if(path==='/products/buudy-led-mask')return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Product',name:d.productTitle,description:d.productDescription,image:'https://www.buudy.com/images/products/buudy-led-mask/01-buudy-led-mask-front.webp',brand:{'@type':'Brand',name:'Buudy'},url:`https://www.buudy.com${localePath(locale,path)}`,...(initialOffer?{offers:{'@type':'Offer',priceCurrency:'GBP',price:initialOffer.base.unitPrice,availability:'https://schema.org/InStock',url:`https://www.buudy.com${localePath(locale,path)}`}}:{})}).replace(/</g,'\\u003c')}}/>
    <section className="intl-hero intl-product"><Image priority src="/images/products/buudy-led-mask/01-buudy-led-mask-front.webp" width={1200} height={1500} alt={d.imageAlt}/><div><p className="intl-eyebrow">BUUDY</p><h1>{d.productTitle}</h1><p>{d.productIntro}</p><ul className="intl-points">{[d.feature1,d.feature2,d.feature3,d.feature4].map(text=><li key={text}>{text}</li>)}</ul><LocalizedShop locale={locale} d={d}/></div></section>
    <section className="intl-section intl-story"><div><h2>{d.designTitle}</h2><p>{d.designText}</p><h2>{d.routineTitle}</h2><p>{d.routineText}</p></div><Image src="/images/products/buudy-led-mask/02-buudy-led-mask-side-profile.webp" width={1000} height={1250} alt={d.detailImageAlt}/></section>
    <section className="intl-section"><h2>{d.includedTitle}</h2><p>{d.includedText}</p><h2>{d.safetyTitle}</h2><p>{d.safetyText}</p></section><Questions d={d}/>
  </>;
  if(path==='/cart')return <section className="intl-section intl-document"><h1>{d.cart}</h1><LocalizedShop locale={locale} d={d} cart/></section>;
  if(path==='/pages/faqs')return <><section className="intl-section"><h1>{d.faq}</h1></section><Questions d={d}/></>;
  const shipping=path.includes('shipping');const returns=path.includes('return');
  const paragraphs=shipping?[d.shippingText,d.shippingTimes,d.shippingTracking,d.shippingCosts]:returns?[d.returnText,d.returnCancel,d.returnRefund]:path.includes('contact')?[d.contactText,d.supportHours]:[d.aboutText,d.homeDetail];
  return <article className="intl-section intl-document"><h1>{pageTitle(path,d)}</h1>{paragraphs.map(text=><p key={text}>{text}</p>)}
    <p><a href="mailto:support@buudy.co.uk">support@buudy.co.uk</a></p>
    {(shipping||returns)&&<aside className="intl-panel"><p>{d.policySummary}</p><a href={path} lang="en">{d.fullPolicy}</a></aside>}
    <p><a href={localePath(locale,'/products/buudy-led-mask')}>{d.explore}</a></p>
  </article>;
}
