"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Check, Moon, RotateCcw, ShieldAlert, ShoppingBag, Sparkles } from "lucide-react";
import { Button, cn } from "@/components/ui/Button";
import type { QuizResult } from "@/data/skincareQuiz";

function trackQuizEvent(name: string) {
  window.clarity?.("event", name);
}

export function QuizResultView({
  onReset,
  result,
}: {
  onReset: () => void;
  result: QuizResult;
}) {
  const [selectedDay, setSelectedDay] = useState(1);
  const selectedPlan = result.starterPlan[selectedDay - 1];
  const firstMode = result.recommendedModes[0];
  const actions = (
    <div className="mt-4 border-t border-[var(--border)] pt-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-[var(--plum)]">
        <BookOpen size={17} className="shrink-0 text-[var(--gold)]" />
        E-book included with purchase, free to read now.
      </p>
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        {!result.ledUsePaused ? (
          <Button asChild>
            <Link href="/products/buudy-led-mask" onClick={() => trackQuizEvent("skincare_quiz_mask_clicked")}>
              <ShoppingBag size={16} />
              See the Buudy mask
            </Link>
          </Button>
        ) : null}
        <Button asChild variant="ghost">
          <a href="/Buudy-Clinical-Skincare-Masterclass-Guide.pdf" onClick={() => trackQuizEvent("skincare_quiz_ebook_clicked")} target="_blank" rel="noopener noreferrer">
            <BookOpen size={16} />
            Open the free e-book PDF
          </a>
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="buudy-eyebrow">Your quiz result</p>
          <h2 className="buudy-display mt-2 text-[2.7rem] leading-[1.04] text-[var(--plum)] md:text-[3.6rem]">
            A simple place to start.
          </h2>
        </div>
        <button
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--plum)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
          onClick={onReset}
          type="button"
        >
          <RotateCcw size={14} />
          Start over
        </button>
      </div>

      <section className="mt-4 overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--cream)]">
        <div className="grid gap-3 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <p className="buudy-mono text-[var(--gold)]">Based on your main concern: {result.profileTag}</p>
            <h3 className="buudy-display mt-2 text-[2rem] leading-tight text-[var(--plum)] sm:text-[2.3rem]">
              {result.ledUsePaused ? "Pause light therapy first" : `Start with ${firstMode.name} light`}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">{result.profileSummary}</p>
            {!result.ledUsePaused ? actions : null}
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs font-semibold text-[var(--plum)]">
            <span aria-hidden="true" className="h-3 w-3 rounded-full" style={{ background: firstMode.swatch }} />
            {result.ledUsePaused ? "Light use paused" : `${firstMode.name} starting mode`}
          </span>
        </div>

        {result.safetyWarning ? (
          <div className="flex gap-3 border-t border-[var(--border)] bg-[rgba(180,145,76,.1)] px-5 py-4 sm:px-7" role="status">
            <ShieldAlert className="mt-0.5 shrink-0 text-[var(--gold)]" size={19} />
            <p className="text-sm leading-6 text-[var(--plum)]">{result.safetyWarning}</p>
          </div>
        ) : null}

        {result.ledUsePaused ? <div className="border-t border-[var(--border)] px-5 pb-5 sm:px-6">{actions}</div> : null}
      </section>

      <section aria-labelledby="starter-plan-heading" className="mt-8">
        <p className="buudy-mono text-[var(--gold)]">Your first five days</p>
        <h3 className="buudy-display mt-2 text-3xl text-[var(--plum)]" id="starter-plan-heading">
          One step at a time.
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
          A gentle example rhythm. Your device manual sets the right session length and frequency for your model.
        </p>

        <div aria-label="Five-day starting plan" className="mt-5 grid grid-cols-5 gap-2" role="tablist">
          {result.starterPlan.map((day) => (
            <button
              aria-controls="starter-day-panel"
              aria-selected={selectedDay === day.day}
              className={cn(
                "min-h-16 rounded-[12px] border px-2 py-3 text-center transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]",
                selectedDay === day.day
                  ? "border-[var(--plum)] bg-[var(--plum)] text-[var(--cream)]"
                  : "border-[var(--border)] bg-[var(--cream)] text-[var(--plum)] hover:border-[var(--gold)]",
              )}
              key={day.day}
              onClick={() => {
                setSelectedDay(day.day);
                trackQuizEvent(`skincare_quiz_day_${day.day}_viewed`);
              }}
              role="tab"
              type="button"
            >
              <span className="block text-[10px] font-semibold uppercase tracking-[.12em]">Day {day.day}</span>
              <span className="mt-1 flex justify-center">
                {result.ledUsePaused && day.day % 2 === 1 ? (
                  <ShieldAlert aria-hidden="true" size={16} />
                ) : day.mode ? (
                  <Sparkles aria-hidden="true" size={16} />
                ) : (
                  <Moon aria-hidden="true" size={16} />
                )}
              </span>
              <span className="mt-1 block text-[10px]">
                {result.ledUsePaused && day.day % 2 === 1 ? "Pause" : day.mode ? "Session" : "Rest"}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-3 rounded-[16px] border border-[var(--border)] bg-[var(--cream)] p-5 sm:p-7" id="starter-day-panel" role="tabpanel">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="buudy-mono text-[var(--gold)]">Day {selectedPlan.day} · {selectedPlan.title}</p>
              <h4 className="buudy-display mt-2 text-[1.7rem] leading-tight text-[var(--plum)]">{selectedPlan.focus}</h4>
            </div>
            <Check className="shrink-0 text-[var(--gold)]" size={20} aria-hidden="true" />
          </div>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{selectedPlan.summary}</p>
          <ol className="mt-5 divide-y divide-[var(--border)] border-t border-[var(--border)]">
            {selectedPlan.timeline.map((item) => (
              <li className="grid gap-2 py-4 sm:grid-cols-[90px_1fr] sm:gap-4" key={`${selectedPlan.day}-${item.time}`}>
                <span className="buudy-mono pt-1 text-[var(--gold)]">{item.time}</span>
                <div>
                  <p className="font-semibold text-[var(--plum)]">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <p className="mt-6 text-xs leading-5 text-[var(--muted)]">
        This quiz offers general cosmetic guidance, not a diagnosis. Follow the instructions supplied with your mask, use eye protection as directed and stop if discomfort occurs. Seek individual advice for pregnancy, medication, epilepsy or light sensitivity.
      </p>
    </div>
  );
}
