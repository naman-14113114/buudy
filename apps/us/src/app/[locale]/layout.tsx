import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fraunces, Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HideOnPaths } from '@/components/layout/HideOnPaths';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CartProvider } from '@/components/cart/CartProvider';
import { OfferProvider } from '@/components/international/OfferProvider';
import { StoreLocaleProvider } from '@/components/international/StoreLocale';
import { GlobalImageLoader } from '@/components/ui/GlobalImageLoader';
import { AttributionCapture } from '@/components/integrations/AttributionCapture';
import { MarketingAnalytics } from '@/components/integrations/MarketingAnalytics';
import { ClarityAnalytics } from '@/components/integrations/ClarityAnalytics';
import { KlaviyoAnalytics } from '@/components/integrations/KlaviyoAnalytics';
import { TawkToWidget } from '@/components/integrations/TawkToWidget';
import { getInitialOffer } from '@/lib/international/server-offer';
import { publishedLocalizedPaths } from '@/lib/international/rollout';
import french from '@/data/locales/storefront-fr.json';
import '../globals.css';
import './international.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const fraunces = Fraunces({ subsets: ['latin'], style: ['normal','italic'], variable: '--font-fraunces', display: 'swap' });
const jetBrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal','italic'], variable: '--font-playfair', display: 'swap' });
export const metadata: Metadata = { metadataBase: new URL('https://www.buudy.com'), title: { default: 'Buudy', template: '%s | Buudy' }, robots: { index: true, follow: true } };
export function generateStaticParams() { return Object.keys(publishedLocalizedPaths).map(locale => ({locale})); }
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{locale: string}> }) {
  const { locale } = await params;
  if (locale !== 'fr') notFound();
  const initialOffer = await getInitialOffer();
  return <html lang={locale} className={`${inter.variable} ${fraunces.variable} ${jetBrains.variable} ${playfair.variable}`} data-scroll-behavior="smooth"><body>
    <GlobalImageLoader/>
    <StoreLocaleProvider locale={locale} messages={french}>
      <CartProvider><OfferProvider initialOffer={initialOffer}>
        <HideOnPaths paths={['/fr/cart']}><AnnouncementBar/><Header/></HideOnPaths>
        <main>{children}</main>
        <HideOnPaths paths={['/fr/cart']}><Footer/></HideOnPaths>
        <CartDrawer/>
      </OfferProvider></CartProvider>
      <AttributionCapture/><MarketingAnalytics/><ClarityAnalytics/><KlaviyoAnalytics enableExitPopup={false}/><TawkToWidget/>
    </StoreLocaleProvider>
  </body></html>;
}
