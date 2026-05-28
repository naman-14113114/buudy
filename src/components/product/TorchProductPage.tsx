import Image from "next/image";
import type { Product } from "@/data/products";
import {
  torchDetailImages,
  torchFeatures,
  torchHowToUse,
} from "@/data/productSections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductHero } from "./ProductHero";
import { SpecsPanel } from "./SpecsPanel";
import { FAQSection } from "./FAQSection";
import { GuaranteeSection } from "./GuaranteeSection";
import { StickyAddToCart } from "./StickyAddToCart";

function TorchFeatureGrid({ product }: { product: Product }) {
  return (
    <section className="buudy-section bg-[var(--plum)] py-20 text-[var(--cream)]">
      <div className="buudy-wrap">
        <SectionHeading
          eyebrow="Portable therapy"
          title={
            <>
              Take your wellness <em className="buudy-italic">anywhere</em>.
            </>
          }
          copy="Lightweight 500g design works at home, the office, or during travel. Durable one-button operation keeps each targeted session simple."
          invert
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {torchFeatures.map((feature) => (
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
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {product.wavelengths?.map((wavelength) => (
            <div
              className="rounded-2xl border border-[rgba(247,241,232,.16)] bg-[rgba(247,241,232,.06)] p-4"
              key={wavelength.name}
            >
              <div
                className="h-1.5 rounded-full"
                style={{ backgroundColor: wavelength.color }}
              />
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="buudy-display text-2xl">{wavelength.name}</h3>
                <span className="buudy-mono text-[var(--gold)]">{wavelength.nm}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[rgba(247,241,232,.74)]">
                {wavelength.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TorchStorySection() {
  return (
    <section className="buudy-section bg-[var(--blush)] py-24">
      <div className="buudy-wrap grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Portable and powerful"
            title={
              <>
                On-the-go <em className="buudy-italic">relief</em>.
              </>
            }
            copy='Simply set aside some "Me Time" for 15 minutes a day while you watch your favorite show.'
          />
          <p className="mt-6 leading-8 text-[var(--muted)]">
            Experience the synergy of portability and power with a handheld
            light therapy torch. The compact design offers targeted relief for
            muscle discomfort, wherever you are and whenever you need it.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {torchDetailImages.map((image, index) => (
            <div
              className={`relative overflow-hidden rounded-2xl bg-[var(--cream)] ${
                index === 0 ? "aspect-[4/5] sm:col-span-2" : "aspect-square"
              }`}
              key={image.src}
            >
              <Image
                alt={image.alt}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 32vw, 90vw"
                src={image.src}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TorchDetailSection() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-24">
      <div className="buudy-wrap grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Product detail"
            title="Blue and red light therapy, focused."
            copy="A 5-wavelength near-infrared flashlight wand for body relief, acne-focused care, skin health, and targeted face or body application."
          />
          <div className="mt-8 space-y-5 leading-8 text-[var(--muted)]">
            <p>
              Red light therapy uses low-level wavelengths of light for
              non-invasive wellness routines, including skin concerns,
              inflammation, localized discomfort, hair-growth routines, and
              sleep-quality support.
            </p>
            <p>
              Buudy Red Torch combines blue 460nm, red 630nm and 660nm, plus
              near-infrared 850nm and 900nm light. Three LEDs are visible, while
              two infrared LEDs are invisible to the naked eye.
            </p>
          </div>
        </div>
        <div className="rounded-[18px] border border-[var(--border)] bg-[var(--card)] p-6">
          <p className="buudy-eyebrow">Feature</p>
          <ul className="mt-6 grid gap-5">
            {[
              "Natural pain relief: safe, painless, and designed to help reduce body aches while supporting smoother-looking skin.",
              "Powerful combination: blue, red, and infrared lights reach different target depths for a flexible routine.",
              "Portable and easy to use: includes a storage bag and hanging strip so it can travel with you.",
              "Humans and pets: pet owners may use it for animal joint-care routines when appropriate.",
              "Excellent material: 303 stainless steel outer shell with a 50,000+ hour service life.",
            ].map((item) => (
              <li className="flex gap-3 text-sm leading-6 text-[var(--plum)]" key={item}>
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[var(--gold)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function TorchUseGuide() {
  return (
    <section className="buudy-section bg-[var(--plum)] py-24 text-[var(--cream)]">
      <div className="buudy-wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <SectionHeading
          eyebrow="How to use"
          title={
            <>
              Build a consistent <em className="buudy-italic">routine</em>.
            </>
          }
          copy="Start gradually, keep the torch positioned correctly, and focus on the areas that need attention."
          invert
        />
        <ol className="grid gap-4">
          {torchHowToUse.map((step, index) => (
            <li
              className="flex gap-5 rounded-2xl border border-[rgba(247,241,232,.16)] bg-[rgba(247,241,232,.07)] p-5"
              key={step}
            >
              <span className="buudy-display text-3xl text-[var(--gold)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="leading-7 text-[rgba(247,241,232,.78)]">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function TorchProductPage({ product }: { product: Product }) {
  return (
    <>
      <ProductHero product={product} />
      <TorchFeatureGrid product={product} />
      <TorchStorySection />
      <SpecsPanel product={product} />
      <TorchDetailSection />
      <TorchUseGuide />
      <FAQSection faqs={product.faqs} />
      <GuaranteeSection />
      <StickyAddToCart product={product} />
    </>
  );
}
