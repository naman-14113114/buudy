import type { Product } from "@/data/products";
import { ProductGallery } from "./ProductGallery";
import { OmniluxProductGallery } from "./OmniluxProductGallery";
import { GiftBundle } from "./GiftBundle";

export function ProductHero({
  product,
  galleryVariant = "default",
}: {
  product: Product;
  galleryVariant?: "default" | "omnilux";
}) {
  return (
    <section
      id="product-hero"
      className={`buudy-section bg-[var(--cream)] [overflow-anchor:none] ${
        galleryVariant === "omnilux"
          ? "pt-2 pb-10 md:pt-3 md:pb-16"
          : "pt-4 pb-12 md:pt-6 md:pb-20"
      }`}
      style={{ overflowX: "clip", overflowY: "visible" }}
    >
      <div className="buudy-glow -left-20 -top-24 h-[500px] w-[500px] bg-[#f4a17b]" />
      <div className="buudy-glow -right-24 top-52 h-[560px] w-[560px] bg-[#a05080]" />
      <div
        className={`buudy-wrap relative z-10 grid gap-8 [overflow-anchor:none] ${
          galleryVariant === "omnilux"
            ? "lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[1.02fr_1fr] xl:gap-12"
            : "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[1.05fr_1fr] xl:gap-16"
        }`}
      >
        <div className="lg:sticky lg:top-6 lg:self-start w-full">
          {galleryVariant === "omnilux" ? (
            <OmniluxProductGallery images={product.gallery} hasGifts={product.gifts.length > 0} />
          ) : (
            <ProductGallery images={product.gallery} hasGifts={product.gifts.length > 0} />
          )}
        </div>
        <div className="lg:sticky lg:top-6 lg:self-start w-full [overflow-anchor:none]">
          <GiftBundle product={product} />
        </div>
      </div>
    </section>
  );
}
