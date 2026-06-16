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
    default: "Best LED Face Mask Canada | Buudy Light Therapy",
    template: "%s | Buudy",
  },
  description:
    "Canada LED face mask for red light therapy, blue light acne routines, anti-ageing skincare, full face and neck coverage, and salon-grade home treatments.",
  applicationName: "Buudy",
  keywords: [
    "Best LED Face Mask Canada",
    "LED face mask Canada",
    "red light therapy mask Canada",
    "LED face mask for acne Canada",
    "anti ageing LED mask",
    "near infrared face mask",
    "home light therapy mask",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-CA": "/",
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
    locale: "en_CA",
    title: "Best LED Face Mask Canada | Buudy Light Therapy",
    description:
      "Salon-grade LED face and neck mask for Canadian skincare routines with 192 LEDs, 7 wavelengths plus 830nm near-infrared, and a launch glow kit.",
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
    title: "Best LED Face Mask Canada | Buudy",
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
      lang="en-CA"
      className={`${inter.variable} ${fraunces.variable} ${jetBrains.variable} ${playfair.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <CartProvider>
          <RouteChrome
            cartFooter={<CartMinimalFooter />}
            cartHeader={<CartMinimalHeader />}
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
          <CartDrawer />
        </CartProvider>
        <ClarityAnalytics />
        <KlaviyoAnalytics />
        <TawkToWidget />
      </body>
    </html>
  );
}
