import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CartMinimalFooter } from "@/components/layout/CartMinimalFooter";
import { CartMinimalHeader } from "@/components/layout/CartMinimalHeader";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { RouteChrome } from "@/components/layout/RouteChrome";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartProvider";
import { ClarityAnalytics } from "@/components/integrations/ClarityAnalytics";
import { KlaviyoAnalytics } from "@/components/integrations/KlaviyoAnalytics";
import { PageMediaPreloader } from "@/components/integrations/PageMediaPreloader";
import { TawkToWidget } from "@/components/integrations/TawkToWidget";
import { market } from "@/lib/market";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetBrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(market.siteUrl),
  title: {
    default: "Best LED Face Mask US | Buudy Light Therapy",
    template: "%s | Buudy",
  },
  description:
    "US LED face mask for red light therapy, blue light acne routines, anti-ageing skincare, full face and neck coverage, and salon-grade home treatments.",
  applicationName: "Buudy",
  keywords: [
    "Best LED Face Mask US",
    "LED face mask US",
    "red light therapy mask US",
    "LED face mask for acne US",
    "anti ageing LED mask",
    "near infrared face mask",
    "home light therapy mask",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    siteName: "Buudy",
    type: "website",
    url: market.siteUrl,
    locale: "en_US",
    title: "Best LED Face Mask US | Buudy Light Therapy",
    description:
      "Salon-grade LED face and neck mask for US skincare routines with 192 LEDs, 7 wavelengths plus 830nm near-infrared, and a launch glow kit.",
    images: [
      {
        url: "/images/products/buudy-led-mask/01-buudy-led-mask-front.webp",
        width: 1200,
        height: 1500,
        alt: "Buudy LED Face Mask with neck coverage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best LED Face Mask US | Buudy",
    description:
      "192 LEDs, red and blue light therapy, near-infrared support, cordless wearability, and face plus neck coverage.",
    images: ["/images/products/buudy-led-mask/01-buudy-led-mask-front.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={`${inter.variable} ${fraunces.variable} ${jetBrains.variable} ${playfair.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <CartProvider>
          <RouteChrome
            cartFooter={<CartMinimalFooter />}
            cartHeader={
              <>
                <AnnouncementBar />
                <CartMinimalHeader />
              </>
            }
            defaultFooter={<Footer />}
            defaultHeader={
              <>
                <AnnouncementBar />
                <Header />
              </>
            }
          >
            {children}
          </RouteChrome>
          <PageMediaPreloader />
          <CartDrawer />
        </CartProvider>
        <ClarityAnalytics />
        <KlaviyoAnalytics />
        <TawkToWidget />
      </body>
    </html>
  );
}
