"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/media";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [selected, setSelected] = useState(0);
  const current = images[selected] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-[var(--blush)]">
        <div className="absolute left-5 top-5 z-10 flex flex-col gap-2">
          <span className="buudy-mono rounded-full bg-[var(--plum)] px-4 py-2 text-[var(--cream)]">
            50% off
          </span>
          <span className="buudy-mono rounded-full bg-[rgba(247,241,232,.9)] px-4 py-2 text-[var(--plum)]">
            Spring glow kit
          </span>
        </div>
        <Image
          alt={current.alt}
          className="object-cover transition duration-700 hover:scale-[1.025]"
          fill
          loading="eager"
          sizes="(min-width: 1024px) 50vw, 100vw"
          src={current.src}
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
        {images.map((image, index) => (
          <button
            aria-label={`Show image ${index + 1}`}
            aria-pressed={selected === index}
            className={`relative aspect-square overflow-hidden rounded-lg border transition ${
              selected === index
                ? "border-[var(--plum)] opacity-100 shadow-[0_0_0_1px_var(--plum)]"
                : "border-[var(--border)] opacity-70 hover:opacity-100"
            }`}
            key={image.src}
            onClick={() => setSelected(index)}
            type="button"
          >
            <Image
              alt=""
              className="object-cover"
              fill
              loading={index === 0 ? "eager" : "lazy"}
              sizes="90px"
              src={image.src}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
