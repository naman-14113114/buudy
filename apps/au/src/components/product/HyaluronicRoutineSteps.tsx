
"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function HyaluronicRoutineSteps({ children }: { children: ReactNode }) {
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const element = list.current;
    if (!element || !window.IntersectionObserver || !element.animate) {
      return;
    }

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        observer.disconnect();
        if (!motion.matches) {
          element.animate(
            [{ opacity: 0.78, transform: "translateY(5px)" }, { opacity: 1, transform: "none" }],
            { duration: 240, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
          );
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <ol className="mt-5 space-y-4 md:mt-6" ref={list}>
      {children}
    </ol>
  );
}
