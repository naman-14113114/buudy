import { features } from "@/data/productSections";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  IconGrid4x4,
  IconShieldHeart,
  IconColorFilter,
  IconBatteryCharging,
  IconShieldCheck,
  IconDiamond,
} from "@tabler/icons-react";

const featureIcons = [
  IconGrid4x4,
  IconShieldHeart,
  IconColorFilter,
  IconBatteryCharging,
  IconShieldCheck,
  IconDiamond,
];

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
          {features.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <article
                className="bg-[var(--cream)] p-8 transition-all duration-300 hover:bg-[var(--card)] hover:shadow-xl md:p-10 group"
                key={feature.title}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Glowing Icon Container */}
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[rgba(184,149,86,.12)] text-[var(--gold)] transition-all duration-300 group-hover:bg-[var(--gold)] group-hover:text-[var(--cream)] shadow-sm">
                    {Icon ? <Icon size={24} stroke={1.5} /> : null}
                  </span>
                  <div className="flex flex-1 items-center gap-4">
                    <span className="h-px flex-1 bg-[rgba(58,31,61,.15)]" />
                    <span className="buudy-mono text-sm text-[var(--gold)] font-medium">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <h3 className="buudy-display mt-6 text-2xl text-[var(--plum)] transition-colors duration-300 group-hover:text-[var(--gold)]">
                  {feature.title}
                </h3>
                <p className="buudy-display mt-2.5 italic text-[var(--plum-soft)]">
                  {feature.kicker}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {feature.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

