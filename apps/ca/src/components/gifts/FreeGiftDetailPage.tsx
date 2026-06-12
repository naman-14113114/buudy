import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  freeGiftBundleFooter,
  type FreeGiftDetail,
} from "@/data/freeGifts";

const offerHref = "/products/buudy-led-mask#free-gifts";

export function FreeGiftDetailPage({ gift }: { gift: FreeGiftDetail }) {
  return (
    <>
      <section className="buudy-section bg-[var(--cream)] py-12 md:py-20">
        <div className="buudy-wrap grid items-center gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          <div>
            <p className="buudy-eyebrow inline-flex items-center gap-2">
              <Gift aria-hidden="true" size={15} />
              {gift.eyebrow}
            </p>
            <h1 className="buudy-heading mt-4 max-w-3xl">{gift.title}</h1>
            <p className="buudy-copy mt-5 max-w-3xl text-base md:text-lg">
              {gift.intro}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={offerHref}>
                  {gift.primaryCtaLabel}
                  <ArrowRight aria-hidden="true" size={17} />
                </Link>
              </Button>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              {gift.note}
            </p>
          </div>

          <aside className="rounded-[8px] border border-[var(--border)] bg-[var(--card)] p-4 shadow-[0_24px_54px_-36px_rgba(58,31,61,.55)] md:p-5">
            <div className="relative aspect-square overflow-hidden rounded-[8px] bg-[var(--blush)]">
              <Image
                alt={gift.imageAlt}
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                src={gift.image}
              />
            </div>
            <h2 className="buudy-display mt-5 text-2xl leading-tight text-[var(--plum)] md:text-3xl">
              {gift.cardTitle}
            </h2>
            <ul className="mt-4 grid gap-3">
              {gift.cardBullets.map((bullet) => (
                <li
                  className="flex gap-3 text-sm leading-6 text-[var(--muted)]"
                  key={bullet}
                >
                  <Check
                    aria-hidden="true"
                    className="mt-1 flex-none text-[var(--gold)]"
                    size={16}
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="buudy-section border-y border-[var(--border)] bg-[rgba(241,223,210,.42)] py-14 md:py-20">
        <div className="buudy-wrap grid gap-8 md:grid-cols-2 md:gap-12">
          {gift.sections.map((section) => (
            <article key={section.title}>
              <p className="buudy-eyebrow">Buudy Ritual</p>
              <h2 className="buudy-display mt-3 text-3xl leading-tight text-[var(--plum)] md:text-4xl">
                {section.title}
              </h2>
              <div className="buudy-copy mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-5 grid gap-3">
                  {section.bullets.map((bullet) => (
                    <li
                      className="flex gap-3 text-sm leading-6 text-[var(--muted)]"
                      key={bullet}
                    >
                      <Sparkles
                        aria-hidden="true"
                        className="mt-1 flex-none text-[var(--gold)]"
                        size={15}
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="buudy-section bg-[var(--ink)] py-14 text-center text-[var(--cream)] md:py-20">
        <div className="buudy-wrap max-w-3xl">
          <p className="buudy-eyebrow">Complete The Ritual</p>
          <h2 className="buudy-display mt-3 text-4xl leading-tight md:text-5xl">
            Buy the mask, unlock the full bonus bundle.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[rgba(247,241,232,.72)]">
            {freeGiftBundleFooter}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href={offerHref}>
                {gift.primaryCtaLabel}
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
