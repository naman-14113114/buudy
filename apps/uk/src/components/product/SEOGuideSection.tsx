import Link from "next/link";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import type { Product } from "@/data/products";
import { formatMoney } from "@/lib/money";
import { Button } from "@/components/ui/Button";

const criteria = [
  {
    title: "Enough LEDs for even coverage",
    copy: "Look for dense, evenly spaced LEDs so the face is not treated in patches. Buudy uses 192 high-density LEDs across the mask.",
  },
  {
    title: "Red, blue, and near-infrared modes",
    copy: "Red light supports anti-ageing routines, blue light is useful for breakout-prone skin routines, and near-infrared is used for deeper skincare support.",
  },
  {
    title: "Face plus neck in one device",
    copy: "Many LED masks stop at the chin. Buudy includes neck coverage because the neck is often one of the first areas to show visible ageing.",
  },
  {
    title: "A routine people will actually repeat",
    copy: "Cordless wearability, tap control, and simple sessions matter because consistent use is what makes at-home light therapy practical.",
  },
];

const queryAnswers = [
  {
    question: "Best LED face mask UK",
    answer:
      "For UK shoppers comparing LED masks, Buudy is strongest if you want one device with 192 LEDs, 7 wavelengths plus 830nm near-infrared, full face and neck coverage, cordless use, free tracked shipping, and a 90-day return window.",
  },
  {
    question: "LED face mask for acne and anti-ageing",
    answer:
      "Buudy combines blue 415nm light for breakout-prone routines with red 633nm light for fine-line and firmness routines, so you do not need separate acne and anti-ageing devices.",
  },
  {
    question: "Red light therapy mask with neck coverage",
    answer:
      "The mask includes face and neck coverage in one wearable device, which is useful for buyers who want their skincare routine to treat the jawline and neck together.",
  },
];

export function SEOGuideSection({ product }: { product: Product }) {
  return (
    <section className="buudy-section bg-[var(--cream)] md: md: py-14 md:py-24">
      <div className="buudy-wrap">
        <div className="grid gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="rounded-[30px] bg-[var(--plum)] p-7 text-[var(--cream)] md:p-9 lg:sticky lg:top-28">
            <p className="buudy-mono text-[var(--gold)]">UK buying guide</p>
            <h2 className="buudy-display mt-4 text-4xl leading-none md:text-5xl">
              What makes the best LED face mask for UK skincare?
            </h2>
            <p className="mt-5 text-sm leading-7 text-[rgba(247,241,232,.74)] md:text-base">
              The best LED face mask is not just the one with the prettiest
              shell. It should give you even light coverage, useful wavelengths,
              a comfortable fit, transparent pricing, and a routine simple
              enough to repeat.
            </p>
            <div className="mt-6 rounded-2xl border border-[rgba(247,241,232,.18)] bg-[rgba(247,241,232,.08)] p-5">
              <p className="buudy-mono text-[var(--gold)]">Buudy today</p>
              <p className="buudy-display mt-2 text-3xl">
                {formatMoney(product.priceCents, product.currency)}
              </p>
              <p className="mt-2 text-sm leading-6 text-[rgba(247,241,232,.7)]">
                Includes free glow kit, free tracked shipping, and 90-day money
                back guarantee while the UK launch offer is live.
              </p>
            </div>
            <Button
              asChild
              className="mt-6 bg-[var(--cream)] text-[var(--plum)] hover:bg-[var(--blush)]"
            >
              <Link href="/pages/best-led-face-mask-uk">Read the full UK guide</Link>
            </Button>
          </div>

          <div className="grid gap-5">
            <div className="grid gap-4 sm:grid-cols-2">
              {criteria.map((item) => (
                <article
                  className="rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-5 md:p-6"
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

            <div className="rounded-[30px] border border-[var(--border)] bg-[rgba(241,223,210,.5)] p-6 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="buudy-mono text-[var(--gold)]">Fast answers</p>
                  <h3 className="buudy-display mt-2 text-3xl text-[var(--plum)] md:text-4xl">
                    Query-ready answers for UK buyers
                  </h3>
                </div>
                <Sparkles className="text-[var(--gold)]" size={30} />
              </div>
              <div className="mt-6 grid gap-4">
                {queryAnswers.map((item) => (
                  <article
                    className="rounded-[20px] bg-[var(--card)] p-5"
                    key={item.question}
                  >
                    <h4 className="buudy-display text-xl text-[var(--plum)]">
                      {item.question}
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                      {item.answer}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-5">
              <ShieldCheck className="mt-1 shrink-0 text-[var(--gold)]" size={23} />
              <p className="text-sm leading-7 text-[var(--muted)]">
                Safety note: do not use LED light therapy without medical advice
                if you are pregnant, have epilepsy, are sensitive to light, or
                take medication that may cause photosensitivity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
