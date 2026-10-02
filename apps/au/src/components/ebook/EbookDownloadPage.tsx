"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Download,
  ExternalLink,
  Check,
  Copy,
  BookOpen,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Zap,
  Layers,
  FileText,
  Smartphone,
  Tablet,
  Laptop,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ebookData, type EbookPart } from "@/data/ebook";

export function EbookDownloadPage() {
  const [copied, setCopied] = useState(false);
  const [activePartIndex, setActivePartIndex] = useState<number | null>(0); // First part expanded by default
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const fullDownloadUrl = `${window.location.origin}${ebookData.pdfPath}`;
      navigator.clipboard.writeText(fullDownloadUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2800);
      });
    }
  };

  const togglePart = (idx: number) => {
    setActivePartIndex((prev) => (prev === idx ? null : idx));
  };

  const toggleFaq = (idx: number) => {
    setActiveFaqIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      {/* Hero Section */}
      <section className="buudy-section relative overflow-hidden py-12 md:py-20">
        {/* Subtle Ambient Glows */}
        <div className="buudy-glow left-1/4 top-10 h-72 w-72 bg-[oklch(66%_0.088_86)] opacity-15 blur-[120px]" />
        <div className="buudy-glow right-1/4 bottom-10 h-80 w-80 bg-[oklch(46%_0.083_326)] opacity-10 blur-[130px]" />

        <div className="buudy-wrap relative z-10 grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
          {/* Left Column: Hero Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(58,31,61,0.14)] bg-[var(--card)] px-3.5 py-1.5 shadow-sm">
              <Sparkles size={14} className="text-[var(--gold)]" />
              <span className="buudy-mono text-[11px] font-semibold text-[var(--plum)] tracking-wider">
                FREE CUSTOMER COMPANION EDITION
              </span>
            </div>

            <h1 className="buudy-heading mt-5 text-[2.7rem] leading-[1.04] sm:text-[3.4rem] md:text-6xl font-light">
              The Clinical Light{" "}
              <em className="buudy-italic text-[var(--gold)]">Masterclass</em>
            </h1>

            <p className="buudy-copy mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--muted)]">
              {ebookData.subtitle}
            </p>

            {/* Quick Spec Pills */}
            <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs text-[var(--plum)] font-medium">
                <FileText size={13} className="text-[var(--gold)]" />
                {ebookData.pageCount}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs text-[var(--plum)] font-medium">
                <Layers size={13} className="text-[var(--gold)]" />
                {ebookData.chapterCount}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs text-[var(--plum)] font-medium">
                <Zap size={13} className="text-[var(--gold)]" />
                7 Wavelengths + 830nm NIR
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-1 text-xs text-[var(--plum)] font-medium">
                <ShieldCheck size={13} className="text-[var(--gold)]" />
                5 Bespoke Pathways
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5">
              <Button asChild className="h-14 px-8 text-base shadow-lg">
                <a
                  href={ebookData.pdfPath}
                  download={ebookData.pdfFilename}
                  className="inline-flex items-center justify-center gap-2.5"
                >
                  <Download size={18} />
                  <span>Download E-Book (PDF)</span>
                  <span className="ml-1 rounded-full bg-[rgba(255,255,255,0.2)] px-2 py-0.5 text-xs">
                    {ebookData.fileSize}
                  </span>
                </a>
              </Button>

              <Button
                variant="ghost"
                asChild
                className="h-14 px-7 text-sm font-medium border-[rgba(58,31,61,0.2)]"
              >
                <a
                  href={ebookData.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2"
                >
                  <ExternalLink size={16} />
                  <span>Read Online</span>
                </a>
              </Button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 text-xs font-semibold text-[var(--plum)] transition hover:border-[var(--gold)] hover:bg-[rgba(58,31,61,0.04)]"
                title="Copy direct download link to share with customers or friends"
              >
                {copied ? (
                  <>
                    <Check size={15} className="text-[var(--success)]" />
                    <span className="text-[var(--success)]">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} className="text-[var(--muted)]" />
                    <span>Copy Download Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Guarantee Note */}
            <p className="mt-4 text-xs text-[var(--muted)] flex items-center gap-1.5">
              <Check size={14} className="text-[var(--gold)] flex-shrink-0" />
              <span>
                Instant download. Compatible with Apple Books, Kindle, Adobe Acrobat, Google Drive & all smartphones.
              </span>
            </p>
          </div>

          {/* Right Column: 3D Book Presentation Card */}
          <aside className="relative">
            <div className="relative overflow-hidden rounded-[24px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_32px_64px_-24px_rgba(58,31,61,0.2)] md:p-8">
              {/* Top Banner Tag */}
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-[var(--gold)]" />
                  <span className="buudy-mono text-xs font-semibold text-[var(--plum)]">
                    CLINICAL GUIDE
                  </span>
                </div>
                <span className="rounded-full bg-[var(--blush)] px-2.5 py-0.5 text-xs font-medium text-[var(--plum)]">
                  {ebookData.edition}
                </span>
              </div>

              {/* Book Cover Image Mockup */}
              <div className="relative mt-6 aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-[16px] bg-gradient-to-br from-[var(--cream)] to-[var(--blush)] border border-[rgba(58,31,61,0.08)] flex items-center justify-center p-4">
                <Image
                  alt={ebookData.coverImageAlt}
                  src={ebookData.coverImage}
                  fill
                  priority
                  className="object-contain transition-transform duration-700 hover:scale-105"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
              </div>

              {/* Card Meta Details */}
              <div className="mt-6 space-y-3.5">
                <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                  <span>Format:</span>
                  <span className="font-semibold text-[var(--plum)]">
                    Adobe PDF (Universal)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                  <span>File Size:</span>
                  <span className="font-semibold text-[var(--plum)]">
                    {ebookData.fileSize}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                  <span>Included With:</span>
                  <span className="font-semibold text-[var(--plum)]">
                    Buudy 7-Colour LED Mask
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                  <span>Standalone Value:</span>
                  <span className="font-semibold text-[var(--gold)]">
                    Included Free (£19 / $19 Value)
                  </span>
                </div>
              </div>

              {/* Direct Download Action within Card */}
              <div className="mt-6 pt-4 border-t border-[var(--border)]">
                <a
                  href={ebookData.pdfPath}
                  download={ebookData.pdfFilename}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--plum)] py-3 text-xs font-semibold text-[var(--cream)] transition duration-200 hover:bg-[var(--plum-soft)]"
                >
                  <Download size={14} />
                  <span>Click To Download ({ebookData.fileSize})</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 4 Core Scientific Commitments Section */}
      <section className="buudy-section border-y border-[var(--border)] bg-[rgba(241,223,210,0.35)] py-14 md:py-20">
        <div className="buudy-wrap">
          <SectionHeading
            eyebrow="The Buudy Scientific Standard"
            title={
              <>
                Engineered for Results,{" "}
                <em className="buudy-italic">Not Guesswork</em>
              </>
            }
            copy="Why our clinical masterclass provides the exact cellular biology, active ingredient chemistry, and treatment pathways needed for long-term transformation."
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ebookData.commitments.map((item) => (
              <div
                key={item.number}
                className="relative flex flex-col justify-between rounded-[20px] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition-all duration-300 hover:border-[rgba(58,31,61,0.22)] hover:shadow-md"
              >
                <div>
                  <span className="buudy-mono text-2xl font-light text-[var(--gold)]">
                    {item.number}
                  </span>
                  <h3 className="buudy-display mt-3 text-lg font-normal text-[var(--plum)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[var(--muted)] font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Syllabus & Curriculum Breakdown (Accordion) */}
      <section className="buudy-section py-14 md:py-24">
        <div className="buudy-wrap max-w-4xl">
          <SectionHeading
            eyebrow="Master Index & Syllabus"
            title={
              <>
                Explore The 38 Clinical{" "}
                <em className="buudy-italic">Masterclass Modules</em>
              </>
            }
            copy="Click on each part below to view the detailed chapters, protocols, and scientific breakdowns included inside the complete PDF."
            align="center"
          />

          <div className="mt-12 space-y-4">
            {ebookData.parts.map((part: EbookPart, idx: number) => {
              const isOpen = activePartIndex === idx;

              return (
                <div
                  key={part.partNumber}
                  className={`overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--card)] transition-all duration-300 ${
                    isOpen
                      ? "border-[rgba(58,31,61,0.25)] shadow-[0_16px_40px_-24px_rgba(58,31,61,0.12)]"
                      : "hover:border-[rgba(58,31,61,0.18)]"
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    type="button"
                    onClick={() => togglePart(idx)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left select-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--plum)]"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--blush)] font-mono text-xs font-semibold text-[var(--plum)]">
                        0{idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="buudy-mono text-[10px] text-[var(--gold)] font-semibold">
                            {part.partNumber}
                          </span>
                          <span className="text-xs text-[var(--muted)]">
                            • {part.pageRange}
                          </span>
                        </div>
                        <h3 className="buudy-display text-lg sm:text-xl font-normal text-[var(--plum)]">
                          {part.partTitle}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(58,31,61,0.04)] text-[var(--plum)] transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-[var(--plum)] text-[var(--cream)]" : ""
                      }`}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>

                  {/* Accordion Content */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-[var(--border)] px-6 pb-6 pt-4">
                        <p className="text-xs sm:text-sm leading-relaxed text-[var(--muted)] font-light italic mb-5">
                          {part.summary}
                        </p>

                        {/* Chapters Grid */}
                        <div className="grid gap-3 sm:grid-cols-2">
                          {part.chapters.map((ch) => (
                            <div
                              key={ch.chapter}
                              className="rounded-xl border border-[rgba(58,31,61,0.08)] bg-[rgba(247,241,232,0.4)] p-3.5 transition hover:bg-[rgba(247,241,232,0.8)]"
                            >
                              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--gold)] font-semibold">
                                <span>{ch.chapter}</span>
                                <span className="text-[var(--muted)]">{ch.page}</span>
                              </div>
                              <h4 className="buudy-display mt-1 text-sm font-normal text-[var(--plum)]">
                                {ch.title}
                              </h4>
                              <p className="mt-1 text-xs text-[var(--muted)] font-light line-clamp-2">
                                {ch.description}
                              </p>
                              <div className="mt-2.5 flex flex-wrap gap-1">
                                {ch.highlights.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded bg-[var(--card)] px-1.5 py-0.5 text-[10px] text-[var(--plum)] border border-[rgba(58,31,61,0.06)]"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Download Callout under Accordion */}
          <div className="mt-8 text-center">
            <Button asChild className="h-13 px-8">
              <a href={ebookData.pdfPath} download={ebookData.pdfFilename}>
                <Download size={16} />
                <span>Download All 38 Chapters Now ({ebookData.fileSize})</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* 3-Step Reading & Device Guide */}
      <section className="buudy-section border-t border-[var(--border)] bg-[rgba(241,223,210,0.4)] py-14 md:py-20">
        <div className="buudy-wrap max-w-4xl">
          <SectionHeading
            eyebrow="Universal Compatibility"
            title={
              <>
                How to Read & Save Your E-Book{" "}
                <em className="buudy-italic">On Any Device</em>
              </>
            }
            copy="The guide is delivered in clean, standard high-resolution PDF format with interactive bookmarks and printable weekly calendars."
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--card)] p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--blush)] text-[var(--plum)]">
                <Smartphone size={22} />
              </div>
              <h3 className="buudy-display mt-4 text-lg font-normal text-[var(--plum)]">
                Smartphones (iOS & Android)
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--muted)] font-light">
                Tap download and save directly into Apple Books, Google Drive, or your Files app for offline reading at your vanity.
              </p>
            </div>

            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--card)] p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--blush)] text-[var(--plum)]">
                <Tablet size={22} />
              </div>
              <h3 className="buudy-display mt-4 text-lg font-normal text-[var(--plum)]">
                iPads & Tablets
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--muted)] font-light">
                Enjoy rich full-colour diagrams, anatomical cross-sections, and treatment pathways in crisp high resolution.
              </p>
            </div>

            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--card)] p-6 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--blush)] text-[var(--plum)]">
                <Laptop size={22} />
              </div>
              <h3 className="buudy-display mt-4 text-lg font-normal text-[var(--plum)]">
                Desktops & Home Printing
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--muted)] font-light">
                Print out the 90-day progress calendars and weekly trackers to pin up in your bathroom or bedroom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* E-Book FAQ Accordion Section */}
      <section className="buudy-section py-14 md:py-20">
        <div className="buudy-wrap max-w-3xl">
          <SectionHeading
            eyebrow="Frequently Asked Questions"
            title={
              <>
                Got Questions About{" "}
                <em className="buudy-italic">The E-Book?</em>
              </>
            }
            align="center"
          />

          <div className="mt-10 space-y-3.5">
            {ebookData.faqs.map((faq, fIdx) => {
              const isOpen = activeFaqIndex === fIdx;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--card)] transition-all duration-300 ${
                    isOpen ? "border-[rgba(58,31,61,0.22)] shadow-sm" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(fIdx)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left select-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--plum)]"
                    aria-expanded={isOpen}
                  >
                    <span className="buudy-display text-base sm:text-lg font-normal text-[var(--plum)]">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(58,31,61,0.04)] text-[var(--plum)] transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-[var(--plum)] text-[var(--cream)]" : ""
                      }`}
                    >
                      <ChevronDown size={14} />
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-[var(--border)] px-6 pb-5 pt-3">
                        <div
                          className="text-xs sm:text-sm leading-relaxed text-[var(--muted)] font-light"
                          dangerouslySetInnerHTML={{ __html: faq.answerHtml }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
