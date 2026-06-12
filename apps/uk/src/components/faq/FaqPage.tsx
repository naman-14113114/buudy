"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Mail, MessageSquare } from "lucide-react";
import { faqsData } from "@/data/faqs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { market } from "@/lib/market";

type FaqItemProps = {
  question: string;
  answerHtml: string;
  isOpen: boolean;
  onClick: () => void;
};

function FaqAccordionItem({ question, answerHtml, isOpen, onClick }: FaqItemProps) {
  return (
    <div 
      className={`group rounded-[20px] border border-[var(--border)] bg-[var(--card)] transition-all duration-300 ease-out hover:border-[rgba(58,31,61,0.2)] hover:shadow-[0_12px_32px_-16px_rgba(58,31,61,0.06)] ${
        isOpen ? "shadow-[0_16px_40px_-24px_rgba(58,31,61,0.1)] border-[rgba(58,31,61,0.18)]" : ""
      }`}
    >
      {/* Header / Click Target */}
      <button
        onClick={onClick}
        type="button"
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left select-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--plum)] rounded-[20px]"
        aria-expanded={isOpen}
      >
        <span className={`buudy-display text-lg sm:text-xl text-[var(--plum)] font-normal transition-colors duration-300 ${
          isOpen ? "text-[var(--plum)]" : "group-hover:text-[var(--ink)]"
        }`}>
          {question}
        </span>
        <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(58,31,61,0.04)] text-[var(--plum)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:bg-[rgba(58,31,61,0.08)] ${
          isOpen ? "rotate-180 bg-[var(--plum)]! text-[var(--cream)]!" : ""
        }`}>
          <ChevronDown size={18} className="stroke-[2.5]" />
        </span>
      </button>

      {/* Answer Panel */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6">
            <div className="mb-5 h-px w-full bg-[var(--border)]" />
            <div
              className={`text-sm sm:text-base leading-7 text-[var(--muted)] transition-all duration-500 ease-out font-light ${
                isOpen ? "translate-y-0 opacity-100 delay-100" : "-translate-y-2 opacity-0"
              }`}
              dangerouslySetInnerHTML={{ __html: answerHtml }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FaqPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // Expand first by default

  const handleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="bg-[var(--cream)] min-h-screen py-16 md:py-24 relative overflow-hidden">
      {/* Background glow animations */}
      <div className="buudy-glow -left-20 top-10 h-[360px] w-[360px] bg-[#f4a17b] opacity-20" />
      <div className="buudy-glow -right-20 bottom-10 h-[420px] w-[420px] bg-[#a05080] opacity-20" />

      <div className="buudy-wrap relative z-10 max-w-4xl">
        {/* Page Headings */}
        <div className="text-center mb-16">
          <SectionHeading
            eyebrow="Help Center"
            title={
              <>
                Frequently Asked <em className="buudy-italic">Questions</em>
              </>
            }
            copy="Find fast answers to shipping queries, return policies, payment terms, and support info below."
            align="center"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqsData.map((faq, index) => (
            <FaqAccordionItem
              key={index}
              question={faq.question}
              answerHtml={faq.answerHtml}
              isOpen={activeIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Footer Contact Help Center Widget */}
        <div className="mt-16 rounded-[24px] border border-[var(--border)] bg-[rgba(255,255,255,0.4)] backdrop-blur-md p-8 text-center max-w-2xl mx-auto shadow-[0_20px_50px_-28px_rgba(58,31,61,0.08)]">
          <h3 className="buudy-display text-2xl text-[var(--plum)]">Still have questions?</h3>
          <p className="mt-2 text-sm sm:text-base text-[var(--muted)] font-light">
            Our support desk is here for you {market.supportHours}.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="mailto:support@buudy.com" 
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--plum)] text-[var(--cream)] text-sm font-semibold hover:bg-[var(--ink)] transition-colors duration-200 w-full sm:w-auto justify-center"
            >
              <Mail size={16} />
              support@buudy.com
            </a>
            <Link
              href="/pages/contact-us#contact-form"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-[rgba(58,31,61,0.2)] text-[var(--plum)] text-sm font-semibold hover:bg-[rgba(58,31,61,0.04)] transition-colors duration-200 w-full sm:w-auto justify-center"
            >
              <MessageSquare size={16} />
              Open Support Ticket
            </Link>
          </div>

          {/* Connect with us social links */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-[rgba(58,31,61,0.08)] pt-6">
            <span className="text-xs text-[var(--muted)] font-semibold uppercase tracking-wider">Connect with us:</span>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61565686185222"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(58,31,61,0.05)] text-[var(--plum)] transition-all duration-300 hover:bg-[var(--plum)] hover:text-[var(--cream)] hover:-translate-y-0.5 shadow-sm"
                aria-label="Facebook"
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/buudy_com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(58,31,61,0.05)] text-[var(--plum)] transition-all duration-300 hover:bg-[var(--plum)] hover:text-[var(--cream)] hover:-translate-y-0.5 shadow-sm"
                aria-label="Instagram"
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@buudy-com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(58,31,61,0.05)] text-[var(--plum)] transition-all duration-300 hover:bg-[var(--plum)] hover:text-[var(--cream)] hover:-translate-y-0.5 shadow-sm"
                aria-label="YouTube"
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
