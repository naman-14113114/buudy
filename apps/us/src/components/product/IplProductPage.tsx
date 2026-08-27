import Image from "next/image";
import type { Product } from "@/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductHero } from "./ProductHero";
import { FAQSection } from "./FAQSection";
import { GuaranteeSection } from "./GuaranteeSection";
import { StickyAddToCart } from "./StickyAddToCart";
import { ProductReviewsSection } from "./ProductReviewsSection";
import { TrustBadges } from "./TrustBadges";
import {
  IplHeroVideo,
  IplBeforeAfterGrid,
  IplIntensitySelector,
  IplExpertSection,
  IplComparisonTable,
  IplDescriptionBanners,
} from "./IplDetailedSections";

function IplFeatureGrid() {
  return (
    <section className="buudy-section bg-[var(--plum)] text-[var(--cream)] pt-0 pb-14 md:pt-0 md:pb-24">
      <div className="buudy-wrap">
        <SectionHeading
          eyebrow="Ice Cooling Technology"
          title={
            <>
              Painless hair removal at <em className="buudy-italic">home</em>.
            </>
          }
          copy="The advanced sapphire ice-cooling head lowers the temperature to 5-8°C during treatment. This counteracts the heat of the IPL flash, making the experience virtually painless, even on sensitive areas."
          invert
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Ice Cooling",
              kicker: "Painless Treatment",
              body: "Sapphire cooling technology keeps your skin at a comfortable 5-8°C, neutralizing the heat from the laser.",
            },
            {
              title: "999,999 Flashes",
              kicker: "Lifetime Solution",
              body: "Never buy a replacement cartridge. Our device comes with enough flashes for a lifetime of full-body treatments.",
            },
            {
              title: "9 Intensity Levels",
              kicker: "Customizable Power",
              body: "Adjust the intensity for your comfort. Use lower settings for sensitive areas like the face, and higher for legs.",
            },
            {
              title: "Fast Results",
              kicker: "Visible in 4 Weeks",
              body: "Achieve smooth, hair-free skin quickly. Noticeable hair reduction in just 4 weeks with consistent use.",
            },
          ].map((feature) => (
            <article
              className="rounded-2xl border border-[rgba(247,241,232,.18)] bg-[rgba(247,241,232,.08)] p-5"
              key={feature.title}
            >
              <p className="buudy-mono text-[var(--gold)]">{feature.kicker}</p>
              <h2 className="buudy-display mt-4 text-2xl">{feature.title}</h2>
              <p className="mt-4 text-sm leading-6 text-[rgba(247,241,232,.76)]">
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function IplStorySection() {
  return (
    <section className="buudy-section bg-[var(--blush)] py-14 md:py-24">
      <div className="buudy-wrap grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Silky Smooth Skin"
            title={
              <>
                Ditch the <em className="buudy-italic">razor</em>.
              </>
            }
            copy="Say goodbye to expensive salon trips, painful waxing, and daily shaving. Enjoy professional-grade IPL laser hair removal from the comfort of your own home."
          />
          <p className="mt-6 leading-8 text-[var(--muted)]">
            Our Intense Pulsed Light (IPL) technology targets hair at the root, breaking the cycle of hair growth. 
            With the added benefit of ice-cooling, your skin is protected and soothed during the entire process, leaving it silky smooth.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl bg-[var(--cream)] aspect-[4/5] sm:col-span-2">
            <Image
              alt="Buudy IPL Lifestyle"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 32vw, 90vw"
              src="/images/products/buudy-ipl/lifestyle.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function IplSkinGuideSection() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-14 md:py-24">
      <div className="buudy-wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div className="relative overflow-hidden rounded-2xl bg-[var(--card)] aspect-square">
          <Image
            alt="Buudy IPL Skin and Hair Color Guide"
            className="object-contain"
            fill
            sizes="(min-width: 1024px) 50vw, 90vw"
            src="/images/products/buudy-ipl/guide.png"
          />
        </div>
        <div>
          <SectionHeading
            eyebrow="Compatibility"
            title="Is IPL Right For You?"
            copy="Check our skin and hair color guide to ensure you will get the best results from our Intense Pulsed Light technology."
          />
          <p className="mt-6 leading-8 text-[var(--muted)]">
            IPL works best where there is a high contrast between hair color and skin tone. It is highly effective for light to medium skin tones with naturally dark blonde, brown, or black hair. 
            <br/><br/>
            It is not recommended for very dark skin tones or for very light blonde, red, or grey hair, as there is not enough melanin in the hair root to absorb the light energy effectively.
          </p>
        </div>
      </div>
    </section>
  );
}

export function IplProductPage({ product }: { product: Product }) {
  return (
    <>
      <ProductHero product={product} />
      <TrustBadges />
      <IplHeroVideo />
      <IplFeatureGrid />
      <IplBeforeAfterGrid />
      <IplDescriptionBanners />
      <IplIntensitySelector />
      <IplSkinGuideSection />
      <IplExpertSection />
      <ProductReviewsSection productHandle={product.id} />
      <IplComparisonTable />
      <FAQSection faqs={product.faqs} />
      <GuaranteeSection />
      <StickyAddToCart product={product} />
    </>
  );
}
