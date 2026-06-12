"use client";

import type { ChangeEvent, FormEvent, RefObject } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  PencilLine,
  Send,
  Star,
  UploadCloud,
  X,
} from "lucide-react";
import { Button, cn } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { market } from "@/lib/market";
import type {
  ProductReview,
  ProductReviewSubmissionResponse,
  ProductReviewsResponse,
  ProductReviewSortOption,
} from "@/types/reviews";

type AnimatableProductReview = ProductReview & {
  isNew?: boolean;
  staggerIndex?: number;
};

type ProductReviewsGridProps = {
  averageRating: number;
  productHandle: string;
  initialReviews: ProductReview[];
  pageSize: number;
  ratingDistribution: Record<string, number>;
  total: number;
};

type ReviewFilters = {
  rating: number | null;
  sort: ProductReviewSortOption;
  verifiedOnly: boolean;
  withPhotos: boolean;
};

type OpenFilterMenu = "stars" | "sort" | null;

const defaultReviewFilters: ReviewFilters = {
  rating: null,
  sort: "most-recent",
  verifiedOnly: false,
  withPhotos: false,
};

const starFilterOptions = [
  { label: "All stars", value: null },
  { label: "5 star", value: 5 },
  { label: "4 star", value: 4 },
  { label: "3 star", value: 3 },
  { label: "2 star", value: 2 },
  { label: "1 star", value: 1 },
] as const;

const reviewSortLabels: Record<ProductReviewSortOption, string> = {
  "most-recent": "Most recent",
  oldest: "Oldest",
  "with-photos": "With photos",
  "highest-rating": "Highest ratings",
  "lowest-rating": "Lowest ratings",
};

const reviewSortOptions = Object.entries(reviewSortLabels).map(([value, label]) => ({
  label,
  value: value as ProductReviewSortOption,
}));

function areReviewFiltersEqual(a: ReviewFilters, b: ReviewFilters) {
  return (
    a.rating === b.rating &&
    a.sort === b.sort &&
    a.verifiedOnly === b.verifiedOnly &&
    a.withPhotos === b.withPhotos
  );
}

const reviewImageCache = new Map<string, Promise<void>>();

function preloadReviewImage(src: string) {
  if (!src || typeof window === "undefined") {
    return Promise.resolve();
  }

  const cached = reviewImageCache.get(src);

  if (cached) {
    return cached;
  }

  const promise = new Promise<void>((resolve) => {
    const image = new window.Image();
    const settle = () => {
      if (typeof image.decode === "function") {
        image.decode().catch(() => undefined).finally(resolve);
      } else {
        resolve();
      }
    };

    image.decoding = "async";
    image.onload = settle;
    image.onerror = () => resolve();
    image.src = src;

    if (image.complete) {
      settle();
    }
  });

  reviewImageCache.set(src, promise);

  return promise;
}

function preloadReviewImages(images: string[]) {
  return Promise.all(images.map(preloadReviewImage)).then(() => undefined);
}

function RatingStars({ rating, size = 17 }: { rating: number; size?: number }) {
  const filledStars = "★".repeat(rating);
  const emptyStars = "★".repeat(5 - rating);

  return (
    <span
      aria-label={`${rating} out of 5 stars`}
      className="inline-flex leading-none tracking-[0.04em] text-[var(--gold)]"
      role="img"
      style={{ fontSize: size }}
    >
      <span aria-hidden="true">{filledStars}</span>
      {emptyStars ? (
        <span aria-hidden="true" className="opacity-25">
          {emptyStars}
        </span>
      ) : null}
    </span>
  );
}

function RatingBreakdown({
  activeRating,
  disabled,
  distribution,
  onSelect,
  total,
}: {
  activeRating: number | null;
  disabled: boolean;
  distribution: Record<string, number>;
  onSelect: (rating: number | null) => void;
  total: number;
}) {
  return (
    <div className="mt-6 space-y-2">
      <button
        aria-pressed={activeRating === null}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left transition hover:bg-[rgba(180,145,76,.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]",
          activeRating === null && "bg-[rgba(180,145,76,.12)]",
        )}
        disabled={disabled}
        onClick={() => onSelect(null)}
        type="button"
      >
        <span className="buudy-mono text-[var(--plum-soft)]">All reviews</span>
        <span className="buudy-mono text-[var(--plum-soft)]">
          {total.toLocaleString(market.locale)}
        </span>
      </button>

      {[5, 4, 3, 2, 1].map((rating) => {
        const count = distribution[String(rating)] ?? 0;
        const width = total ? `${(count / total) * 100}%` : "0%";

        return (
          <button
            aria-label={`Show only ${rating}-star reviews`}
            aria-pressed={activeRating === rating}
            className={cn(
              "grid w-full grid-cols-[5.5rem_1fr_4rem] items-center gap-3 rounded-lg px-2 py-1.5 text-left transition hover:bg-[rgba(180,145,76,.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]",
              activeRating === rating && "bg-[rgba(180,145,76,.12)]",
            )}
            disabled={disabled}
            key={rating}
            onClick={() => onSelect(rating)}
            type="button"
          >
            <span className="inline-flex items-center gap-1 text-[var(--gold)]">
              <span aria-hidden="true" className="text-sm leading-none">★</span>
              <span className="buudy-mono text-[var(--plum-soft)]">{rating} star</span>
            </span>
            <span className="h-2 overflow-hidden rounded-full bg-[rgba(58,31,61,.1)]">
              <span
                className="block h-full rounded-full bg-[var(--gold)] transition-[width] duration-300 ease-out"
                style={{ width }}
              />
            </span>
            <span className="buudy-mono text-right text-[var(--plum-soft)]">
              {count.toLocaleString(market.locale)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ReviewFilterCheckbox({
  checked,
  disabled,
  label,
  onToggle,
}: {
  checked: boolean;
  disabled: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <button
      aria-checked={checked}
      className={cn(
        "inline-flex items-center gap-1 sm:gap-3 whitespace-nowrap rounded-full border border-[rgba(58,31,61,.16)] bg-[rgba(255,252,245,.72)] px-1.5 sm:px-4 py-1.5 sm:py-3 text-[10px] sm:text-sm font-semibold text-[var(--plum)] transition hover:border-[rgba(180,145,76,.5)] hover:bg-[rgba(180,145,76,.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-60",
        checked && "border-[rgba(180,145,76,.62)] bg-[rgba(180,145,76,.14)]",
      )}
      disabled={disabled}
      onClick={onToggle}
      role="checkbox"
      type="button"
    >
      <span
        className={cn(
          "grid h-4 w-4 sm:h-5 sm:w-5 place-items-center rounded-[5px] sm:rounded-[6px] border border-[rgba(58,31,61,.22)] bg-[var(--cream)] text-[var(--cream)] transition",
          checked && "border-[var(--gold)] bg-[var(--plum)]",
        )}
      >
        <Check aria-hidden="true" size={14} strokeWidth={2.6} />
      </span>
      {label}
    </button>
  );
}

function ReviewFiltersToolbar({
  disabled,
  filters,
  onRatingChange,
  onSortChange,
  onTogglePhotos,
  onToggleVerified,
  openMenu,
  setOpenMenu,
  toolbarRef,
}: {
  disabled: boolean;
  filters: ReviewFilters;
  onRatingChange: (rating: number | null) => void;
  onSortChange: (sort: ProductReviewSortOption) => void;
  onTogglePhotos: () => void;
  onToggleVerified: () => void;
  openMenu: OpenFilterMenu;
  setOpenMenu: (menu: OpenFilterMenu) => void;
  toolbarRef: RefObject<HTMLDivElement | null>;
}) {
  const activeStarsLabel =
    filters.rating === null ? "All stars" : `${filters.rating} star`;
  const dropdownButtonClass =
    "inline-flex min-h-8 sm:min-h-12 items-center justify-between gap-1 sm:gap-3 whitespace-nowrap rounded-full border border-[rgba(58,31,61,.16)] bg-[rgba(255,252,245,.72)] px-2 sm:px-4 py-1.5 sm:py-3 text-[10px] sm:text-sm font-semibold text-[var(--plum)] transition hover:border-[rgba(180,145,76,.5)] hover:bg-[rgba(180,145,76,.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-60";
  const menuClass =
    "absolute z-30 mt-3 w-64 overflow-hidden rounded-[18px] border border-[rgba(58,31,61,.16)] bg-[var(--card)] p-2 shadow-[0_24px_54px_-32px_rgba(58,31,61,.58)]";
  const menuItemClass =
    "flex w-full items-center justify-between rounded-[13px] px-4 py-3 text-left text-sm font-semibold text-[var(--plum)] transition hover:bg-[rgba(180,145,76,.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]";

  return (
    <div
      className="mb-8 rounded-[22px] border border-[rgba(58,31,61,.12)] bg-[rgba(255,252,245,.68)] p-4 shadow-[0_18px_46px_-38px_rgba(58,31,61,.55)]"
      ref={toolbarRef}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-nowrap items-center gap-1.5 sm:gap-3">
          <span className="buudy-display text-sm sm:text-xl text-[var(--plum)]">Filters</span>
          <div className="relative">
            <button
              aria-controls="buudy-review-stars-menu"
              aria-expanded={openMenu === "stars"}
              className={dropdownButtonClass}
              disabled={disabled}
              onClick={() => setOpenMenu(openMenu === "stars" ? null : "stars")}
              type="button"
            >
              <span>{activeStarsLabel}</span>
              <ChevronDown
                aria-hidden="true"
                className={cn("transition", openMenu === "stars" && "rotate-180")}
                size={17}
              />
            </button>
            {openMenu === "stars" ? (
              <div className={menuClass} id="buudy-review-stars-menu" role="menu">
                {starFilterOptions.map((option) => {
                  const isActive = filters.rating === option.value;

                  return (
                    <button
                      className={menuItemClass}
                      key={option.label}
                      onClick={() => {
                        onRatingChange(option.value);
                        setOpenMenu(null);
                      }}
                      role="menuitemradio"
                      aria-checked={isActive}
                      type="button"
                    >
                      <span>{option.label}</span>
                      {isActive ? <Check aria-hidden="true" size={16} /> : null}
                    </button>
                  );
                })}
                <div className="sm:hidden mt-2 pt-2 border-t border-[rgba(58,31,61,.1)]">
                  <button
                    className={menuItemClass}
                    onClick={() => {
                      onTogglePhotos();
                      setOpenMenu(null);
                    }}
                    role="menuitemcheckbox"
                    aria-checked={filters.withPhotos}
                    type="button"
                  >
                    <span>With photos</span>
                    {filters.withPhotos ? <Check aria-hidden="true" size={16} /> : null}
                  </button>
                  <button
                    className={menuItemClass}
                    onClick={() => {
                      onToggleVerified();
                      setOpenMenu(null);
                    }}
                    role="menuitemcheckbox"
                    aria-checked={filters.verifiedOnly}
                    type="button"
                  >
                    <span>Verified purchase</span>
                    {filters.verifiedOnly ? <Check aria-hidden="true" size={16} /> : null}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          <div className="hidden sm:flex flex-nowrap items-center gap-1.5 sm:gap-3">
            <ReviewFilterCheckbox
              checked={filters.withPhotos}
              disabled={disabled}
              label="With photos"
              onToggle={onTogglePhotos}
            />
            <ReviewFilterCheckbox
              checked={filters.verifiedOnly}
              disabled={disabled}
              label="Verified purchase"
              onToggle={onToggleVerified}
            />
          </div>
        </div>

        <div className="relative flex flex-wrap items-center gap-3 lg:justify-end">
          <span className="buudy-display text-xl text-[var(--plum)]">Sort by</span>
          <button
            aria-controls="buudy-review-sort-menu"
            aria-expanded={openMenu === "sort"}
            className={dropdownButtonClass}
            disabled={disabled}
            onClick={() => setOpenMenu(openMenu === "sort" ? null : "sort")}
            type="button"
          >
            <span>{reviewSortLabels[filters.sort]}</span>
            <ChevronDown
              aria-hidden="true"
              className={cn("transition", openMenu === "sort" && "rotate-180")}
              size={17}
            />
          </button>
          {openMenu === "sort" ? (
            <div
              className={cn(menuClass, "right-auto lg:right-0")}
              id="buudy-review-sort-menu"
              role="menu"
            >
              {reviewSortOptions.map((option) => {
                const isActive = filters.sort === option.value;

                return (
                  <button
                    aria-checked={isActive}
                    className={menuItemClass}
                    key={option.value}
                    onClick={() => {
                      onSortChange(option.value);
                      setOpenMenu(null);
                    }}
                    role="menuitemradio"
                    type="button"
                  >
                    <span>{option.label}</span>
                    {isActive ? <Check aria-hidden="true" size={16} /> : null}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ReviewImages({ images, name }: { images: string[]; name: string }) {
  if (!images.length) {
    return null;
  }

  const visibleImages = images.slice(0, 3);

  if (visibleImages.length === 1) {
    return (
      <div className="mb-5 overflow-hidden rounded-[16px] border border-[rgba(58,31,61,.12)]">
        <Image
          alt={`Review photo from ${name}`}
          className="block h-auto w-full"
          height={0}
          loading="lazy"
          sizes="(min-width: 1024px) 280px, (min-width: 768px) 45vw, 92vw"
          src={visibleImages[0]}
          width={0}
        />
      </div>
    );
  }

  return (
    <div className="mb-5 grid grid-cols-2 overflow-hidden rounded-[16px] border border-[rgba(58,31,61,.12)]">
      {visibleImages.map((image, index) => (
        <div
          className={cn(
            "relative aspect-[4/3] overflow-hidden",
            visibleImages.length === 3 && index === 0 && "row-span-2 aspect-auto",
          )}
          key={`${image}-${index}`}
        >
          <Image
            alt={`Review photo from ${name}`}
            className="object-cover"
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 280px, (min-width: 768px) 45vw, 92vw"
            src={image}
          />
          {index === 2 && images.length > 3 ? (
            <span className="absolute inset-0 grid place-items-center bg-[rgba(30,12,31,.56)] text-sm font-semibold text-[var(--cream)]">
              +{images.length - 3}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ReviewCard({
  onOpen,
  onPrefetch,
  review,
}: {
  onOpen: (review: ProductReview) => void | Promise<void>;
  onPrefetch: (review: ProductReview) => void;
  review: AnimatableProductReview;
}) {
  return (
    <button
      aria-label={`Open full review from ${review.customerName}`}
      className={cn(
        "w-full min-w-0 rounded-[18px] border border-[rgba(58,31,61,.14)] bg-[var(--card)] p-5 text-left shadow-[0_18px_44px_-34px_rgba(58,31,61,.45)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(180,145,76,.5)] hover:shadow-[0_24px_48px_-32px_rgba(58,31,61,.58)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)]",
        review.isNew && "animate-fade-in-up",
      )}
      onClick={() => void onOpen(review)}
      onFocus={() => onPrefetch(review)}
      onPointerDown={() => onPrefetch(review)}
      onPointerEnter={() => onPrefetch(review)}
      style={
        review.isNew && review.staggerIndex !== undefined
          ? { animationDelay: `${review.staggerIndex * 75}ms`, animationFillMode: "both" }
          : undefined
      }
      type="button"
    >
      <ReviewImages images={review.images} name={review.customerName} />
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        <RatingStars rating={review.rating} />
        <span className="buudy-mono whitespace-nowrap text-[0.65rem] text-[var(--plum-soft)]">
          {review.displayDate || review.date}
        </span>
      </div>

      {review.title ? (
        <h3 className="buudy-display mt-4 text-[1.3rem] sm:text-xl leading-snug text-[var(--plum)]">
          {review.title}
        </h3>
      ) : null}

      <p className="mt-3 text-sm leading-7 text-[var(--muted)] line-clamp-4">{review.body}</p>

      <div className="mt-6 flex items-center justify-between gap-1.5 sm:gap-2 border-t border-[rgba(58,31,61,.12)] pt-4">
        <span className="buudy-display min-w-0 text-sm text-[var(--plum)] whitespace-nowrap overflow-hidden text-ellipsis">
          <span className="sm:hidden">
            {(() => {
              const parts = review.customerName.trim().split(" ");
              return parts.length > 1 
                ? `${parts[0]} ${parts[parts.length - 1][0]}.` 
                : parts[0];
            })()}
          </span>
          <span className="hidden sm:inline">{review.customerName}</span>
        </span>
        <span className="inline-flex flex-none items-center gap-1 rounded-full bg-[rgba(180,145,76,.12)] px-1.5 py-1 sm:px-2 text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-[var(--plum-soft)]">
          <BadgeCheck aria-hidden="true" size={12} />
          <span className="hidden sm:inline">Verified</span>
        </span>
      </div>
    </button>
  );
}

function ReviewModal({
  onClose,
  review,
}: {
  onClose: () => void;
  review: ProductReview;
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const activeImage = review.images[imageIndex];
  const hasMultipleImages = review.images.length > 1;

  const goNextImage = useCallback(() => {
    setImageIndex((current) => (current + 1) % review.images.length);
  }, [review.images.length]);

  const goPreviousImage = useCallback(() => {
    setImageIndex((current) => (current - 1 + review.images.length) % review.images.length);
  }, [review.images.length]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (hasMultipleImages && event.key === "ArrowRight") {
        goNextImage();
      }

      if (hasMultipleImages && event.key === "ArrowLeft") {
        goPreviousImage();
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLButtonElement>("button:not([disabled])"),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElementRef.current?.focus();
    };
  }, [goNextImage, goPreviousImage, hasMultipleImages, onClose]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100000100] grid place-items-center bg-[rgba(30,12,31,.62)] p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        aria-label={`Full review from ${review.customerName}`}
        aria-modal="true"
        className={cn(
          "relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-[22px] border border-[rgba(180,145,76,.35)] bg-[var(--card)] shadow-[0_28px_90px_-34px_rgba(15,4,16,.82)]",
          activeImage && "max-w-[calc(100vw-2rem)] lg:w-fit lg:max-w-[calc(100vw-3rem)] lg:flex-row",
        )}
        ref={dialogRef}
        role="dialog"
      >
        <button
          aria-label="Close full review"
          className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-[rgba(58,31,61,.16)] bg-[rgba(247,241,232,.94)] text-[var(--plum)] transition hover:scale-105 hover:bg-[var(--cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <X aria-hidden="true" size={22} />
        </button>

        {activeImage ? (
          <div className="relative flex w-fit max-w-full flex-none self-center items-center justify-center overflow-hidden bg-[var(--card)] p-3 lg:p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={`Full-size review photo from ${review.customerName}`}
              className="block h-auto max-h-[42vh] w-auto max-w-full rounded-[18px] border border-[rgba(58,31,61,.14)] object-contain shadow-[0_18px_42px_-30px_rgba(58,31,61,.6)] lg:max-h-[calc(90vh-2rem)] lg:max-w-[58vw]"
              decoding="async"
              loading="eager"
              src={activeImage}
            />
            {hasMultipleImages ? (
              <>
                <button
                  aria-label="Previous review image"
                  className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[rgba(247,241,232,.9)] text-[var(--plum)] shadow transition hover:scale-105"
                  onClick={goPreviousImage}
                  type="button"
                >
                  <ChevronLeft aria-hidden="true" size={22} />
                </button>
                <button
                  aria-label="Next review image"
                  className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-[rgba(247,241,232,.9)] text-[var(--plum)] shadow transition hover:scale-105"
                  onClick={goNextImage}
                  type="button"
                >
                  <ChevronRight aria-hidden="true" size={22} />
                </button>
              </>
            ) : null}
          </div>
        ) : null}

        <div className="w-full overflow-y-auto px-6 pb-7 pt-20 sm:px-8 lg:w-[min(34vw,28rem)] lg:flex-none lg:px-9">
          <p className="buudy-mono text-[var(--gold)]">Verified customer review</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <RatingStars rating={review.rating} size={20} />
            <span className="buudy-mono text-[var(--plum-soft)]">
              {review.displayDate || review.date}
            </span>
          </div>
          {review.title ? (
            <h3 className="buudy-display mt-6 text-3xl leading-tight text-[var(--plum)]">
              {review.title}
            </h3>
          ) : null}
          <p className="mt-5 whitespace-pre-wrap text-base leading-8 text-[var(--muted)]">
            {review.body}
          </p>
          <div className="mt-8 flex items-center gap-2 border-t border-[rgba(58,31,61,.12)] pt-5 text-[var(--plum)]">
            <BadgeCheck aria-hidden="true" className="text-[var(--gold)]" size={18} />
            <span className="buudy-display text-lg">{review.customerName}</span>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

type ReviewFormState = {
  botcheck: string;
  body: string;
  customerEmail: string;
  customerName: string;
  rating: number;
  title: string;
};

const emptyReviewForm: ReviewFormState = {
  body: "",
  botcheck: "",
  customerEmail: "",
  customerName: "",
  rating: 5,
  title: "",
};

function WriteReviewModal({
  onClose,
  onSubmitted,
  productHandle,
}: {
  onClose: () => void;
  onSubmitted: (review: ProductReview) => Promise<void> | void;
  productHandle: string;
}) {
  const [form, setForm] = useState<ReviewFormState>(emptyReviewForm);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            "button:not([disabled]), input:not([disabled]), textarea:not([disabled])",
          ),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElementRef.current?.focus();
    };
  }, [onClose]);

  function updateField<Key extends keyof ReviewFormState>(
    key: Key,
    value: ReviewFormState[Key],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? []).slice(0, 5);
    setFiles(selectedFiles);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData();
    formData.set("body", form.body);
    formData.set("botcheck", form.botcheck);
    formData.set("customerEmail", form.customerEmail);
    formData.set("customerName", form.customerName);
    formData.set("rating", String(form.rating));
    formData.set("title", form.title);
    files.forEach((file) => formData.append("images", file));

    try {
      const response = await fetch(`/api/reviews/${encodeURIComponent(productHandle)}`, {
        body: formData,
        headers: {
          Accept: "application/json",
        },
        method: "POST",
      });
      const data = (await response.json().catch(() => null)) as
        | ProductReviewSubmissionResponse
        | { message?: string }
        | null;

      if (!response.ok || !data || !("review" in data)) {
        throw new Error(
          data && "message" in data && data.message
            ? data.message
            : "We could not publish your review right now.",
        );
      }

      await onSubmitted(data.review);
      setIsPublished(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We could not publish your review right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100000100] grid place-items-center bg-[rgba(30,12,31,.62)] p-4 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        aria-label="Write a product review"
        aria-modal="true"
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[24px] border border-[rgba(180,145,76,.34)] bg-[var(--card)] p-5 shadow-[0_28px_90px_-34px_rgba(15,4,16,.82)] sm:p-8"
        ref={dialogRef}
        role="dialog"
      >
        <button
          aria-label="Close review form"
          className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-[rgba(58,31,61,.16)] bg-[rgba(247,241,232,.94)] text-[var(--plum)] transition hover:scale-105 hover:bg-[var(--cream)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <X aria-hidden="true" size={22} />
        </button>

        {isPublished ? (
          <div className="grid min-h-[24rem] place-items-center text-center">
            <div>
              <p className="buudy-mono text-[var(--gold)]">Review published</p>
              <h3 className="buudy-display mt-4 text-4xl text-[var(--plum)]">
                Thank you for sharing your glow.
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
                Your review is live in the Buudy archive now.
              </p>
              <Button className="mt-7" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="max-w-2xl">
              <p className="buudy-mono text-[var(--gold)]">Customer review</p>
              <h3 className="buudy-display mt-3 text-4xl leading-tight text-[var(--plum)]">
                Write a review and rate product
              </h3>
            </div>

            <input
              aria-hidden="true"
              autoComplete="off"
              className="hidden"
              name="botcheck"
              onChange={(event) => updateField("botcheck", event.target.value)}
              tabIndex={-1}
              value={form.botcheck}
            />

            <div>
              <label className="buudy-mono mb-3 block text-[var(--plum-soft)]">
                Your rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    aria-label={`${rating} out of 5 stars`}
                    aria-pressed={form.rating === rating}
                    className="grid h-11 w-11 place-items-center rounded-full border border-[rgba(180,145,76,.32)] bg-[rgba(255,252,245,.84)] text-[var(--gold)] transition hover:-translate-y-0.5 hover:border-[var(--gold)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
                    key={rating}
                    onClick={() => updateField("rating", rating)}
                    type="button"
                  >
                    <Star
                      aria-hidden="true"
                      fill={rating <= form.rating ? "currentColor" : "none"}
                      size={22}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="buudy-mono mb-2 flex justify-between text-[var(--plum-soft)]">
                  Title of review
                  <span>{form.title.length}/70</span>
                </span>
                <input
                  className="w-full rounded-[14px] border border-[rgba(58,31,61,.16)] bg-[rgba(255,252,245,.78)] px-4 py-3 text-[var(--plum)] outline-none transition focus:border-[var(--gold)]"
                  maxLength={70}
                  onChange={(event) => updateField("title", event.target.value)}
                  placeholder="Title Review"
                  required
                  value={form.title}
                />
              </label>
              <label className="block">
                <span className="buudy-mono mb-2 flex justify-between text-[var(--plum-soft)]">
                  Your name
                  <span>{form.customerName.length}/50</span>
                </span>
                <input
                  className="w-full rounded-[14px] border border-[rgba(58,31,61,.16)] bg-[rgba(255,252,245,.78)] px-4 py-3 text-[var(--plum)] outline-none transition focus:border-[var(--gold)]"
                  maxLength={50}
                  onChange={(event) => updateField("customerName", event.target.value)}
                  placeholder="Your name"
                  required
                  value={form.customerName}
                />
              </label>
            </div>

            <label className="block">
              <span className="buudy-mono mb-2 flex justify-between text-[var(--plum-soft)]">
                Content
                <span>{form.body.length}/1000</span>
              </span>
              <textarea
                className="min-h-32 w-full resize-y rounded-[14px] border border-[rgba(58,31,61,.16)] bg-[rgba(255,252,245,.78)] px-4 py-3 text-[var(--plum)] outline-none transition focus:border-[var(--gold)]"
                maxLength={1000}
                onChange={(event) => updateField("body", event.target.value)}
                placeholder="Ex: Best products"
                required
                value={form.body}
              />
            </label>

            <label className="block rounded-[18px] border border-dashed border-[rgba(58,31,61,.22)] bg-[rgba(255,252,245,.52)] p-5">
              <span className="flex flex-wrap items-center gap-3 text-[var(--plum)]">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[rgba(180,145,76,.12)] text-[var(--gold)]">
                  <UploadCloud aria-hidden="true" size={22} />
                </span>
                <span>
                  <span className="block font-semibold">Upload up to 5 images</span>
                  <span className="text-sm text-[var(--muted)]">
                    JPG, PNG, WebP, or GIF. 5MB per image.
                  </span>
                </span>
              </span>
              <input
                accept="image/gif,image/jpeg,image/png,image/webp"
                className="mt-4 w-full text-sm text-[var(--muted)] file:mr-4 file:rounded-full file:border-0 file:bg-[var(--plum)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[var(--cream)]"
                multiple
                onChange={handleFileChange}
                type="file"
              />
              {files.length ? (
                <p className="mt-3 text-sm text-[var(--muted)]">
                  {files.length} image{files.length === 1 ? "" : "s"} selected
                </p>
              ) : null}
            </label>

            <label className="block">
              <span className="buudy-mono mb-2 block text-[var(--plum-soft)]">
                Your email
              </span>
              <input
                className="w-full rounded-[14px] border border-[rgba(58,31,61,.16)] bg-[rgba(255,252,245,.78)] px-4 py-3 text-[var(--plum)] outline-none transition focus:border-[var(--gold)]"
                onChange={(event) => updateField("customerEmail", event.target.value)}
                placeholder="Your email"
                required
                type="email"
                value={form.customerEmail}
              />
              <span className="mt-2 block text-xs text-[var(--muted)]">
                Your email is stored privately for verification and is never shown publicly.
              </span>
            </label>

            {error ? (
              <p className="rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
                {error}
              </p>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                className="rounded-full border border-[rgba(58,31,61,.22)] px-6 py-3 font-semibold text-[var(--plum)] transition hover:bg-[rgba(58,31,61,.06)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]"
                disabled={isSubmitting}
                onClick={onClose}
                type="button"
              >
                Cancel
              </button>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? (
                  <>
                    <LoaderCircle aria-hidden="true" className="animate-spin" size={18} />
                    Publishing
                  </>
                ) : (
                  <>
                    <Send aria-hidden="true" size={18} />
                    Submit review
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  );
}

export function ProductReviewsGrid({
  averageRating,
  productHandle,
  initialReviews,
  pageSize,
  ratingDistribution,
  total,
}: ProductReviewsGridProps) {
  const [reviews, setReviews] = useState<AnimatableProductReview[]>(initialReviews);
  const [activeRating, setActiveRating] = useState<number | null>(null);
  const [reviewSort, setReviewSort] = useState<ProductReviewSortOption>(
    defaultReviewFilters.sort,
  );
  const [verifiedOnly, setVerifiedOnly] = useState(defaultReviewFilters.verifiedOnly);
  const [withPhotos, setWithPhotos] = useState(defaultReviewFilters.withPhotos);
  const [openMenu, setOpenMenu] = useState<OpenFilterMenu>(null);
  const [currentTotal, setCurrentTotal] = useState(total);
  const [summaryTotal, setSummaryTotal] = useState(total);
  const [currentAverageRating, setCurrentAverageRating] = useState(averageRating);
  const [currentRatingDistribution, setCurrentRatingDistribution] = useState(ratingDistribution);
  const [columnCount, setColumnCount] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedReview, setSelectedReview] = useState<ProductReview | null>(null);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const requestIdRef = useRef(0);
  const closeSelectedReview = useCallback(() => setSelectedReview(null), []);
  const openSelectedReview = useCallback(async (review: ProductReview) => {
    if (review.images[0]) {
      await preloadReviewImage(review.images[0]);
    }

    setSelectedReview(review);
    void preloadReviewImages(review.images.slice(1));
  }, []);
  const prefetchReviewImages = useCallback((review: ProductReview) => {
    void preloadReviewImages(review.images);
  }, []);
  const closeWriteReview = useCallback(() => setIsWriteReviewOpen(false), []);

  const applyReviewResponse = useCallback(
    (data: ProductReviewsResponse, mode: "append" | "replace") => {
      const mappedReviews = data.reviews.map((review, index) => ({
        ...review,
        isNew: mode === "replace" || data.nextOffset > pageSize,
        staggerIndex: index,
      }));

      setReviews((currentReviews) =>
        mode === "append" ? [...currentReviews, ...mappedReviews] : mappedReviews,
      );
      setCurrentTotal(data.total);

      if (typeof data.summaryTotal === "number") {
        setSummaryTotal(data.summaryTotal);
      }

      if (typeof data.averageRating === "number") {
        setCurrentAverageRating(data.averageRating);
      }

      if (data.ratingDistribution) {
        setCurrentRatingDistribution(data.ratingDistribution);
      }
    },
    [pageSize],
  );

  const activeFilters = useMemo(
    () => ({
      rating: activeRating,
      sort: reviewSort,
      verifiedOnly,
      withPhotos,
    }),
    [activeRating, reviewSort, verifiedOnly, withPhotos],
  );
  const visibleCount = reviews.length;
  const hasMore = visibleCount < currentTotal;
  const progressLabel = useMemo(
    () =>
      `${visibleCount.toLocaleString(market.locale)} of ${currentTotal.toLocaleString(market.locale)}`,
    [currentTotal, visibleCount],
  );
  const activeFilterSummary = useMemo(() => {
    const labels: string[] = [];

    if (activeRating) {
      labels.push(`${activeRating}-star`);
    }

    if (withPhotos) {
      labels.push("with photos");
    }

    if (verifiedOnly) {
      labels.push("verified purchase");
    }

    if (reviewSort !== defaultReviewFilters.sort) {
      labels.push(reviewSortLabels[reviewSort].toLowerCase());
    }

    return labels;
  }, [activeRating, reviewSort, verifiedOnly, withPhotos]);
  const reviewColumns = useMemo(() => {
    const columns = Array.from({ length: columnCount }, () => [] as AnimatableProductReview[]);

    reviews.forEach((review, index) => {
      columns[index % columnCount].push(review);
    });

    return columns;
  }, [columnCount, reviews]);

  useEffect(() => {
    const updateColumnCount = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        setColumnCount(4);
      } else {
        setColumnCount(2);
      }
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);

    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  useEffect(() => {
    if (!openMenu) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (toolbarRef.current?.contains(event.target as Node)) {
        return;
      }

      setOpenMenu(null);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenu]);

  const fetchReviews = useCallback(async (filters: ReviewFilters, offset: number) => {
    const params = new URLSearchParams({
      limit: String(pageSize),
      offset: String(offset),
      sort: filters.sort,
    });

    if (filters.rating !== null) {
      params.set("rating", String(filters.rating));
    }

    if (filters.withPhotos) {
      params.set("withPhotos", "true");
    }

    if (filters.verifiedOnly) {
      params.set("verified", "true");
    }

    const response = await fetch(
      `/api/reviews/${encodeURIComponent(productHandle)}?${params.toString()}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Review request failed");
    }

    return (await response.json()) as ProductReviewsResponse;
  }, [pageSize, productHandle]);

  useEffect(() => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    fetchReviews(defaultReviewFilters, 0)
      .then((data) => {
        if (requestId === requestIdRef.current) {
          applyReviewResponse(data, "replace");
        }
      })
      .catch(() => undefined);
  }, [applyReviewResponse, fetchReviews]);

  const handleReviewSubmitted = useCallback(
    async (review: ProductReview) => {
      setActiveRating(null);
      setReviewSort(defaultReviewFilters.sort);
      setVerifiedOnly(defaultReviewFilters.verifiedOnly);
      setWithPhotos(defaultReviewFilters.withPhotos);
      setOpenMenu(null);
      setError("");
      setReviews((currentReviews) => [
        {
          ...review,
          isNew: true,
          staggerIndex: 0,
        },
        ...currentReviews.filter((currentReview) => currentReview.id !== review.id),
      ]);
      setCurrentTotal((current) => current + 1);
      setSummaryTotal((current) => current + 1);

      try {
        const data = await fetchReviews(defaultReviewFilters, 0);
        applyReviewResponse(data, "replace");
      } catch {
        setError("Your review is live, but we could not refresh the full archive yet.");
      }
    },
    [applyReviewResponse, fetchReviews],
  );

  async function applyFilters(nextFilters: ReviewFilters) {
    if (isLoading || areReviewFiltersEqual(activeFilters, nextFilters)) {
      return;
    }

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setActiveRating(nextFilters.rating);
    setReviewSort(nextFilters.sort);
    setVerifiedOnly(nextFilters.verifiedOnly);
    setWithPhotos(nextFilters.withPhotos);
    setIsLoading(true);
    setError("");

    try {
      const data = await fetchReviews(nextFilters, 0);

      if (requestId !== requestIdRef.current) {
        return;
      }

      applyReviewResponse(data, "replace");
    } catch {
      setError("We could not filter reviews right now. Please try again.");
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }

  function selectRating(rating: number | null) {
    void applyFilters({
      ...activeFilters,
      rating,
    });
  }

  function selectSort(sort: ProductReviewSortOption) {
    void applyFilters({
      ...activeFilters,
      sort,
    });
  }

  function togglePhotos() {
    void applyFilters({
      ...activeFilters,
      withPhotos: !withPhotos,
    });
  }

  function toggleVerified() {
    void applyFilters({
      ...activeFilters,
      verifiedOnly: !verifiedOnly,
    });
  }

  async function loadMoreReviews() {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await fetchReviews(activeFilters, reviews.length);
      applyReviewResponse(data, "append");
    } catch {
      setError("We could not load more reviews right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:items-end">
        <div>
          <SectionHeading
            eyebrow="Product reviews"
            title={
              productHandle === "buudy-red-torch" ? (
                <>
                  Buudy Red Torch <em className="buudy-italic">reviews</em>.
                </>
              ) : (
                <>
                  Buudy Mask <em className="buudy-italic">customer reviews</em>.
                </>
              )
            }
            copy={
              productHandle === "buudy-red-torch"
                ? "Real feedback from customers who made the Buudy Red Torch part of their daily wellness ritual."
                : "Real feedback from customers who made Buudy part of their at-home skincare ritual."
            }
          />
          <Button className="mt-7" onClick={() => setIsWriteReviewOpen(true)}>
            <PencilLine aria-hidden="true" size={18} />
            Write a review
          </Button>
        </div>

        <div className="rounded-[22px] border border-[rgba(58,31,61,.14)] bg-[rgba(255,252,245,.72)] p-6 shadow-[0_20px_52px_-42px_rgba(58,31,61,.55)]">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="buudy-mono text-[var(--gold)]">Average rating</p>
              <p className="buudy-display mt-2 text-6xl leading-none text-[var(--plum)]">
                {currentAverageRating.toFixed(1)}
              </p>
            </div>
            <div className="text-right">
              <p className="buudy-mono text-[var(--plum-soft)]">Verified archive</p>
              <p className="mt-2 text-2xl font-semibold text-[var(--plum)]">
                {summaryTotal.toLocaleString(market.locale)} reviews
              </p>
            </div>
          </div>
          <RatingBreakdown
            activeRating={activeRating}
            disabled={isLoading}
            distribution={currentRatingDistribution}
            onSelect={selectRating}
            total={summaryTotal}
          />
        </div>
      </div>

      <ReviewFiltersToolbar
        disabled={isLoading}
        filters={activeFilters}
        onRatingChange={selectRating}
        onSortChange={selectSort}
        onTogglePhotos={togglePhotos}
        onToggleVerified={toggleVerified}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        toolbarRef={toolbarRef}
      />

      {reviews.length ? (
        <div aria-busy={isLoading} className="grid min-w-0 grid-cols-2 items-start gap-5 lg:grid-cols-4">
          {reviewColumns.map((column, index) => (
            <div className="grid min-w-0 gap-5" key={`review-column-${index}`}>
              {column.map((review) => (
                <ReviewCard
                  key={review.id}
                  onOpen={openSelectedReview}
                  onPrefetch={prefetchReviewImages}
                  review={review}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div
          aria-busy={isLoading}
          className="rounded-[22px] border border-[rgba(58,31,61,.12)] bg-[rgba(255,252,245,.68)] px-6 py-12 text-center shadow-[0_18px_46px_-38px_rgba(58,31,61,.55)]"
        >
          <p className="buudy-display text-2xl text-[var(--plum)]">
            {isLoading ? "Finding matching reviews..." : "No reviews match these filters yet."}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[var(--muted)]">
            Try clearing one filter or choosing a different star rating to keep browsing the
            archive.
          </p>
        </div>
      )}

      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        <p className="buudy-mono text-[var(--plum-soft)]">
          Showing {progressLabel} reviews
          {activeFilterSummary.length ? ` matching ${activeFilterSummary.join(", ")}` : ""}
        </p>
        {error ? <p className="text-sm text-red-900">{error}</p> : null}
        {hasMore ? (
          <Button
            aria-label="Load 20 more Buudy LED Mask reviews"
            className="min-w-48"
            disabled={isLoading}
            onClick={loadMoreReviews}
          >
            {isLoading ? (
              <>
                <LoaderCircle aria-hidden="true" className="animate-spin" size={18} />
                Loading
              </>
            ) : (
              "Load more"
            )}
          </Button>
        ) : (
          <p className="text-sm text-[var(--muted)]">
            You have reached the end of the review archive.
          </p>
        )}
      </div>

      {selectedReview ? (
        <ReviewModal onClose={closeSelectedReview} review={selectedReview} />
      ) : null}
      {isWriteReviewOpen ? (
        <WriteReviewModal
          onClose={closeWriteReview}
          onSubmitted={handleReviewSubmitted}
          productHandle={productHandle}
        />
      ) : null}
    </div>
  );
}
