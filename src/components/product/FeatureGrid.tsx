import { features } from "@/data/productSections";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeatureGrid() {
  return (
    <section className="buudy-section border-y border-[var(--border)] bg-[rgba(241,223,210,.42)] py-24">
      <div className="buudy-wrap">
        <SectionHeading
          eyebrow="Why Buudy"
          title={
            <>
              What makes our mask{" "}
              <em className="buudy-italic text-[var(--gold)]">unique</em>?
            </>
          }
        />
        <div className="mt-16 grid gap-px bg-[rgba(58,31,61,.15)] md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <article
              className="bg-[var(--cream)] p-8 transition hover:bg-[var(--card)] md:p-10"
              key={feature.title}
            >
              <div className="flex items-center gap-4">
                <span className="buudy-mono text-[var(--gold)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-[rgba(58,31,61,.15)]" />
                <span className="buudy-mono text-[var(--muted)]">Feature</span>
              </div>
              <h3 className="buudy-display mt-5 text-2xl text-[var(--plum)]">
                {feature.title}
              </h3>
              <p className="buudy-display mt-3 italic text-[var(--plum-soft)]">
                {feature.kicker}
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
