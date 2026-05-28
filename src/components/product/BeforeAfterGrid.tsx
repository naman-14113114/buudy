import Image from "next/image";
import { transformations } from "@/data/productSections";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BeforeAfterGrid() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-24">
      <div className="buudy-wrap">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Real users · Real results"
            title={
              <>
                Eight stories, <em className="buudy-italic">one device</em>.
              </>
            }
          />
          <p className="max-w-sm text-sm leading-7 text-[var(--muted)]">
            Verified customer transformations, photographed in their own homes
            after consistent use of the Buudy LED Mask.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {transformations.map((story) => (
            <article
              className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_-28px_rgba(0,0,0,.34)]"
              key={story.id}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--blush)]">
                <Image
                  alt={story.concern}
                  className="object-cover transition duration-700 hover:scale-105"
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  src={story.image}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="buudy-mono text-[var(--gold)]">{story.concern}</p>
                  <span className="text-xs text-[var(--gold)]">★★★★★</span>
                </div>
                <h3 className="buudy-display mt-3 text-xl text-[var(--plum)]">
                  {story.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  {story.quote}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-3">
                  <span className="buudy-display text-sm text-[var(--plum)]">
                    {story.name}
                  </span>
                  <span className="buudy-mono text-[var(--plum-soft)]">Verified</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
