import type { Metadata } from "next";
import { headers } from "next/headers";
import { CommerceHomePage } from "@/components/home/CommerceHomePage";
import { HomePage } from "@/components/home/HomePage";
import { market } from "@/lib/market";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const legacyMetadata: Metadata = {
  title: "Best LED Face Mask US | Buudy Red Light Therapy",
  description:
    "Shop Buudy US for salon-grade LED face masks, red light therapy, blue light acne routines, anti-ageing skincare, near-infrared support, neck coverage, and free tracked shipping.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Best LED Face Mask US",
    "red light therapy mask US",
    "LED face mask for acne US",
    "anti ageing LED mask US",
    "home LED light therapy",
  ],
  openGraph: {
    title: "Best LED Face Mask US | Buudy",
    description:
      "Discover the Buudy LED Mask with 192 LEDs, red and blue light therapy, near-infrared support, and full face plus neck coverage.",
    url: market.siteUrl,
    images: [
      {
        url: "/images/products/buudy-led-mask/09-buudy-led-mask-home-spa.webp",
        width: 1200,
        height: 900,
        alt: "Buudy LED light therapy mask at home",
      },
    ],
  },
};

async function isMainBuudyDomain() {
  const requestHeaders = await headers();
  const host = (requestHeaders.get("host") ?? "").split(":")[0].toLowerCase();
  return ["buudy.com", "www.buudy.com", "localhost", "127.0.0.1"].includes(host);
}

export async function generateMetadata(): Promise<Metadata> {
  if (!(await isMainBuudyDomain())) return legacyMetadata;
  return {
    ...legacyMetadata,
    title: { absolute: "Buudy | LED Light Therapy for Your At-Home Skincare Ritual" },
    description: "Discover the Buudy LED face and neck mask: 192 LEDs, seven visible light colors, 830 nm near-infrared, cordless care, and your own at-home ritual.",
    alternates: { canonical: "https://www.buudy.com/" },
    openGraph: {
      title: "Good skin days start with light | Buudy",
      description: "Your skin. Your light. Your time. Meet the Buudy LED face and neck mask.",
      url: "https://www.buudy.com/",
      images: [{ url: "https://www.buudy.com/images/home/09-home-younger-you.png", width: 1629, height: 907, alt: "At-home light therapy with the Buudy LED Mask" }],
    },
  };
}

export default async function Page() {
  const isBuudyCom = await isMainBuudyDomain();
  return (
    <>
      {[organizationJsonLd(), websiteJsonLd()].map((schema, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: isBuudyCom ? JSON.stringify(schema).replaceAll(market.siteUrl, "https://www.buudy.com") : JSON.stringify(schema) }}
          key={index}
          type="application/ld+json"
        />
      ))}
      {isBuudyCom ? <CommerceHomePage /> : <HomePage />}
    </>
  );
}
