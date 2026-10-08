"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs as maskFaqs, type FAQItem } from "@/data/productSections";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQSection({ faqs = maskFaqs }: { faqs?: FAQItem[] }) {
  const [open, setOpen] = useState(-1);

  return (
    <section className="buudy-section bg-[var(--cream)] py-14 md:py-24" id="faq">
      <div className="buudy-wrap max-w-3xl">
        <SectionHeading
          align="center"
          eyebrow="FAQ"
          title={
            <>
              Frequently asked <em className="buudy-italic">questions</em>.
            </>
          }
          copy="Everything you might want to know before bringing Buudy home."
        />

        <ul className="mt-8 md:mt-12 divide-y divide-[var(--border)] border-t border-b border-[var(--border)]">
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <li key={faq.question}>
                <button
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left cursor-pointer"
                  onClick={() => setOpen((current) => (current === index ? -1 : index))}
                  type="button"
                >
                  <span className="buudy-display text-[1.25rem] md:text-[1.35rem] leading-snug text-[var(--plum)]">
                    {faq.question}
                  </span>
                  <Plus
                    className={`mt-1 flex-none text-[var(--gold)] transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    size={24}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="leading-7 text-[var(--muted)]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
