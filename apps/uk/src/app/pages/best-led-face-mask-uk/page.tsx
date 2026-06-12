import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Star, Zap } from "lucide-react";
import { buudyMask } from "@/data/products";
import { ledMaskSeoFaqs } from "@/data/seoFaqs";
import {
  breadcrumbJsonLd,
  guidePageJsonLd,
  organizationJsonLd,
  productJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { formatMoney } from "@/lib/money";
import { Button } from "@/components/ui/Button";

const pageTitle = "Best LED Face Mask UK 2026: What to Look For";
const pageDescription =
  "A UK buyer's guide to choosing the best LED face mask for red light therapy, blue light acne routines, anti-ageing skincare, near-infrared support, neck coverage, and value.";

const checkpoints = [
  {
    title: "Red and near-infrared support",
    copy: "Red light is the mode most shoppers connect with fine-line, firmness, and radiance routines. Near-infrared is commonly used for deeper light-therapy support.",
  },
  {
    title: "Blue light for breakout-prone skin",
    copy: "If acne-prone skin is part of the reason you are buying, choose a mask with a dedicated blue light mode rather than a red-only device.",
  },
  {
    title: "Coverage that includes the neck",
    copy: "A mask that only covers the face can leave your neck out of the routine. Buudy covers the face and neck together.",
  },
  {
    title: "Comfort and consistency",
    copy: "The best device is the one you will keep using. Cordless wearability, simple controls, and short sessions reduce friction.",
  },
  {
    title: "Transparent UK value",
    copy: "Compare the LEDs, modes, coverage, included accessories, warranty, and return window before comparing price alone.",
  },
  {
    title: "Safety guidance",
    copy: "Avoid LED devices without medical advice if you are pregnant, have epilepsy, are light-sensitive, or take medication that increases photosensitivity.",
  },
];

const comparisonRows = [
  ["LED count", "192 high-density LEDs"],
  ["Light modes", "7 visible colours plus 830nm near-infrared"],
  ["Key routines", "Anti-ageing, breakout-prone skin, uneven tone, radiance"],
  ["Coverage", "Full face and neck"],
  ["Use style", "Cordless, rechargeable, hands-free, tap control"],
  ["UK offer", `${formatMoney(buudyMask.priceCents, buudyMask.currency)} launch price with free glow kit`],
  ["Guarantee", "90-day money back guarantee"],
];

export const metadata: Metadata = {
  title: "Best LED Face Mask UK 2026 | Red Light Therapy Guide",
  description: pageDescription,
  alternates: {
    canonical: "/pages/best-led-face-mask-uk",
  },
  keywords: [
    "best LED face mask UK",
    "best red light therapy mask UK",
    "LED face mask acne UK",
    "LED mask anti ageing UK",
    "near infrared LED face mask",
    "LED face mask with neck coverage",
  ],
  openGraph: {
    title: "Best LED Face Mask UK 2026: Buyer Guide",
    description: pageDescription,
    url: absoluteUrl("/pages/best-led-face-mask-uk"),
    type: "article",
    images: [
      {
        url: "/images/products/buudy-led-mask/09-buudy-led-mask-home-spa.webp",
        width: 1200,
        height: 900,
        alt: "Buudy LED Mask home light therapy routine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best LED Face Mask UK 2026",
    description: pageDescription,
    images: ["/images/products/buudy-led-mask/09-buudy-led-mask-home-spa.webp"],
  },
};

export default function BestLedFaceMaskUkPage() {
  const jsonLd = [
    organizationJsonLd(),
    websiteJsonLd(),
    productJsonLd(buudyMask),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Best LED Face Mask UK", url: "/pages/best-led-face-mask-uk" },
    ]),
    ...guidePageJsonLd({
      title: pageTitle,
      description: pageDescription,
      url: "/pages/best-led-face-mask-uk",
      faqs: ledMaskSeoFaqs,
    }),
  ];

  return (
    <>
      {jsonLd.map((schema, index) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          key={index}
          type="application/ld+json"
        />
      ))}

      <section className="buudy-section bg-[var(--plum)] py-16 text-[var(--cream)] md:py-24">
        <div className="buudy-wrap grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="buudy-mono text-[var(--gold)]">UK LED mask guide</p>
            <h1 className="buudy-display mt-5 text-5xl leading-none md:text-7xl">
              Best LED face mask UK: how to choose one that works for your routine.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[rgba(247,241,232,.76)] md:text-lg">
              If you are comparing red light therapy masks in the UK, focus on
              coverage, wavelengths, LED density, comfort, return policy, and
              whether the device fits your real skincare routine.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="bg-[var(--cream)] text-[var(--plum)] hover:bg-[var(--blush)]">
                <Link href="/products/buudy-led-mask">
                  Shop Buudy LED Mask
                  <ArrowRight size={17} />
                </Link>
              </Button>
              <Button asChild variant="ghost" className="border-[rgba(247,241,232,.36)] text-[var(--cream)] hover:bg-[rgba(247,241,232,.1)]">
                <Link href="#comparison">Compare features</Link>
              </Button>
            </div>
          </div>

          <figure className="relative min-h-[460px] overflow-hidden rounded-[34px] bg-[var(--ink)]">
            <Image
              alt="Buudy LED Mask used at home in the UK"
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              src="/images/products/buudy-led-mask/09-buudy-led-mask-home-spa.webp"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(39,20,42,.72))]" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-[rgba(247,241,232,.18)] bg-[rgba(247,241,232,.11)] p-5 backdrop-blur">
              <div className="flex items-center gap-1 text-[var(--gold)]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star fill="currentColor" key={index} size={17} />
                ))}
              </div>
              <p className="mt-3 text-sm leading-6 text-[rgba(247,241,232,.78)]">
                4.9 rated by 16,000+ customers, with free tracked shipping and
                90-day money back guarantee.
              </p>
            </div>
          </figure>
        </div>
      </section>

      <section className="buudy-section bg-[var(--cream)] py-16 md:py-24">
        <div className="buudy-wrap">
          <div className="max-w-3xl">
            <p className="buudy-mono text-[var(--gold)]">Quick answer</p>
            <h2 className="buudy-display mt-4 text-4xl leading-none text-[var(--plum)] md:text-6xl">
              For most UK shoppers, the best LED face mask is the one with
              red, blue, near-infrared, neck coverage, and easy repeat use.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--muted)] md:text-lg">
              Buudy is designed for that exact brief: 192 LEDs, 7 wavelengths
              plus 830nm near-infrared, full face and neck coverage, cordless
              wearability, and a launch bundle at{" "}
              {formatMoney(buudyMask.priceCents, buudyMask.currency)}.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {checkpoints.map((item) => (
              <article
                className="rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-6"
                key={item.title}
              >
                <CheckCircle2 className="text-[var(--gold)]" size={22} />
                <h3 className="buudy-display mt-5 text-2xl leading-tight text-[var(--plum)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="buudy-section bg-[rgba(241,223,210,.5)] py-16 md:py-24" id="comparison">
        <div className="buudy-wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="buudy-mono text-[var(--gold)]">Why Buudy</p>
            <h2 className="buudy-display mt-4 text-4xl leading-none text-[var(--plum)] md:text-6xl">
              Built for the UK buyer comparing premium LED masks.
            </h2>
            <p className="mt-5 text-base leading-8 text-[var(--muted)]">
              The right LED mask should remove trade-offs. Buudy is positioned
              for shoppers who want strong coverage, multiple wavelengths, and
              a complete at-home routine without paying separate prices for
              neck coverage and accessories.
            </p>
            <div className="mt-7 flex items-start gap-4 rounded-[22px] bg-[var(--plum)] p-5 text-[var(--cream)]">
              <ShieldCheck className="mt-1 shrink-0 text-[var(--gold)]" size={22} />
              <p className="text-sm leading-7 text-[rgba(247,241,232,.76)]">
                Buudy is a beauty and wellness device, not a medical treatment.
                Results vary by user, routine, and skin concern.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-[var(--border)] bg-[var(--card)]">
            {comparisonRows.map(([label, value]) => (
              <div
                className="grid gap-2 border-b border-[var(--border)] px-5 py-4 last:border-b-0 md:grid-cols-[190px_1fr]"
                key={label}
              >
                <p className="buudy-mono text-[var(--gold)]">{label}</p>
                <p className="text-sm leading-7 text-[var(--plum)] md:text-base">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="buudy-section bg-[var(--cream)] py-16 md:py-24">
        <div className="buudy-wrap grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <figure className="relative min-h-[500px] overflow-hidden rounded-[34px] bg-[var(--blush)]">
            <Image
              alt="Buudy LED Mask front product view"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              src="/images/products/buudy-led-mask/01-buudy-led-mask-front.webp"
            />
          </figure>
          <div>
            <p className="buudy-mono text-[var(--gold)]">Ready to buy</p>
            <h2 className="buudy-display mt-4 text-4xl leading-none text-[var(--plum)] md:text-6xl">
              Choose the LED mask made for full routine coverage.
            </h2>
            <ul className="mt-7 grid gap-3">
              {[
                "192 high-density LEDs",
                "7 wavelengths plus 830nm near-infrared",
                "Face plus neck coverage",
                "Free glow kit while the launch offer is live",
              ].map((item) => (
                <li className="flex items-center gap-3 text-[var(--plum)]" key={item}>
                  <Zap className="text-[var(--gold)]" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8">
              <Link href="/products/buudy-led-mask">
                View product page
                <ArrowRight size={17} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
