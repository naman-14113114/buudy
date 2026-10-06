import type { Metadata } from "next";
import { EbookDownloadPage } from "@/components/ebook/EbookDownloadPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Clinical Light Masterclass E-Book (Free PDF Download) | Buudy",
  description:
    "Download the official 40+ page Clinical Light Masterclass E-Book by Buudy: 7-colour photobiomodulation guide, 830nm NIR protocols, target & flood synergy, and active skincare chemistry.",
  alternates: {
    canonical: "/skincare-ebook",
  },
  openGraph: {
    title: "The Clinical Light Masterclass E-Book (Free PDF Download) | Buudy",
    description:
      "Download the official 40+ page Clinical Light Masterclass E-Book: 7-colour light therapy, bespoke skin pathways, and active skincare synergy.",
    url: absoluteUrl("/skincare-ebook"),
  },
};

export default function Page() {
  return <EbookDownloadPage />;
}
