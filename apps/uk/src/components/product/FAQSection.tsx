"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs as maskFaqs, type FAQItem } from "@/data/productSections";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQSection({ faqs = maskFaqs }: { faqs?: FAQItem[] }) {
  const [open, setOpen] = useState(-1);

  return (
    <section className="buudy-section bg-[var(--cream)] md: md: py-14 md:py-24" id="faq">
      <div className="buudy-wrap grid gap-8 md:gap-12 lg:grid-cols-[1fr_1.5fr]">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Frequently asked <em className="buudy-italic">questions</em>.
            </>
          }
          copy="Everything you might want to know before bringing Buudy home."
        />
        <div className="grid gap-8">
          <article className="rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_18px_50px_rgba(39,20,42,.08)] md:p-7">
            <p className="buudy-mono text-[var(--gold)]">UK LED mask answer</p>
            <h2 className="buudy-display mt-3 text-3xl leading-tight text-[var(--plum)] md:text-4xl">
              Is Buudy the best LED face mask for UK buyers?
            </h2>
            <p className="mt-3 text-xs uppercase tracking-[.2em] text-[var(--muted)]">
              Updated by Buudy skincare team - 16 June 2026
            </p>
            <p className="mt-5 text-base leading-8 text-[var(--muted)]">
              Buudy is designed for UK shoppers comparing LED face masks for
              anti-ageing, breakout-prone skin, and neck coverage. The mask
              combines 192 high-density LEDs with seven visible colours plus
              830nm near-infrared, so one device can support red light firmness
              routines, blue light breakout routines, tone-balancing modes, and
              deeper near-infrared sessions. Unlike face-only masks, Buudy
              covers the jawline and neck, which matters because the neck often
              shows visible ageing early. It is cordless, rechargeable, and
              controlled with a simple tap system, making consistent at-home use
              easier than clinic appointments or wired masks. The current UK
              launch offer is £179 with a £449 compare-at price, free tracked
              UK shipping, a free glow kit while available, and a 90-day
              money-back guarantee.
            </p>
          </article>

          <ul>
            {faqs.map((faq, index) => {
              const isOpen = open === index;

              return (
                <li className="border-b border-[var(--border)]" key={faq.question}>
                  <button
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    type="button"
                  >
                    <span className="buudy-display text-[1.35rem] leading-snug text-[var(--plum)]">
                      {faq.question}
                    </span>
                    <Plus
                      className={`mt-1 flex-none text-[var(--gold)] transition ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      size={25}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-3xl leading-7 text-[var(--muted)]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
