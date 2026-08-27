"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Dumbbell,
  LockKeyhole,
  Moon,
  RotateCcw,
  ShieldAlert,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Sun,
  Utensils,
} from "lucide-react";
import {
  emptyQuizAnswers,
  skincareQuizQuestions,
  type QuizAnswers,
  type QuizQuestion,
  type QuizResult,
} from "@/data/skincareQuiz";
import {
  allQuizLightModes,
  buildSkincareQuizResult,
} from "@/lib/skincareQuiz";
import { Button, cn } from "@/components/ui/Button";
import { useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "buudy:skincare-quiz:v2";
const LEGACY_STORAGE_KEY = "buudy:skincare-quiz:v1";

type QuizStage = "intro" | "questions" | "analyzing" | "results";

type SavedQuiz = {
  stage: Exclude<QuizStage, "intro" | "analyzing">;
  questionIndex: number;
  answers: QuizAnswers;
  planStartDate: string;
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
    sensitivity: [],
  };
}

function isSavedQuiz(value: unknown): value is SavedQuiz {
  if (!value || typeof value !== "object") {
    return false;
  }

  const saved = value as Partial<SavedQuiz>;
  const savedAnswers = saved.answers as Partial<QuizAnswers> | undefined;
  const hasValidAnswers = skincareQuizQuestions.every((question) => {
    const answer = savedAnswers?.[question.id];
    const allowedValues = new Set(
      question.options.map((option) => option.value),
    );

    if (question.selection === "multiple") {
      return (
        Array.isArray(answer) &&
        answer.every(
          (selected) =>
            typeof selected === "string" && allowedValues.has(selected),
        )
      );
    }

    return (
      typeof answer === "string" &&
      (answer === "" || allowedValues.has(answer))
    );
  });
  const hasCompleteResult =
    saved.stage !== "results" ||
    (Boolean(savedAnswers) &&
      skincareQuizQuestions.every((question) =>
        isQuestionAnswered(question, savedAnswers as QuizAnswers),
      ));

  return (
    (saved.stage === "questions" || saved.stage === "results") &&
    typeof saved.questionIndex === "number" &&
    Number.isInteger(saved.questionIndex) &&
    saved.questionIndex >= 0 &&
    saved.questionIndex < skincareQuizQuestions.length &&
    typeof saved.planStartDate === "string" &&
    Number.isFinite(Date.parse(saved.planStartDate)) &&
    hasValidAnswers &&
    hasCompleteResult
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
  const [planStartDate, setPlanStartDate] = useState("");
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
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
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
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Storage can be unavailable in privacy-restricted browser contexts.
      }
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
      planStartDate,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSavedQuiz));
  }, [answers, planStartDate, questionIndex, savedQuiz, stage, storageReady]);

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
    setPlanStartDate(new Date().toISOString());
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
    setPlanStartDate(savedQuiz.planStartDate);
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
    setPlanStartDate("");
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
    setPlanStartDate(new Date().toISOString());
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
        <QuizResults
          onReset={resetQuiz}
          result={result}
          startDate={planStartDate}
        />
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
      <p className="buudy-eyebrow">90-second assessment</p>
      <h2 className="buudy-display mt-4 text-[2.8rem] leading-[1.02] text-[var(--plum)] md:text-[4rem]">
        Build your custom <em className="buudy-italic">routine</em>.
      </h2>
      <p className="buudy-copy mt-5 max-w-xl">
        Answer seven focused questions, then open a detailed five-day timetable
        built around your concerns, skin type, safety profile and real schedule.
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
        {["7 focused questions", "5 days unlocked", "Private by design"].map(
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
        Building your five-day calendar.
      </h2>
      <p className="buudy-copy mt-3 max-w-md text-sm">
        Mapping your answers to light modes, skincare, meals, movement and rest.
      </p>
    </div>
  );
}

function QuizResults({
  onReset,
  result,
  startDate,
}: {
  onReset: () => void;
  result: QuizResult;
  startDate: string;
}) {
  const [selectedDay, setSelectedDay] = useState(1);
  const calendarDays = useMemo(() => {
    const start = startDate ? new Date(startDate) : new Date();
    start.setHours(12, 0, 0, 0);

    return Array.from({ length: 28 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return date;
    });
  }, [startDate]);
  const selectedPlan = result.starterPlan[selectedDay - 1];
  const recommendedIds = useMemo(
    () => new Set(result.recommendedModes.map((mode) => mode.id)),
    [result.recommendedModes],
  );
  const startDateLabel = calendarDays[0].toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
  const endDateLabel = calendarDays[27].toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="buudy-eyebrow">Your five-day starter plan</p>
          <h2 className="buudy-display mt-3 text-[2.8rem] leading-none text-[var(--plum)] md:text-[4rem]">
            Your glow calendar, <em className="buudy-italic">mapped</em>.
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
        <p className="buudy-mono text-[var(--gold)]">Built from your answers</p>
        <p className="mt-2 font-semibold leading-6 text-[var(--plum)]">
          {result.profileTag}
        </p>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          {result.profileSummary}
        </p>
      </div>

      {result.safetyWarning ? (
        <div className="mt-4 flex gap-3 rounded-[14px] border border-[rgba(180,145,76,.48)] bg-[rgba(180,145,76,.12)] p-4">
          <ShieldAlert className="mt-0.5 shrink-0 text-[var(--gold)]" size={18} />
          <p className="text-sm leading-6 text-[var(--plum)]">
            <strong>Safety pause:</strong> {result.safetyWarning}
          </p>
        </div>
      ) : null}

      <section
        aria-labelledby="colour-map-heading"
        className="mt-6 border-y border-[var(--border)] py-6"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="buudy-mono text-[var(--gold)]">Your colour map</p>
            <h3
              className="buudy-display mt-2 text-3xl text-[var(--plum)]"
              id="colour-map-heading"
            >
              Several concerns, one relevant rotation.
            </h3>
          </div>
          <p className="max-w-sm text-xs leading-5 text-[var(--muted)]">
            Recommended first: {result.ledSetting}. The complete mask includes
            all seven visible colours plus near-infrared for later plan stages.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2" aria-label="Buudy light mode map">
          {allQuizLightModes.map((mode) => {
            const recommended = recommendedIds.has(mode.id);

            return (
              <div
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs",
                  recommended
                    ? "border-[rgba(180,145,76,.48)] bg-[var(--card)] font-semibold text-[var(--plum)]"
                    : "border-[var(--border)] text-[var(--muted)] opacity-65",
                )}
                key={mode.id}
                title={mode.purpose}
              >
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full border border-[rgba(58,31,61,.18)]"
                  style={{ background: mode.swatch }}
                />
                {mode.name}
                {mode.wavelength ? ` ${mode.wavelength}` : ""}
                {recommended ? <Check aria-label="Recommended" size={13} /> : null}
              </div>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="calendar-heading"
        className="mt-7 rounded-[16px] border border-[var(--border)] bg-[var(--cream)] p-4 sm:p-6"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="buudy-mono text-[var(--gold)]">28-day roadmap</p>
            <h3
              className="buudy-display mt-2 text-3xl text-[var(--plum)]"
              id="calendar-heading"
            >
              Your first five days are unlocked.
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              {startDateLabel} to {endDateLabel}. Select any unlocked day to see
              its exact timetable.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(180,145,76,.38)] bg-[var(--card)] px-4 py-2 text-xs font-semibold text-[var(--plum)]">
            <CalendarDays className="text-[var(--gold)]" size={15} />
            5 of 28 unlocked
          </div>
        </div>

        <div
          aria-label="28-day skincare calendar"
          className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-7"
          role="tablist"
        >
          {calendarDays.map((date, index) => {
            const day = index + 1;
            const unlocked = day <= result.starterPlan.length;
            const active = selectedDay === day;
            const weekday = date.toLocaleDateString("en-GB", { weekday: "short" });
            const shortDate = date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            });

            return (
              <button
                aria-controls={unlocked ? "starter-day-panel" : undefined}
                aria-disabled={!unlocked}
                aria-label={
                  unlocked
                    ? `Day ${day}, ${weekday} ${shortDate}, unlocked`
                    : `Day ${day}, ${weekday} ${shortDate}, locked`
                }
                aria-selected={unlocked ? active : undefined}
                className={cn(
                  "flex min-h-[76px] flex-col items-start justify-between rounded-[12px] border p-2.5 text-left transition duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]",
                  unlocked && active
                    ? "border-[var(--gold)] bg-[var(--plum)] text-[var(--cream)] shadow-[0_14px_26px_-22px_rgba(58,31,61,.8)]"
                    : unlocked
                      ? "border-[rgba(180,145,76,.42)] bg-[var(--card)] text-[var(--plum)] hover:border-[var(--gold)]"
                      : "cursor-not-allowed border-[var(--border)] bg-[rgba(58,31,61,.035)] text-[var(--muted)] opacity-60",
                )}
                disabled={!unlocked}
                key={date.toISOString()}
                onClick={() => {
                  setSelectedDay(day);
                  trackQuizEvent(`skincare_quiz_day_${day}_viewed`);
                }}
                role="tab"
                type="button"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[.12em]">
                  {weekday}
                </span>
                <span className="flex w-full items-end justify-between gap-1">
                  <span className="buudy-display text-2xl leading-none">{day}</span>
                  {unlocked ? (
                    <Check className="text-[var(--gold)]" size={13} />
                  ) : (
                    <LockKeyhole size={12} />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="selected-day-heading"
        className="mt-6 overflow-hidden rounded-[16px] border border-[var(--border)]"
        id="starter-day-panel"
        role="tabpanel"
      >
        <div className="bg-[var(--plum)] p-5 text-[var(--cream)] sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="buudy-mono text-[var(--gold)]">
                Day {selectedPlan.day} of 5 · {selectedPlan.title}
              </p>
              <h3
                className="buudy-display mt-3 max-w-2xl text-3xl leading-tight text-[var(--cream)] sm:text-4xl"
                id="selected-day-heading"
              >
                {selectedPlan.focus}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[rgba(247,241,232,.74)]">
                {selectedPlan.summary}
              </p>
            </div>
            {selectedPlan.mode ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(247,241,232,.2)] px-3 py-2 text-xs font-semibold">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-full border border-[rgba(247,241,232,.28)]"
                  style={{ background: selectedPlan.mode.swatch }}
                />
                {result.ledUsePaused ? "Reserved" : "Mask"}: {selectedPlan.mode.name}
                {selectedPlan.mode.wavelength
                  ? ` ${selectedPlan.mode.wavelength}`
                  : ""}
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(247,241,232,.2)] px-3 py-2 text-xs font-semibold">
                <Moon className="text-[var(--gold)]" size={14} />
                Recovery, no LED
              </div>
            )}
          </div>
        </div>

        <ol className="bg-[var(--card)] px-5 sm:px-7">
          {selectedPlan.timeline.map((item) => (
            <li
              className="grid grid-cols-[58px_34px_1fr] gap-3 border-b border-[var(--border)] py-5 last:border-b-0 sm:grid-cols-[72px_38px_1fr]"
              key={`${selectedPlan.day}-${item.time}-${item.label}`}
            >
              <div className="pt-1">
                <p className="buudy-mono text-[var(--gold)]">{item.time}</p>
              </div>
              <span className="mt-0.5 grid h-8 w-8 place-items-center rounded-full bg-[rgba(180,145,76,.1)] text-[var(--gold)]">
                <PlanItemIcon kind={item.kind} />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[var(--muted)]">
                  {item.label}
                </p>
                <h4 className="mt-1 font-semibold text-[var(--plum)]">{item.title}</h4>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {item.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-6 bg-[var(--plum)] p-6 text-[var(--cream)] sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="buudy-mono text-[var(--gold)]">Days 6 to 28 are mapped and locked</p>
            <h3 className="buudy-display mt-3 text-3xl leading-tight text-[var(--cream)] sm:text-4xl">
              Keep the complete plan with your Buudy mask.
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[rgba(247,241,232,.74)]">
              Purchase the Buudy 7 Colour LED Mask to continue the full guided
              programme. If you already own one, open Buudy Glow Coach for your
              customer plan, timers and progress tracking.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button
              asChild
              className="!border-[var(--cream)] !bg-[var(--cream)] !text-[var(--plum)]"
            >
              <Link
                href="/products/buudy-led-mask"
                onClick={() => trackQuizEvent("skincare_quiz_unlock_mask_clicked")}
              >
                <ShoppingBag size={16} />
                Purchase mask and continue
              </Link>
            </Button>
            <Button
              asChild
              className="!border-[rgba(247,241,232,.34)] !bg-transparent !text-[var(--cream)]"
              variant="ghost"
            >
              <a
                href="https://app.buudy.com"
                onClick={() => trackQuizEvent("skincare_quiz_existing_customer_app_clicked")}
              >
                <Smartphone size={16} />
                I already own one, open the app
              </a>
            </Button>
          </div>
        </div>
      </div>

      <p className="mt-5 text-xs leading-5 text-[var(--muted)]">
        This plan is general cosmetic and wellbeing guidance, not a diagnosis or
        medical or nutrition advice. Follow the Buudy device manual, use supplied
        eye protection as directed, stop if discomfort occurs, and speak to a
        qualified healthcare professional when pregnancy, medication, epilepsy,
        light sensitivity or another health concern may affect use. Adapt food
        and movement suggestions to allergies, dietary needs and physical ability.
      </p>
    </div>
  );
}

function PlanItemIcon({
  kind,
}: {
  kind: QuizResult["starterPlan"][number]["timeline"][number]["kind"];
}) {
  switch (kind) {
    case "mask":
      return <Sparkles aria-hidden="true" size={15} />;
    case "food":
      return <Utensils aria-hidden="true" size={15} />;
    case "movement":
      return <Dumbbell aria-hidden="true" size={15} />;
    case "recovery":
      return <Moon aria-hidden="true" size={15} />;
    default:
      return <Sun aria-hidden="true" size={15} />;
  }
}
