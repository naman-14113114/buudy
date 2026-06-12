"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardCheck,
  RotateCcw,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import {
  emptyQuizAnswers,
  skincareQuizQuestions,
  type QuizAnswers,
  type QuizQuestion,
  type QuizResult,
} from "@/data/skincareQuiz";
import { buildSkincareQuizResult } from "@/lib/skincareQuiz";
import { Button, cn } from "@/components/ui/Button";
import { useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "buudy:skincare-quiz:v1";

type QuizStage = "intro" | "questions" | "analyzing" | "results";

type SavedQuiz = {
  stage: Exclude<QuizStage, "intro" | "analyzing">;
  questionIndex: number;
  answers: QuizAnswers;
};

declare global {
  interface Window {
    clarity?: (...args: string[]) => void;
  }
}

function trackQuizEvent(name: string) {
  window.clarity?.("event", name);
}

function cloneEmptyAnswers(): QuizAnswers {
  return {
    ...emptyQuizAnswers,
    concern: [],
    eyes: [],
  };
}

function isSavedQuiz(value: unknown): value is SavedQuiz {
  if (!value || typeof value !== "object") {
    return false;
  }

  const saved = value as Partial<SavedQuiz>;

  return (
    (saved.stage === "questions" || saved.stage === "results") &&
    typeof saved.questionIndex === "number" &&
    saved.questionIndex >= 0 &&
    saved.questionIndex < skincareQuizQuestions.length &&
    Boolean(saved.answers) &&
    Array.isArray(saved.answers?.concern) &&
    Array.isArray(saved.answers?.eyes) &&
    typeof saved.answers?.skinType === "string" &&
    typeof saved.answers?.pregnant === "string" &&
    typeof saved.answers?.age === "string"
  );
}

function getQuestionAnswer(question: QuizQuestion, answers: QuizAnswers) {
  return answers[question.id];
}

function isQuestionAnswered(question: QuizQuestion, answers: QuizAnswers) {
  const value = getQuestionAnswer(question, answers);
  return Array.isArray(value) ? value.length > 0 : Boolean(value);
}

export function SkincareQuiz() {
  const [stage, setStage] = useState<QuizStage>("intro");
  const [answers, setAnswers] = useState<QuizAnswers>(cloneEmptyAnswers);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [savedQuiz, setSavedQuiz] = useState<SavedQuiz | null>(null);
  const [storageReady, setStorageReady] = useState(false);
  const analysisTimer = useRef<number | null>(null);
  const quizPanel = useRef<HTMLDivElement>(null);
  const currentQuestion = skincareQuizQuestions[questionIndex];
  const result = useMemo<QuizResult | null>(
    () => (stage === "results" ? buildSkincareQuizResult(answers) : null),
    [answers, stage],
  );

  useEffect(() => {
    let storedQuiz: SavedQuiz | null = null;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed: unknown = JSON.parse(stored);

        if (isSavedQuiz(parsed)) {
          storedQuiz = parsed;
        } else {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    const hydrationTimer = window.setTimeout(() => {
      setSavedQuiz(storedQuiz);
      setStorageReady(true);
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
  }, []);

  useEffect(() => {
    if (!storageReady || savedQuiz || stage === "intro" || stage === "analyzing") {
      return;
    }

    const nextSavedQuiz: SavedQuiz = {
      stage,
      questionIndex,
      answers,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSavedQuiz));
  }, [answers, questionIndex, savedQuiz, stage, storageReady]);

  useEffect(() => {
    return () => {
      if (analysisTimer.current) {
        window.clearTimeout(analysisTimer.current);
      }
    };
  }, []);

  function startFresh() {
    window.localStorage.removeItem(STORAGE_KEY);
    setSavedQuiz(null);
    setAnswers(cloneEmptyAnswers());
    setQuestionIndex(0);
    setStage("questions");
    trackQuizEvent("skincare_quiz_started");
    scrollToQuizPanel();
  }

  function resumeQuiz() {
    if (!savedQuiz) {
      return;
    }

    setAnswers(savedQuiz.answers);
    setQuestionIndex(savedQuiz.questionIndex);
    setStage(savedQuiz.stage);
    setSavedQuiz(null);
    trackQuizEvent("skincare_quiz_resumed");
    scrollToQuizPanel();
  }

  function resetQuiz() {
    window.localStorage.removeItem(STORAGE_KEY);
    setSavedQuiz(null);
    setAnswers(cloneEmptyAnswers());
    setQuestionIndex(0);
    setStage("intro");
    trackQuizEvent("skincare_quiz_restarted");
    scrollToQuizPanel();
  }

  function scrollToQuizPanel() {
    window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      quizPanel.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  function selectOption(question: QuizQuestion, optionValue: string) {
    const option = question.options.find(({ value }) => value === optionValue);

    setAnswers((current) => {
      if (question.selection === "single") {
        return {
          ...current,
          [question.id]: optionValue,
        };
      }

      const selected = current[question.id] as string[];
      const nextValues = option?.exclusive
        ? [optionValue]
        : selected.includes(optionValue)
          ? selected.filter((value) => value !== optionValue)
          : [
              ...selected.filter((value) => {
                const selectedOption = question.options.find(
                  (candidate) => candidate.value === value,
                );

                return !selectedOption?.exclusive;
              }),
              optionValue,
            ];

      return {
        ...current,
        [question.id]: nextValues,
      };
    });
  }

  function showResults() {
    setStage("analyzing");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    analysisTimer.current = window.setTimeout(
      () => {
        setStage("results");
        trackQuizEvent("skincare_quiz_result_viewed");
        scrollToQuizPanel();
      },
      reduceMotion ? 10 : 800,
    );
  }

  function continueQuiz() {
    trackQuizEvent(
      `skincare_quiz_step_completed_${String(questionIndex + 1).padStart(2, "0")}`,
    );

    if (questionIndex === skincareQuizQuestions.length - 1) {
      showResults();
      return;
    }

    setQuestionIndex((index) => index + 1);
    scrollToQuizPanel();
  }

  return (
    <div
      className="min-h-[620px] scroll-mt-24 rounded-[18px] border border-[var(--border)] bg-[var(--card)] p-5 shadow-[0_30px_80px_-60px_rgba(58,31,61,.7)] sm:p-8 lg:p-10"
      ref={quizPanel}
    >
      {stage === "intro" ? (
        <QuizIntro savedQuiz={savedQuiz} onResume={resumeQuiz} onStart={startFresh} />
      ) : null}

      {stage === "questions" ? (
        <QuizQuestionStep
          answers={answers}
          currentQuestion={currentQuestion}
          onBack={() => {
            setQuestionIndex((index) => Math.max(0, index - 1));
            scrollToQuizPanel();
          }}
          onContinue={continueQuiz}
          onReset={resetQuiz}
          onSelect={selectOption}
          questionIndex={questionIndex}
        />
      ) : null}

      {stage === "analyzing" ? <QuizAnalyzing /> : null}

      {stage === "results" && result ? (
        <QuizResults onReset={resetQuiz} result={result} />
      ) : null}
    </div>
  );
}

function QuizIntro({
  savedQuiz,
  onResume,
  onStart,
}: {
  savedQuiz: SavedQuiz | null;
  onResume: () => void;
  onStart: () => void;
}) {
  return (
    <div className="flex min-h-[540px] flex-col justify-center">
      <p className="buudy-eyebrow">60-second assessment</p>
      <h2 className="buudy-display mt-4 text-[2.8rem] leading-[1.02] text-[var(--plum)] md:text-[4rem]">
        Build your custom <em className="buudy-italic">routine</em>.
      </h2>
      <p className="buudy-copy mt-5 max-w-xl">
        Discover the exact LED light therapy and daily skincare habits you need
        for your specific concerns.
      </p>

      {savedQuiz ? (
        <div className="mt-8 rounded-[14px] border border-[rgba(180,145,76,.38)] bg-[rgba(180,145,76,.09)] p-5">
          <p className="buudy-mono text-[var(--gold)]">Routine in progress</p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Pick up where you left off, or begin a fresh assessment.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button onClick={onResume}>
              Resume assessment
              <ArrowRight size={16} />
            </Button>
            <Button onClick={onStart} variant="ghost">
              Start over
            </Button>
          </div>
        </div>
      ) : (
        <Button className="mt-8 self-start" onClick={onStart}>
          Start assessment
          <ArrowRight size={16} />
        </Button>
      )}

      <div className="mt-12 grid gap-3 border-t border-[var(--border)] pt-6 sm:grid-cols-3">
        {["5 focused questions", "Instant routine", "Private by design"].map(
          (item) => (
            <div className="flex items-center gap-2 text-sm text-[var(--muted)]" key={item}>
              <Check className="text-[var(--gold)]" size={15} />
              {item}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function QuizQuestionStep({
  answers,
  currentQuestion,
  onBack,
  onContinue,
  onReset,
  onSelect,
  questionIndex,
}: {
  answers: QuizAnswers;
  currentQuestion: QuizQuestion;
  onBack: () => void;
  onContinue: () => void;
  onReset: () => void;
  onSelect: (question: QuizQuestion, value: string) => void;
  questionIndex: number;
}) {
  const answer = getQuestionAnswer(currentQuestion, answers);
  const progress = ((questionIndex + 1) / skincareQuizQuestions.length) * 100;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="buudy-mono text-[var(--gold)]">
          Step {String(questionIndex + 1).padStart(2, "0")} /{" "}
          {String(skincareQuizQuestions.length).padStart(2, "0")}
        </p>
        <button
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] transition hover:text-[var(--plum)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
          onClick={onReset}
          type="button"
        >
          <RotateCcw size={14} />
          Start over
        </button>
      </div>
      <div
        aria-label={`Question ${questionIndex + 1} of ${skincareQuizQuestions.length}`}
        aria-live="polite"
        className="mt-4 h-1.5 overflow-hidden rounded-full bg-[rgba(58,31,61,.09)]"
        role="progressbar"
        aria-valuemax={skincareQuizQuestions.length}
        aria-valuemin={1}
        aria-valuenow={questionIndex + 1}
      >
        <div
          className="h-full rounded-full bg-[var(--gold)] transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h2 className="buudy-display mt-9 text-[2.25rem] leading-[1.06] text-[var(--plum)] md:text-[3.2rem]">
        {currentQuestion.title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        {currentQuestion.subtitle}
      </p>

      <div
        aria-label={currentQuestion.title}
        className={cn(
          "mt-8 grid gap-3",
          currentQuestion.id === "concern" || currentQuestion.id === "age"
            ? "sm:grid-cols-2"
            : "",
        )}
        role={currentQuestion.selection === "single" ? "radiogroup" : "group"}
      >
        {currentQuestion.options.map((option) => {
          const selected = Array.isArray(answer)
            ? answer.includes(option.value)
            : answer === option.value;

          return (
            <button
              aria-checked={selected}
              className={cn(
                "group flex min-h-16 w-full items-center gap-4 rounded-[14px] border px-4 py-4 text-left transition duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]",
                selected
                  ? "border-[var(--gold)] bg-[rgba(180,145,76,.1)] shadow-[0_12px_24px_-22px_rgba(58,31,61,.8)]"
                  : "border-[var(--border)] bg-[var(--cream)] hover:border-[rgba(180,145,76,.62)] hover:bg-[rgba(180,145,76,.05)]",
              )}
              key={option.value}
              onClick={() => onSelect(currentQuestion, option.value)}
              role={currentQuestion.selection === "single" ? "radio" : "checkbox"}
              type="button"
            >
              <span
                className={cn(
                  "grid h-6 w-6 shrink-0 place-items-center border transition",
                  currentQuestion.selection === "single"
                    ? "rounded-full"
                    : "rounded-[7px]",
                  selected
                    ? "border-[var(--gold)] bg-[var(--gold)] text-[var(--cream)]"
                    : "border-[rgba(58,31,61,.26)] bg-[var(--card)]",
                )}
              >
                {selected ? <Check size={14} strokeWidth={3} /> : null}
              </span>
              <span>
                <span className="block font-semibold text-[var(--plum)]">
                  {option.label}
                </span>
                {option.description ? (
                  <span className="mt-1.5 block text-xs leading-5 text-[var(--muted)]">
                    {option.description}
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-6">
        <Button
          className={questionIndex === 0 ? "invisible" : ""}
          onClick={onBack}
          tabIndex={questionIndex === 0 ? -1 : 0}
          variant="ghost"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        <Button
          disabled={!isQuestionAnswered(currentQuestion, answers)}
          onClick={onContinue}
        >
          {questionIndex === skincareQuizQuestions.length - 1
            ? "Generate routine"
            : "Continue"}
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}

function QuizAnalyzing() {
  return (
    <div
      aria-live="polite"
      className="flex min-h-[540px] flex-col items-center justify-center text-center"
      role="status"
    >
      <span className="relative grid h-20 w-20 place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-[rgba(180,145,76,.18)]" />
        <span className="grid h-16 w-16 place-items-center rounded-full bg-[var(--plum)] text-[var(--gold)]">
          <Sparkles size={26} />
        </span>
      </span>
      <p className="buudy-eyebrow mt-8">Analyzing data</p>
      <h2 className="buudy-display mt-3 text-4xl text-[var(--plum)]">
        Formulating your routine.
      </h2>
      <p className="buudy-copy mt-3 max-w-md text-sm">
        Matching your concerns with a practical clinical-grade home ritual.
      </p>
    </div>
  );
}

function QuizResults({
  onReset,
  result,
}: {
  onReset: () => void;
  result: QuizResult;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="buudy-eyebrow">Your skin dossier</p>
          <h2 className="buudy-display mt-3 text-[2.8rem] leading-none text-[var(--plum)] md:text-[4rem]">
            Your routine, <em className="buudy-italic">revealed</em>.
          </h2>
        </div>
        <button
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] transition hover:text-[var(--plum)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]"
          onClick={onReset}
          type="button"
        >
          <RotateCcw size={14} />
          Start over
        </button>
      </div>

      <div className="mt-6 rounded-[14px] border border-[rgba(180,145,76,.34)] bg-[rgba(180,145,76,.08)] p-4">
        <p className="buudy-mono text-[var(--gold)]">Profile</p>
        <p className="mt-2 font-semibold leading-6 text-[var(--plum)]">
          {result.profileTag}
        </p>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          {result.profileSummary}
        </p>
      </div>

      {result.pregnancyWarning ? (
        <div className="mt-4 flex gap-3 rounded-[14px] border border-[rgba(180,145,76,.48)] bg-[rgba(180,145,76,.12)] p-4">
          <ShieldAlert className="mt-0.5 shrink-0 text-[var(--gold)]" size={18} />
          <p className="text-sm leading-6 text-[var(--plum)]">
            <strong>Safety note:</strong> {result.pregnancyWarning}
          </p>
        </div>
      ) : null}

      <div className="mt-6 space-y-3">
        {result.routine.map((step) => (
          <article
            className={cn(
              "grid gap-3 rounded-[14px] border p-5 sm:grid-cols-[56px_1fr]",
              step.highlighted
                ? "border-[rgba(180,145,76,.55)] bg-[var(--plum)] text-[var(--cream)]"
                : "border-[var(--border)] bg-[var(--cream)]",
            )}
            key={step.number}
          >
            <p
              className={cn(
                "buudy-display text-4xl",
                step.highlighted ? "text-[var(--gold)]" : "text-[var(--gold)]",
              )}
            >
              {step.number}
            </p>
            <div>
              <h3
                className={cn(
                  "buudy-display text-2xl",
                  step.highlighted ? "text-[var(--cream)]" : "text-[var(--plum)]",
                )}
              >
                {step.title}
              </h3>
              {step.highlighted ? (
                <p className="buudy-mono mt-2 text-[var(--gold)]">
                  Your prescribed setting: {result.ledSetting}
                </p>
              ) : null}
              <p
                className={cn(
                  "mt-3 text-sm leading-6",
                  step.highlighted
                    ? "text-[rgba(247,241,232,.76)]"
                    : "text-[var(--muted)]",
                )}
              >
                {step.copy}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-[14px] bg-[var(--blush)] p-5 text-center sm:p-7">
        <ClipboardCheck className="mx-auto text-[var(--gold)]" size={22} />
        <h3 className="buudy-display mt-3 text-3xl text-[var(--plum)]">
          Ready to transform your skin?
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[var(--muted)]">
          Get the 7-in-1 clinical tool you need for step 02.
        </p>
        <Button asChild className="mt-5">
          <Link
            href="/products/buudy-led-mask"
            onClick={() => trackQuizEvent("skincare_quiz_mask_cta_clicked")}
          >
            Shop the Buudy Mask
            <ArrowRight size={16} />
          </Link>
        </Button>
      </div>

      <p className="mt-5 text-xs leading-5 text-[var(--muted)]">
        This quiz provides general skincare guidance and is not medical advice.
        Consult a qualified healthcare professional before starting a new
        treatment if you have medical concerns.
      </p>
    </div>
  );
}
