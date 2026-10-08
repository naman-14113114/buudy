import Image from "next/image";
import { ShieldCheck, Sparkles } from "lucide-react";
import { SkincareQuiz } from "./SkincareQuiz";

export function SkincareQuizPage() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-9 md:py-14 lg:py-16">
      <div className="buudy-glow -left-28 top-8 h-[420px] w-[420px] bg-[#f4a17b]" />
      <div className="buudy-glow -right-36 bottom-20 h-[500px] w-[500px] bg-[#a05080]" />

      <div className="buudy-wrap relative z-10">
        <div className="mb-8 max-w-3xl md:mb-10">
          <p className="buudy-eyebrow">Buudy skincare quiz</p>
          <h1 className="buudy-display mt-4 text-[2.7rem] leading-[1.02] text-[var(--plum)] md:text-[4.5rem]">
            Find a simpler{" "}
            <em className="buudy-italic text-[var(--gold)]">starting routine</em>.
          </h1>
          <p className="buudy-copy mt-5 max-w-2xl">
            Five short questions. One clear place to start, a gentle five-day
            plan, and the Buudy e-book to read free.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[.55fr_1.45fr] lg:items-start">
          <aside className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-[var(--plum)] lg:aspect-[4/5]">
              <Image
                alt="Buudy LED mask presented in its travel case"
                className="object-cover"
                fill
                priority
                sizes="(min-width: 1024px) 26vw, 92vw"
                src="/images/home/04-home-mask-spotlight.png"
              />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(23,10,24,.88))] p-6 pt-24 text-[var(--cream)]">
                <p className="buudy-mono text-[var(--gold)]">Buudy light routine</p>
                <p className="buudy-display mt-2 text-3xl leading-tight">
                  A calmer way to begin.
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4">
                <Sparkles className="shrink-0 text-[var(--gold)]" size={18} />
                <span className="text-xs font-semibold leading-5 text-[var(--plum)]">
                  One starting mode
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-[14px] border border-[var(--border)] bg-[var(--card)] p-4">
                <ShieldCheck className="shrink-0 text-[var(--gold)]" size={18} />
                <span className="text-xs font-semibold leading-5 text-[var(--plum)]">
                  E-book included
                </span>
              </div>
            </div>
          </aside>

          <div className="order-1 lg:order-2"><SkincareQuiz /></div>
        </div>
      </div>
    </section>
  );
}
