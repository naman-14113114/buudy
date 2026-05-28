import type { Product } from "@/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SpecsPanel({ product }: { product: Product }) {
  return (
    <section className="buudy-section bg-[var(--cream)] py-24">
      <div className="buudy-wrap grid gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Specifications" title="The numbers, in detail." />
          <dl className="mt-8">
            {product.specs.map((spec) => (
              <div
                className="flex items-baseline justify-between gap-6 border-t border-[var(--border)] py-4 first:border-t-0"
                key={spec.label}
              >
                <dt className="buudy-mono text-[var(--muted)]">{spec.label}</dt>
                <dd className="buudy-display text-right text-lg text-[var(--plum)]">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <SectionHeading eyebrow="In the box" title="Everything you need." />
          <ul className="mt-8 grid gap-3">
            {product.included.map((item) => (
              <li
                className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] px-5 py-4"
                key={`${item.quantity}-${item.label}`}
              >
                <div className="flex items-center gap-4">
                  <span className="buudy-mono text-sm text-[var(--gold)]">
                    {item.quantity}
                  </span>
                  <span className="buudy-display text-lg text-[var(--plum)]">
                    {item.label}
                  </span>
                </div>
                {item.tag ? (
                  <span className="buudy-mono rounded-full bg-[rgba(184,149,86,.24)] px-3 py-1.5 text-[var(--plum)]">
                    {item.tag}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-2xl border border-[rgba(58,31,61,.15)] bg-[rgba(241,223,210,.5)] p-6">
            <p className="buudy-eyebrow">Product Signals</p>
            <p className="buudy-display mt-2 text-xl text-[var(--plum)]">
              {product.badges.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
