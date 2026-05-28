import Image from "next/image";
import { realLifeImages } from "@/data/productSections";

export function ResultsMarquee() {
  const images = [...realLifeImages, ...realLifeImages];

  return (
    <section className="buudy-section border-y border-[var(--border)] bg-[var(--plum)] py-16 text-[var(--cream)]">
      <div className="buudy-wrap flex items-end justify-between gap-6">
        <div>
          <p className="buudy-mono text-[var(--gold)]">Reviews & Real Results</p>
          <h2 className="buudy-display mt-3 text-[2.5rem] leading-tight text-[var(--cream)] md:text-5xl">
            Buudy mask, in real life.
          </h2>
        </div>
        <p className="buudy-mono hidden text-[rgba(247,241,232,.62)] md:block">
          01 / 01
        </p>
      </div>
      <div className="mt-10 overflow-hidden">
        <div className="buudy-marquee">
          {images.map((image, index) => (
            <div
              className="relative h-72 w-72 flex-none overflow-hidden rounded-2xl bg-[var(--ink)]"
              key={`${image.src}-${index}`}
            >
              <Image alt={image.alt} className="object-cover" fill sizes="288px" src={image.src} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
