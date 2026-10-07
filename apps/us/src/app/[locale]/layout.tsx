import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Inter, Fraunces } from 'next/font/google';
import { hasLocale, languages, localePath } from '@/lib/international/markets';
import { languageDirection } from '@/lib/international/country-languages';
import { getDictionary } from '@/lib/international/dictionaries';
import { LanguageSwitcher } from '@/components/international/LanguageSwitcher';
import { OfferProvider } from '@/components/international/OfferProvider';
import { CartProvider } from '@/components/cart/CartProvider';
import { AttributionCapture } from '@/components/integrations/AttributionCapture';
import { MarketingAnalytics } from '@/components/integrations/MarketingAnalytics';
import { ClarityAnalytics } from '@/components/integrations/ClarityAnalytics';
import { KlaviyoAnalytics } from '@/components/integrations/KlaviyoAnalytics';
import { getInitialOffer } from '@/lib/international/server-offer';
import { getLegalPolicies } from '@/lib/international/legal-policies';
import { localizedStorefrontEnabled } from '@/lib/international/rollout';
import '../globals.css';
import './international.css';
const inter=Inter({subsets:['latin'],variable:'--font-inter',display:'swap'});
const fraunces=Fraunces({subsets:['latin'],variable:'--font-fraunces',display:'swap'});
export const metadata:Metadata={metadataBase:new URL('https://www.buudy.com'),title:{default:'Buudy',template:'%s | Buudy'},robots:{index:true,follow:true}};
export function generateStaticParams(){return (localizedStorefrontEnabled?Object.keys(languages).filter(locale=>locale!=='en'):[]).map(locale=>({locale}));}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}){
  const {locale}=await params;
  if(!hasLocale(locale)||locale==='en')notFound();
  const [d,legal,initialOffer]=await Promise.all([getDictionary(locale),getLegalPolicies(locale),getInitialOffer()]);
  const nav=[['/products/buudy-led-mask',d.shop],['/pages/faqs',d.faq],['/pages/contact-us',d.contact],['/cart',d.cart]];
  return <html lang={locale} dir={languageDirection(locale)} className={`${inter.variable} ${fraunces.variable}`}><body className="international">
    <a className="intl-skip" href="#content">{d.skip}</a>
    <header className="intl-header"><a className="intl-logo" href={localePath(locale)} aria-label={`Buudy · ${d.home}`}>buudy<span>®</span></a><nav>{nav.map(([path,label])=><a href={localePath(locale,path)} key={path}>{label}</a>)}</nav><LanguageSwitcher locale={locale} label={d.language}/></header>
    <CartProvider><OfferProvider initialOffer={initialOffer}><main id="content">{children}</main></OfferProvider></CartProvider>
    <footer className="intl-footer"><div><a className="intl-logo" href={localePath(locale)}>buudy<span>®</span></a><p>{d.aboutText}</p></div><nav>
      {[["/pages/about-us",d.about],["/pages/contact-us",d.contact],["/policies/shipping-policy",d.shipping],["/policies/return-policy",d.returns]].map(([path,label])=><a href={localePath(locale,path)} key={path}>{label}</a>)}
      <Link href={legal?localePath(locale,'/policies/privacy-policy'):'/policies/privacy-policy'} lang={legal?locale:'en'}>{legal?legal.labels.privacy:d.privacy}</Link><Link href={legal?localePath(locale,'/policies/terms-of-service'):'/policies/terms-of-service'} lang={legal?locale:'en'}>{legal?legal.labels.terms:d.terms}</Link>
      {legal&&<a href={localePath(locale,'/policies/cookies-policy')}>{legal.labels.cookies}</a>}
      <a href="https://learn.buudy.com">{d.learn}</a><a href="https://app.buudy.com">{d.companion}</a>
    </nav></footer>
    <AttributionCapture/><MarketingAnalytics/><ClarityAnalytics/><KlaviyoAnalytics enableExitPopup={false}/>
  </body></html>;
}
