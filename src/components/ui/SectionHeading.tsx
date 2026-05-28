import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  align?: "left" | "center";
  invert?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  invert,
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={invert ? "buudy-mono text-[var(--gold)]" : "buudy-eyebrow"}>
        {eyebrow}
      </p>
      <h2
        className={`buudy-display mt-4 text-[2.5rem] leading-[1.06] md:text-5xl ${
          invert ? "text-[var(--cream)]" : "text-[var(--plum)]"
        }`}
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={`mt-4 leading-7 ${
            invert ? "text-[rgba(247,241,232,.7)]" : "text-[var(--muted)]"
          }`}
        >
          {copy}
        </p>
      ) : null}
    </div>
  );
}
