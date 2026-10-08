"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
} from "lucide-react";
import {
  emptyQuizAnswers,
  skincareQuizQuestions,
  type QuizAnswers,
  type QuizQuestion,
  type QuizResult,
} from "@/data/skincareQuiz";
import { buildSkincareQuizResult } from "@/lib/skincareQuiz";
import { QuizResultView } from "./QuizResultView";
import { Button, cn } from "@/components/ui/Button";
import { useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "buudy:skincare-quiz:v3";
const LEGACY_STORAGE_KEYS = ["buudy:skincare-quiz:v1", "buudy:skincare-quiz:v2"];

type QuizStage = "intro" | "questions" | "results";

type SavedQuiz = {
  stage: Exclude<QuizStage, "intro">;
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
  const quizPanel = useRef<HTMLDivElement>(null);
  const currentQuestion = skincareQuizQuestions[questionIndex];
  const result = useMemo<QuizResult | null>(
    () => (stage === "results" ? buildSkincareQuizResult(answers) : null),
    [answers, stage],
  );

  useEffect(() => {
    let storedQuiz: SavedQuiz | null = null;

    try {
      LEGACY_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
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
    if (!storageReady || savedQuiz || stage === "intro") {
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
    setStage("results");
    trackQuizEvent("skincare_quiz_result_viewed");
    scrollToQuizPanel();
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

      {stage === "results" && result ? (
        <QuizResultView
          onReset={resetQuiz}
          result={result}
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
      <p className="buudy-eyebrow">A quick skin routine quiz</p>
      <h2 className="buudy-display mt-4 text-[2.8rem] leading-[1.02] text-[var(--plum)] md:text-[4rem]">
        Build your custom <em className="buudy-italic">routine</em>.
      </h2>
      <p className="buudy-copy mt-5 max-w-xl">
        Answer five short questions to get one clear starting mode and a simple
        first-week plan. No fixed timetable or medical diagnosis.
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
        {["5 short questions", "Simple five-day plan", "Free Buudy guide"].map(
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
          currentQuestion.id === "concern"
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
