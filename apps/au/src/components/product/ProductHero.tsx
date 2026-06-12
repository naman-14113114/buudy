import type { Product } from "@/data/products";
import { ProductGallery } from "./ProductGallery";
import { GiftBundle } from "./GiftBundle";

export function ProductHero({ product }: { product: Product }) {
  return (
    <section
      className="buudy-section bg-[var(--cream)] pt-8 pb-14 [overflow-anchor:none] md:pt-12 md:pb-24"
      style={{ overflowX: "clip", overflowY: "visible" }}
    >
      <div className="buudy-glow -left-20 -top-24 h-[500px] w-[500px] bg-[#f4a17b]" />
      <div className="buudy-glow -right-24 top-52 h-[560px] w-[560px] bg-[#a05080]" />
      <div className="buudy-wrap relative z-10 grid gap-8 [overflow-anchor:none] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[1.05fr_1fr] xl:gap-16">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <ProductGallery images={product.gallery} hasGifts={product.gifts.length > 0} />
        </div>
        <div className="[overflow-anchor:none]">
          <GiftBundle product={product} />
        </div>
      </div>
    </section>
  );
}
