import type { Product } from "@/data/products";
import { ProductGallery } from "./ProductGallery";
import { GiftBundle } from "./GiftBundle";

export function ProductHero({ product }: { product: Product }) {
  return (
    <section className="buudy-section bg-[var(--cream)] py-10 md:py-16">
      <div className="buudy-glow -left-20 -top-24 h-[500px] w-[500px] bg-[#f4a17b]" />
      <div className="buudy-glow -right-24 top-52 h-[560px] w-[560px] bg-[#a05080]" />
      <div className="buudy-wrap relative z-10 grid gap-4 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-16">
        <ProductGallery images={product.gallery} />
        <GiftBundle product={product} />
      </div>
    </section>
  );
}
