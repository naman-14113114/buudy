import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FreeGiftDetailPage } from "@/components/gifts/FreeGiftDetailPage";
import { freeGiftDetails, getFreeGiftDetail } from "@/data/freeGifts";
import { absoluteUrl } from "@/lib/site";

type GiftPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return freeGiftDetails.map((gift) => ({ slug: gift.slug }));
}

export async function generateMetadata({
  params,
}: GiftPageProps): Promise<Metadata> {
  const { slug } = await params;
  const gift = getFreeGiftDetail(slug);

  if (!gift) {
    return {};
  }

  const url = absoluteUrl(`/pages/${gift.slug}`);

  return {
    title: gift.seoTitle,
    description: gift.seoDescription,
    alternates: {
      canonical: `/pages/${gift.slug}`,
    },
    openGraph: {
      title: gift.seoTitle,
      description: gift.seoDescription,
      images: [{ alt: gift.imageAlt, url: gift.image }],
      url,
    },
  };
}

export default async function Page({ params }: GiftPageProps) {
  const { slug } = await params;
  const gift = getFreeGiftDetail(slug);

  if (!gift) {
    notFound();
  }

  return <FreeGiftDetailPage gift={gift} />;
}
