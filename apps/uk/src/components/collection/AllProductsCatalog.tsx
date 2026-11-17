"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingBag, Truck, ShieldCheck, RefreshCw, Clock } from "lucide-react";
import { products, type Product } from "@/data/products";
import { formatMoney } from "@/lib/money";
import { useCart } from "@/components/cart/CartProvider";

type CategoryFilter = "all" | "devices" | "skincare" | "bundles" | "digital";
type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

const EXCLUDED_PRODUCT_IDS = new Set([
  "buudy-package-protection",
  "buudy-phyto-renew-retinol-alternative-serum",
  "buudy-blemish-defense-niacinamide-gel",
  "buudy-hydrating-serum",
  "the-ultimate-hydration-duo",
]);

function getProductCategory(product: Product): "devices" | "skincare" | "bundles" | "digital" {
  if (
    product.id === "buudy-led-mask" ||
    product.id === "buudy-red-light-torch" ||
    product.id === "buudy-ipl-device"
  ) {
    return "devices";
  }
  if (
    product.id === "the-ultimate-renewal-collection-box" ||
    product.id === "anti-age-peptide-collection"
  ) {
    return "bundles";
  }
  if (product.id === "buudy-skincare-ebook" || product.id === "buudy-gift-card") {
    return "digital";
  }
  return "skincare";
}

function getProductDisplayInfo(product: Product) {
  let title = product.name.replace(/\s*\(\d+\s*ml\)/gi, "").trim();
  let subtitle = "Clinical Formulation";
  let benefit = product.shortDescription;

  switch (product.id) {
    case "buudy-led-mask":
      title = "Buudy 7 Colour LED Face Mask";
      subtitle = "7-Colour Clinical Phototherapy";
      benefit = "CE-certified clinical phototherapy mask with 7 wavelengths for targeted anti-ageing, acne control, and skin rejuvenation.";
      break;
    case "buudy-red-light-torch":
      title = "Buudy Targeted Red Light Therapy Torch";
      subtitle = "Targeted Red & NIR Therapy";
      benefit = "Medical-grade 660nm red and 850nm near-infrared targeted phototherapy for deep cellular repair and localized spot treatments.";
      break;
    case "buudy-ipl-device":
      title = "Buudy Sapphire Ice IPL Hair Removal Handset";
      subtitle = "Sapphire Cooling IPL Technology";
      benefit = "Virtually painless permanent hair reduction featuring Sapphire Ice Cooling contact technology and 999,999 flashes.";
      break;
    case "buudy-peptide-ageless-am-pm-cream":
      title = "Buudy Peptide Ageless AM/PM Cream";
      subtitle = "Multi-Peptide Restorative Cream";
      benefit = "High-performance hexapeptide moisturiser engineered to visibly firm facial contours, boost elasticity, and deeply hydrate day and night.";
      break;
    case "buudy-peptide-age-defying-eye-cream":
      title = "Buudy Peptide Age-Defying Eye Cream";
      subtitle = "Targeted Periorbital Treatment";
      benefit = "Concentrated micro-contour peptide cream calibrated to soften crow's feet, attenuate under-eye puffiness, and brighten dark circles.";
      break;
    case "buudy-peptide-serum":
      title = "Buudy Peptide Anti-Ageing Serum";
      subtitle = "Collagen-Lock Hexapeptide Serum";
      benefit = "Bio-fermented Hexapeptide-11 and Dipalmitoyl Hydroxyproline complex formulated to stimulate collagen synthesis and restore firmness.";
      break;
    case "buudy-light-activating-hyaluronic-serum":
      title = "Buudy Light-Activating Hyaluronic Serum";
      subtitle = "Pre-Light Optical Hydrogel Primer";
      benefit = "100% water-based optical hydrogel matrix providing multi-depth cellular plumping and 72-hour deep moisture lock.";
      break;
    case "buudy-aha-peeling-concentrate":
      title = "Buudy AHA Peeling Concentrate";
      subtitle = "Overnight Resurfacing Peel";
      benefit = "Potent yet gentle 10% botanical lactic acid peel that sweeps away dull cells, dissolves congested pores, and reveals luminous glass skin.";
      break;
    case "buudy-bioactive-prebiotics-serum":
      title = "Buudy Bioactive Prebiotics Jelly Serum";
      subtitle = "Microbiome Barrier Balancing Jelly";
      benefit = "Lightweight prebiotic gel serum that balances skin microflora, reinforces the moisture barrier, and soothes reactive skin.";
      break;
    case "buudy-blemish-purifying-face-wash":
      title = "Buudy Blemish-Purifying Face Wash";
      subtitle = "Botanical Sebum-Balancing Cleanser";
      benefit = "Gentle pH-balanced daily cleanser formulated with Nordic botanical stem cells to purify pores without stripping moisture.";
      break;
    case "the-ultimate-renewal-collection-box":
      title = "The Ultimate Renewal Collection Box";
      subtitle = "Luxury 4-Piece Clinical Ritual";
      benefit = "Comprehensive clinical trilogy featuring AHA peel, hyaluronic gel, and peptide serum presented in a bespoke magnetic gift box.";
      break;
    case "anti-age-peptide-collection":
      title = "Anti-Age Peptide Collection Box";
      subtitle = "Tri-Active Peptide Treatment Set";
      benefit = "The complete peptide-powered anti-ageing ritual combining full-size serum, AM/PM cream, and eye treatment in an exquisite gift carton.";
      break;
    case "buudy-skincare-ebook":
      title = "The Science of Radiant Skin eBook";
      subtitle = "Clinical Phototherapy Protocol";
      benefit = "Definitive 40+ page clinical guide covering light therapy wavelengths, treatment schedules, and active ingredient layering.";
      break;
    case "buudy-gift-card":
      title = "Buudy Official Digital E-Gift Card";
      subtitle = "Digital Glow Voucher";
      benefit = "The ultimate gift of radiant skin. Delivered instantly via electronic code to your email inbox, valid sitewide.";
      break;
  }

  return { title, subtitle, benefit };
}

export function AllProductsCatalog() {
  const { addProduct, openCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Filter out removed products & duplicates by id
  const catalogProducts = useMemo(() => {
    const seen = new Set<string>();
    const unique: Product[] = [];

    for (const p of products) {
      if (EXCLUDED_PRODUCT_IDS.has(p.id)) continue;
      if (!seen.has(p.id)) {
        seen.add(p.id);
        unique.push(p);
      }
    }
    return unique;
  }, []);

  const counts = useMemo(() => {
    const res = { all: catalogProducts.length, devices: 0, skincare: 0, bundles: 0, digital: 0 };
    for (const p of catalogProducts) {
      const cat = getProductCategory(p);
      res[cat] = (res[cat] || 0) + 1;
    }
    return res;
  }, [catalogProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    let list = catalogProducts.filter((product) => {
      if (selectedCategory === "all") return true;
      return getProductCategory(product) === selectedCategory;
    });

    switch (sortBy) {
      case "price-asc":
        list = [...list].sort((a, b) => a.priceCents - b.priceCents);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.priceCents - a.priceCents);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case "featured":
      default:
        // Keep canonical curated order
        break;
    }

    return list;
  }, [catalogProducts, selectedCategory, sortBy]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addProduct(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId((current) => (current === product.id ? null : current));
    }, 1800);
    openCart();
  };

  return (
    <div className="bg-[var(--cream)] min-h-screen text-[var(--plum)]">
      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-12 pb-12 md:pt-16 md:pb-16 border-b border-[rgba(46,16,47,0.08)] bg-gradient-to-b from-[#f8ede2] via-[var(--cream)] to-[var(--cream)]">
        <div className="buudy-wrap">
          <nav className="flex items-center gap-2 text-xs text-[var(--muted)] mb-5 buudy-mono tracking-widest uppercase">
            <Link href="/" className="hover:text-[var(--plum)] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[var(--gold)]">All Products</span>
          </nav>

          <div className="max-w-3xl">
            <p className="buudy-eyebrow text-xs md:text-sm mb-3">Clinical Phototherapy & Bioactive Formulations</p>
            <h1 className="buudy-heading text-4xl sm:text-5xl md:text-6xl tracking-tight text-[var(--plum)]">
              The Complete <em className="buudy-italic font-normal">Buudy Collection</em>
            </h1>
            <p className="buudy-copy text-sm sm:text-base md:text-lg mt-4 max-w-2xl text-[var(--muted)] leading-relaxed">
              Engineered to elevate your daily ritual. Explore our CE-certified LED therapy devices, targeted spot treatments, and clinically proven skincare formulations backed by independent science.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Sort Controls — NON-STICKY (scrolls naturally with page) */}
      <section className="border-b border-[rgba(46,16,47,0.08)] py-5 bg-[var(--cream)]">
        <div className="buudy-wrap flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
            {[
              { id: "all", label: "All Products", count: counts.all },
              { id: "devices", label: "Light Therapy", count: counts.devices },
              { id: "skincare", label: "Clinical Skincare", count: counts.skincare },
              { id: "bundles", label: "Sets & Bundles", count: counts.bundles },
              { id: "digital", label: "Digital & Gifts", count: counts.digital },
            ].map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as CategoryFilter)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-[var(--plum)] text-[var(--cream)] shadow-sm"
                      : "bg-white/90 text-[var(--plum)] border border-[rgba(46,16,47,0.12)] hover:border-[var(--gold)] hover:bg-white"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      active ? "bg-white/20 text-[var(--cream)]" : "bg-[rgba(46,16,47,0.06)] text-[var(--muted)]"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort Selector & Product Count */}
          <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
            <span className="text-[var(--muted)] buudy-mono tracking-wider uppercase text-[11px] hidden sm:inline">
              Showing {filteredAndSortedProducts.length} items
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <label htmlFor="sort-select" className="text-[var(--muted)] buudy-mono uppercase text-[10px] tracking-wider">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-white border border-[rgba(46,16,47,0.12)] rounded-lg px-3 py-1.5 text-xs text-[var(--plum)] font-medium focus:outline-none focus:ring-1 focus:ring-[var(--gold)] cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-10 md:py-16">
        <div className="buudy-wrap">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-[rgba(46,16,47,0.08)] p-8">
              <p className="text-lg text-[var(--plum)] font-semibold">No products found in this category.</p>
              <button
                onClick={() => setSelectedCategory("all")}
                className="mt-4 px-6 py-2.5 rounded-full bg-[var(--plum)] text-[var(--cream)] text-xs font-semibold uppercase tracking-wider hover:bg-[var(--plum-soft)] transition-colors cursor-pointer"
              >
                View All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7">
              {filteredAndSortedProducts.map((product, index) => {
                const isAdded = addedProductId === product.id;
                const imageSrc = product.cartImage || product.gallery?.[0]?.src || "/images/placeholder.webp";
                const { title, subtitle, benefit } = getProductDisplayInfo(product);

                return (
                  <div
                    key={product.id}
                    className="group flex flex-col rounded-2xl bg-white border border-[rgba(46,16,47,0.08)] overflow-hidden shadow-sm hover:shadow-xl hover:border-[rgba(184,149,86,0.4)] transition-all duration-300"
                  >
                    {/* End-to-end Image (Spans 100% width of card, zero padding, NOTHING on image) */}
                    <Link
                      href={`/products/${product.slug}`}
                      className="relative aspect-square w-full bg-[#fbf7f1] overflow-hidden block cursor-pointer"
                    >
                      <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        priority={index < 4}
                      />
                    </Link>

                    {/* Card Content Body */}
                    <div className="flex flex-col flex-1 p-5 sm:p-6">
                      {/* Subtitle / Category */}
                      <p className="buudy-mono text-[10px] text-[var(--gold)] font-medium tracking-[0.18em] uppercase mb-1.5">
                        {subtitle}
                      </p>

                      {/* Product Title */}
                      <h2 className="buudy-display text-[17px] leading-snug font-semibold text-[var(--plum)] group-hover:text-[var(--gold)] transition-colors min-h-[2.85rem] line-clamp-2">
                        <Link href={`/products/${product.slug}`}>{title}</Link>
                      </h2>

                      {/* Properly Formatted Star Rating & Review Count */}
                      <div className="flex items-center gap-1.5 mt-2 mb-2.5">
                        <div className="flex items-center text-[var(--gold)]">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-3.5 h-3.5 fill-[var(--gold)] text-[var(--gold)]"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs font-bold text-[var(--plum)]">
                          {product.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-[var(--muted)]">
                          ({product.reviewCount} reviews)
                        </span>
                      </div>

                      {/* Clean Product Benefit Description */}
                      <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed mb-4 min-h-[2.35rem]">
                        {benefit}
                      </p>

                      {/* Price & Signature Buudy Add to Cart Button */}
                      <div className="mt-auto pt-3 border-t border-[rgba(46,16,47,0.06)] flex flex-col gap-3">
                        <div className="flex items-baseline gap-2">
                          <span className="buudy-display text-2xl font-bold text-[var(--plum)]">
                            {product.priceCents === 0 ? "FREE" : formatMoney(product.priceCents, product.currency)}
                          </span>
                          {product.compareAtCents && product.compareAtCents > product.priceCents ? (
                            <span className="text-sm text-[var(--muted)] line-through">
                              {formatMoney(product.compareAtCents, product.currency)}
                            </span>
                          ) : null}
                        </div>

                        {/* Signature Buudy Full-Width Wipe Button */}
                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(e, product)}
                          disabled={isAdded}
                          className="buudy-cart-wipe relative flex min-h-12 w-full items-center justify-center overflow-hidden rounded-full border border-[var(--plum)] bg-[var(--plum)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[var(--cream)] shadow-md transition-all duration-300 hover:border-[var(--gold)] active:scale-95 cursor-pointer"
                        >
                          <span className="buudy-cart-wipe-content inline-flex items-center justify-center gap-2">
                            {isAdded ? (
                              <>
                                <Check size={16} />
                                <span>Added To Cart</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag size={15} />
                                <span>Add To Cart</span>
                              </>
                            )}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Brand Value & Trust Guarantees */}
      <section className="border-t border-[rgba(46,16,47,0.08)] bg-[#f6ede2] py-14 md:py-18">
        <div className="buudy-wrap">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[var(--plum)] shadow-xs shrink-0">
                <Truck size={22} className="text-[var(--gold)]" />
              </div>
              <div>
                <h3 className="buudy-display text-base font-semibold text-[var(--plum)]">Free UK Delivery</h3>
                <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                  Fast tracked Royal Mail dispatch across the United Kingdom on all qualified orders.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[var(--plum)] shadow-xs shrink-0">
                <ShieldCheck size={22} className="text-[var(--gold)]" />
              </div>
              <div>
                <h3 className="buudy-display text-base font-semibold text-[var(--plum)]">30-Day In-Home Trial</h3>
                <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                  Try our phototherapy devices risk-free at home. Full refund if you don&apos;t love your results.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[var(--plum)] shadow-xs shrink-0">
                <RefreshCw size={22} className="text-[var(--gold)]" />
              </div>
              <div>
                <h3 className="buudy-display text-base font-semibold text-[var(--plum)]">Certified Formulations</h3>
                <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                  ISO 22716 GMP certified, clean vegan actives formulated without parabens or silicones.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[var(--plum)] shadow-xs shrink-0">
                <Clock size={22} className="text-[var(--gold)]" />
              </div>
              <div>
                <h3 className="buudy-display text-base font-semibold text-[var(--plum)]">Dedicated UK Support</h3>
                <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">
                  Our specialist skincare advisory team is here 7 days a week to support your ritual.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
