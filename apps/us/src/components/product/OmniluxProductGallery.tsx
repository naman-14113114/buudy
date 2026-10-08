"use client";

import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
} from "lucide-react";
import type { ProductImage } from "@/lib/media";
interface BeforeAfterPill {
  text: string;
  bg: string;
  textColor: string;
  borderColor?: string;
}

interface BeforeAfterItem {
  src: string;
  alt: string;
  concern: string;
  pills: [BeforeAfterPill, BeforeAfterPill, BeforeAfterPill];
}

// 7 Dedicated SEO/GEO Before & After Transformation Images for Gallery with 3 Bottom Oval Pills
const GALLERY_BEFORE_AFTER_ITEMS: BeforeAfterItem[] = [
  {
    src: "/images/products/buudy-led-mask/buudy-7-colour-led-mask-before-after-dark-spots-pigmentation-uk.webp",
    alt: "Buudy 7 Colour LED Face Mask before and after results: fades dark spots and sun-induced hyperpigmentation UK",
    concern: "Fades Dark Spots & Pigmentation",
    pills: [
      { text: "4-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Green 7-min", bg: "#16A34A", textColor: "#FFFFFF" },
      { text: "Red 3-min", bg: "#DC2626", textColor: "#FFFFFF" },
    ],
  },
  {
    src: "/images/products/buudy-led-mask/buudy-7-colour-led-mask-before-after-acne-breakouts-complexion-uk.webp",
    alt: "Buudy 7 Colour LED Mask before and after clinical results: clears active acne breakouts and calms inflamed complexion UK",
    concern: "Clears Acne & Blemishes",
    pills: [
      { text: "2-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Blue 7-min", bg: "#2563EB", textColor: "#FFFFFF" },
      { text: "Yellow 3-min", bg: "#EAB308", textColor: "#1C1917" },
    ],
  },
  {
    src: "/images/products/buudy-led-mask/buudy-7-colour-led-mask-before-after-blemish-clarity-radiance-uk.webp",
    alt: "Buudy 7 Colour LED Face Mask before and after transformation: clears post-acne marks and enhances skin radiance UK",
    concern: "Improves Skin Texture & Radiance",
    pills: [
      { text: "3-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Purple 3-min", bg: "#9333EA", textColor: "#FFFFFF" },
      { text: "Blue 7-min", bg: "#2563EB", textColor: "#FFFFFF" },
    ],
  },
  {
    src: "/images/products/buudy-led-mask/buudy-7-colour-led-mask-before-after-anti-ageing-eye-wrinkles-uk.webp",
    alt: "Buudy 7 Colour LED Mask before and after anti-ageing results: visibly reduces crow's feet and eye-area fine lines UK",
    concern: "Smooths Fine Lines & Wrinkles",
    pills: [
      { text: "4-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Red 6-min", bg: "#DC2626", textColor: "#FFFFFF" },
      { text: "White 4-min", bg: "#FFFFFF", textColor: "#1C1917", borderColor: "rgba(0, 0, 0, 0.18)" },
    ],
  },
  {
    src: "/images/products/buudy-led-mask/buudy-7-colour-led-mask-before-after-cystic-acne-jawline-uk.webp",
    alt: "Buudy 7 Colour LED Mask before and after results: eliminates persistent cystic acne and smooths lower cheek and jawline UK",
    concern: "Targets Cystic Acne & Breakouts",
    pills: [
      { text: "3-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Blue 6-min", bg: "#2563EB", textColor: "#FFFFFF" },
      { text: "Purple 4-min", bg: "#9333EA", textColor: "#FFFFFF" },
    ],
  },
  {
    src: "/images/products/buudy-led-mask/buudy-7-colour-led-mask-before-after-calms-redness-rosacea-uk.webp",
    alt: "Buudy 7 Colour LED Face Mask before and after: calms facial redness, sensitivity and rosacea flush UK",
    concern: "Calms Redness & Rosacea",
    pills: [
      { text: "2-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Cyan 7-min", bg: "#0891B2", textColor: "#FFFFFF" },
      { text: "Yellow 3-min", bg: "#EAB308", textColor: "#1C1917" },
    ],
  },
  {
    src: "/images/products/buudy-led-mask/buudy-7-colour-led-mask-before-after-evens-skin-tone-smoothing-uk.webp",
    alt: "Buudy 7 Colour LED Mask before and after clinical comparison: evens mottled skin tone and smooths fine texture UK",
    concern: "Evens Skin Tone & Smoothing",
    pills: [
      { text: "4-Weeks", bg: "#F7F1E8", textColor: "#2E102F", borderColor: "rgba(58, 31, 61, 0.18)" },
      { text: "Green 6-min", bg: "#16A34A", textColor: "#FFFFFF" },
      { text: "Yellow 4-min", bg: "#EAB308", textColor: "#1C1917" },
    ],
  },
];

// Video playing on product page just above footer (GuaranteeSection)
const PRODUCT_FOOTER_VIDEO_SRC = "/media/products/buudy-led-mask/videos/buudy-goddess-bg.mp4";
const HOW_TO_USE_VIDEO_SRC = "/media/products/buudy-led-mask/videos/buudy-7-colour-led-mask-how-to-use-guide-uk.mp4";

type MediaItem =
  | {
      type: "gallery";
      src: string;
      alt: string;
      badge?: ProductImage["badge"];
    }
  | {
      type: "before-after";
      src: string;
      alt: string;
      concern: string;
      pills?: [BeforeAfterPill, BeforeAfterPill, BeforeAfterPill];
    }
  | {
      type: "video";
      src: string;
      alt: string;
    };

export function OmniluxProductGallery({
  images,
  hasGifts = true,
}: {
  images: ProductImage[];
  hasGifts?: boolean;
}) {
  // Build unified continuous array: Gallery + 7 Before & After + 2 Videos in sequence
  const allMediaItems: MediaItem[] = useMemo(() => {
    const galleryItems: MediaItem[] = images
      .filter((img) => !img.pills)
      .map((img) => ({
        type: "gallery",
        src: img.src,
        alt: img.alt,
        badge: img.badge,
      }));

    const beforeAfterItems: MediaItem[] = GALLERY_BEFORE_AFTER_ITEMS.map((item) => ({
      type: "before-after",
      src: item.src,
      alt: item.alt,
      concern: item.concern,
      pills: item.pills,
    }));

    const videoItems: MediaItem[] = [
      {
        type: "video",
        src: PRODUCT_FOOTER_VIDEO_SRC,
        alt: "Buudy LED Mask Product Video",
      },
      {
        type: "video",
        src: HOW_TO_USE_VIDEO_SRC,
        alt: "Buudy 7 Colour LED Face Mask how to use guide and 4-step daily ritual video UK",
      },
    ];

    return [...galleryItems, ...beforeAfterItems, ...videoItems];
  }, [images]);

  const nonPillImagesCount = useMemo(
    () => images.filter((img) => !img.pills).length,
    [images],
  );

  const galleryStartIndex = 0;
  const beforeAfterStartIndex = nonPillImagesCount;
  const videoStartIndex = nonPillImagesCount + GALLERY_BEFORE_AFTER_ITEMS.length;

  // Current global media index. By default always starts on first gallery image (0)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoverSide, setHoverSide] = useState<"left" | "right">("right");

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const thumbsTrackRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // Derive active tab from currentIndex in the continuous line
  const activeTab = useMemo(() => {
    if (currentIndex >= videoStartIndex) return "video";
    if (currentIndex >= beforeAfterStartIndex) return "before-after";
    return "gallery";
  }, [currentIndex, beforeAfterStartIndex, videoStartIndex]);

  // Tab click jumps directly to the start of that section
  const handleTabClick = (tab: "gallery" | "before-after" | "video") => {
    if (tab === "gallery") setCurrentIndex(galleryStartIndex);
    else if (tab === "before-after") setCurrentIndex(beforeAfterStartIndex);
    else if (tab === "video") setCurrentIndex(videoStartIndex);
  };

  // Continuous linear navigation across all items (Gallery -> Before & After -> Video)
  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % allMediaItems.length);
  }, [allMediaItems.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + allMediaItems.length) % allMediaItems.length);
  }, [allMediaItems.length]);

  // Handle mouse move on main stage to toggle < or > cursor depending on side from center
  const handleStageMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    if (mouseX < rect.width / 2) {
      setHoverSide("left");
    } else {
      setHoverSide("right");
    }
  }, []);

  // Handle click on main stage: left side goes backward (<), right side goes forward (>)
  const handleStageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    if (mouseX < rect.width / 2) {
      goPrev();
    } else {
      goNext();
    }
  }, [goNext, goPrev]);

  // Dynamic Thumbnail Centering Scroll (1:1 from Miroooo): centers active thumbnail vertically on desktop & horizontally on mobile
  useEffect(() => {
    const track = thumbsTrackRef.current;
    if (!track) return;
    const activeThumb = track.children[currentIndex] as HTMLElement | undefined;
    if (activeThumb) {
      // Vertical scroll position (Desktop left column)
      const thumbRelativeTop = activeThumb.offsetTop - track.offsetTop;
      const verticalScrollPos =
        thumbRelativeTop - (track.clientHeight - activeThumb.offsetHeight) / 2;

      // Horizontal scroll position (Mobile bottom row)
      const thumbRelativeLeft = activeThumb.offsetLeft - track.offsetLeft;
      const horizontalScrollPos =
        thumbRelativeLeft - (track.clientWidth - activeThumb.offsetWidth) / 2;

      track.scrollTo({
        top: verticalScrollPos,
        left: horizontalScrollPos,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  // Autoplay video when navigating to video item, pause when leaving
  useEffect(() => {
    const currentItem = allMediaItems[currentIndex];
    if (currentItem?.type === "video") {
      videoPlayerRef.current?.play().then(() => setIsVideoPlaying(true)).catch(() => {});
    } else {
      setIsVideoPlaying(false);
      videoPlayerRef.current?.pause();
    }
  }, [currentIndex, allMediaItems]);

  const toggleVideoPlay = useCallback(() => {
    const video = videoPlayerRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsVideoPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  }, []);

  const toggleVideoMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoPlayerRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsVideoMuted(video.muted);
  }, []);

  // Lightbox opening (for both images and video)
  const openLightbox = useCallback(() => {
    setIsLightboxOpen(true);
  }, []);

  // Lightbox keyboard & scroll lock
  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") setIsLightboxOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElementRef.current?.focus();
    };
  }, [goNext, goPrev, isLightboxOpen]);

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 45;
    if (touchEndX < touchStartXRef.current - swipeThreshold) {
      goNext();
    } else if (touchEndX > touchStartXRef.current + swipeThreshold) {
      goPrev();
    }
  };

  const currentItem = allMediaItems[currentIndex] || allMediaItems[0];

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* --- OMNILUX + MIROOOO STYLE GALLERY CSS (FULLY RESPONSIVE & FLUID) --- */
        .omni-gallery-container {
          width: 100%;
          max-width: 100%;
          margin: 0 auto;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          align-items: stretch;
          gap: clamp(8px, 1.2vw, 16px);
          position: relative;
          z-index: 1;
        }

        /* LEFT VERTICAL THUMBNAIL TRACK WITH MIROOOO ARROW NAVIGATION */
        .omni-thumbs-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          width: clamp(56px, 5.2vw, 76px);
          align-self: stretch;
          flex-shrink: 0;
          min-height: 0;
          position: relative;
          box-sizing: border-box;
        }
        .omni-thumb-arrow {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #292524;
          cursor: pointer;
          flex-shrink: 0;
          transition: background-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
          z-index: 2;
        }
        .omni-thumb-arrow:hover {
          background-color: #f5f5f4;
          transform: scale(1.08);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
        }
        .omni-thumb-arrow-icon--vert {
          display: block;
        }
        .omni-thumb-arrow-icon--horiz {
          display: none;
        }
        .omni-thumbs-col {
          display: flex;
          flex-direction: column;
          gap: clamp(6px, 0.8vw, 10px);
          width: 100%;
          flex: 1 1 0;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 2px 2px;
          box-sizing: border-box;
          scroll-behavior: smooth;
        }
        .omni-thumbs-col::-webkit-scrollbar {
          display: none;
        }
        .omni-thumb-item {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: clamp(8px, 1vw, 14px);
          overflow: hidden;
          background-color: #f5f5f4;
          cursor: pointer;
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: 0;
          box-shadow: inset 0 0 0 2px transparent;
          transition: box-shadow 0.2s ease, transform 0.2s ease, opacity 0.2s ease;
          flex-shrink: 0;
        }
        .omni-thumb-item:hover {
          opacity: 1;
          transform: scale(1.04);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
        }
        .omni-thumb-item.omni-thumb-item--active {
          box-shadow: inset 0 0 0 2px #1c1917, 0 2px 8px rgba(0,0,0,0.12);
          opacity: 1;
        }
        .omni-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .omni-video-thumb-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }

        /* RIGHT MAIN GALLERY COLUMN (STAGE + TABS) */
        .omni-gallery-main-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1 1 auto;
          width: 100%;
          min-width: 0;
        }

        /* 1. MAIN DISPLAY CARD WITH DYNAMIC < AND > HOVER CURSORS */
        .omni-stage-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 auto;
        }
        .omni-main-stage {
          position: relative;
          width: 100%;
          max-width: 100%;
          aspect-ratio: 1 / 1;
          background-color: #f7f4ee;
          border-radius: clamp(18px, 2.2vw, 28px);
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          box-sizing: border-box;
          user-select: none;
          flex: 1 1 auto;
        }
        .omni-main-stage--cursor-left {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'%3E%3Ccircle cx='14' cy='14' r='13' fill='%23ffffff' stroke='%23e5e7eb' stroke-width='1' fill-opacity='0.94'/%3E%3Cpath d='M16 8.5L10.5 14L16 19.5' stroke='%231f2937' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E") 14 14, w-resize !important;
        }
        .omni-main-stage--cursor-right {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 28 28'%3E%3Ccircle cx='14' cy='14' r='13' fill='%23ffffff' stroke='%23e5e7eb' stroke-width='1' fill-opacity='0.94'/%3E%3Cpath d='M12 8.5L17.5 14L12 19.5' stroke='%231f2937' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E") 14 14, e-resize !important;
        }
        .omni-main-img-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .omni-main-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        .omni-main-img--contain {
          object-fit: contain !important;
        }

        /* 2. TABS SELECTOR ROW DIRECTLY BELOW MAIN IMAGE (TIGHT PADDING, SINGLE LINE) */
        .omni-tabs-row {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: nowrap;
          gap: clamp(12px, 1.8vw, 28px);
          margin-top: clamp(6px, 1vw, 10px);
          margin-bottom: 0;
          padding-bottom: 2px;
          border-bottom: none;
          width: 100%;
        }
        .omni-tab-btn {
          position: relative;
          background: none;
          border: none;
          padding: 4px 4px;
          font-family: var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: clamp(12px, 1.15vw, 14.5px);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
          color: #78716c;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s ease;
        }
        .omni-tab-btn:hover {
          color: #1c1917;
        }
        .omni-tab-btn.omni-tab-btn--active {
          color: #1c1917;
          font-weight: 800;
        }
        /* BEIGE / GOLD STAR COLOR DOT */
        .omni-tab-indicator {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: var(--gold, #b89556);
          display: inline-block;
          animation: omniDotPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes omniDotPop {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* 3. VIDEO STAGE CONTROLS */
        .omni-video-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .omni-video-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .omni-video-play-btn {
          position: absolute;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.94);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2e102f;
          cursor: pointer !important;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
          transition: transform 0.2s ease, background-color 0.2s ease;
          z-index: 10;
        }
        .omni-video-play-btn:hover {
          transform: scale(1.1);
          background: #ffffff;
        }
        .omni-video-controls-bottom-right {
          position: absolute;
          bottom: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 11;
        }
        .omni-video-control-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          cursor: pointer !important;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        .omni-video-control-btn:hover {
          background: rgba(0, 0, 0, 0.85);
          transform: scale(1.08);
        }

        /* 4. EDITORIAL INFOGRAPHIC BADGES (RESTORED SLIDE-IN MOTION ANIMATIONS) */
        .buudy-gallery-badge {
          position: absolute;
          z-index: 6;
          pointer-events: none;
          user-select: none;
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 0 !important;
          background: transparent !important;
          background-color: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          box-sizing: border-box;
          max-width: clamp(140px, 18vw, 215px);
          will-change: opacity, transform;
        }
        .buudy-gallery-badge--top-left {
          top: clamp(14px, 1.8vw, 22px);
          left: clamp(14px, 1.8vw, 22px);
          align-items: flex-start;
          text-align: left;
          animation: buudyBadgeSlideInLeft 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both;
        }
        .buudy-gallery-badge--bottom-left {
          bottom: clamp(14px, 1.8vw, 22px);
          left: clamp(14px, 1.8vw, 22px);
          align-items: flex-start;
          text-align: left;
          animation: buudyBadgeSlideInLeft 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both;
        }
        .buudy-gallery-badge--top-right {
          top: clamp(14px, 1.8vw, 22px);
          right: clamp(14px, 1.8vw, 22px);
          align-items: flex-end;
          text-align: right;
          animation: buudyBadgeSlideInRight 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both;
        }
        .buudy-gallery-badge--bottom-right {
          bottom: clamp(14px, 1.8vw, 22px);
          right: clamp(14px, 1.8vw, 22px);
          align-items: flex-end;
          text-align: right;
          animation: buudyBadgeSlideInRight 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both;
        }
        .buudy-gallery-badge__title {
          font-family: var(--font-fraunces), var(--font-serif), ui-serif, Georgia, serif;
          font-size: clamp(13.5px, 1.6vw, 16.5px);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          color: #111111;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.95), 0 0 12px rgba(255, 255, 255, 0.85);
          margin: 0;
          display: block;
        }
        .buudy-gallery-badge__sub {
          font-family: var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: clamp(10px, 1.1vw, 12px);
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: #374151;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9);
          margin: 0;
          margin-top: 2px;
          display: block;
          animation: buudySubSlideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both;
          will-change: opacity, transform;
        }
        .buudy-gallery-badge--top-right .buudy-gallery-badge__sub,
        .buudy-gallery-badge--bottom-right .buudy-gallery-badge__sub {
          animation: buudySubSlideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both;
        }
        .buudy-gallery-badge--white .buudy-gallery-badge__title {
          color: #ffffff !important;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.85), 0 0 16px rgba(0, 0, 0, 0.75) !important;
        }
        .buudy-gallery-badge--white .buudy-gallery-badge__sub {
          color: rgba(255, 255, 255, 0.92) !important;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.85) !important;
        }
        @keyframes buudyBadgeSlideInLeft {
          0% {
            opacity: 0;
            transform: translate3d(-36px, 0, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes buudyBadgeSlideInRight {
          0% {
            opacity: 0;
            transform: translate3d(36px, 0, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes buudySubSlideInLeft {
          0% {
            opacity: 0;
            transform: translate3d(-14px, 0, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes buudySubSlideInRight {
          0% {
            opacity: 0;
            transform: translate3d(14px, 0, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        /* 4. BEFORE & AFTER 3 BOTTOM OVAL PILLS */
        .omni-ba-pills-row {
          position: absolute;
          bottom: clamp(12px, 1.8vw, 18px);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(6px, 1vw, 10px);
          width: auto;
          max-width: calc(100% - 24px);
          z-index: 10;
          pointer-events: none;
        }
        .omni-ba-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: clamp(4px, 0.6vw, 6.5px) clamp(10px, 1.2vw, 15px);
          border-radius: 9999px;
          font-family: var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: clamp(10.5px, 1.15vw, 12.5px);
          font-weight: 600;
          letter-spacing: 0.01em;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
          border-width: 1px;
          border-style: solid;
          animation: buudyBadgeSlideInUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
          will-change: opacity, transform;
        }
        @keyframes buudyBadgeSlideInUp {
          0% {
            opacity: 0;
            transform: translate3d(0, 18px, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .omni-ba-pills-row--lightbox {
          bottom: clamp(20px, 3vw, 32px);
          gap: clamp(8px, 1.5vw, 14px);
        }
        .omni-ba-pill--lightbox {
          padding: clamp(6px, 0.9vw, 9px) clamp(14px, 1.8vw, 20px);
          font-size: clamp(12px, 1.3vw, 15px);
        }

        /* 5. LIGHTBOX OVERLAY (1:1 IDENTICAL WITH BUUDY-LED-MASK PRODUCTGALLERY) */
        .buudyLED-23435t23-lightbox {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 99999999;
          pointer-events: auto;
        }
        .buudyLED-23435t23-lightbox_content {
          position: relative;
          z-index: 100000000;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        .buudyLED-23435t23-lightbox_stage {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          max-width: 90vw;
          max-height: 85vh;
          border-radius: 25px;
          overflow: hidden;
        }
        .buudyLED-23435t23-lightbox_img {
          max-width: 90vw;
          max-height: 85vh;
          border-radius: 25px;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
          user-select: none;
          object-fit: contain;
          transition: opacity 0.3s ease;
        }
        .buudyLED-23435t23-close {
          position: absolute;
          top: 20px;
          right: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: rgba(247, 241, 232, 0.94);
          border: 1px solid rgba(58, 31, 61, 0.18);
          color: var(--plum);
          cursor: pointer;
          z-index: 100000001;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .buudyLED-23435t23-close:hover {
          background: var(--cream);
          transform: scale(1.06);
        }
        .buudyLED-23435t23-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(255, 255, 255, 0.9);
          border: none;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          padding: 0;
          transition: transform 0.2s, background-color 0.2s;
        }
        .buudyLED-23435t23-arrow:hover {
          background-color: #fff;
          transform: translateY(-50%) scale(1.1);
        }
        .buudyLED-23435t23-modal_nav {
          width: 60px;
          height: 60px;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 50%;
        }
        .buudyLED-23435t23-modal_nav:hover {
          background: rgba(0, 0, 0, 0.2);
        }
        .buudyLED-23435t23-icon {
          border: solid #333;
          border-width: 0 3px 3px 0;
          display: inline-block;
          padding: 5px;
        }
        .buudyLED-23435t23-icon_right {
          transform: rotate(-45deg);
          margin-left: -4px;
        }
        .buudyLED-23435t23-icon_left {
          transform: rotate(135deg);
          margin-right: -4px;
        }
        .buudyLED-23435t23-prev {
          left: 15px;
        }
        .buudyLED-23435t23-next {
          right: 15px;
        }

        .buudy-gallery-badge--lightbox {
          max-width: clamp(150px, 35vw, 240px);
          z-index: 10 !important;
        }
        .buudy-gallery-badge--lightbox.buudy-gallery-badge--top-left {
          top: clamp(14px, 2.5vw, 24px);
          left: clamp(14px, 2.5vw, 24px);
        }
        .buudy-gallery-badge--lightbox.buudy-gallery-badge--bottom-left {
          bottom: clamp(14px, 2.5vw, 24px);
          left: clamp(14px, 2.5vw, 24px);
        }
        .buudy-gallery-badge--lightbox.buudy-gallery-badge--top-right {
          top: clamp(14px, 2.5vw, 24px);
          right: clamp(14px, 2.5vw, 24px);
        }
        .buudy-gallery-badge--lightbox.buudy-gallery-badge--bottom-right {
          bottom: clamp(14px, 2.5vw, 24px);
          right: clamp(14px, 2.5vw, 24px);
        }

        /* 6. MOBILE RESPONSIVENESS */
        @media screen and (max-width: 1023px) {
          .omni-gallery-container {
            flex-direction: column;
            max-width: 100%;
            gap: 10px;
          }
          .omni-thumbs-wrapper {
            flex-direction: row;
            width: 100%;
            height: auto;
            max-height: none;
            order: 3;
            margin-top: 10px;
            gap: 6px;
            align-items: center;
          }
          .omni-thumb-arrow-icon--vert {
            display: none;
          }
          .omni-thumb-arrow-icon--horiz {
            display: block;
          }
          .omni-thumbs-col {
            flex-direction: row;
            width: 100%;
            height: auto;
            max-height: none;
            overflow-x: auto;
            overflow-y: hidden;
            padding: 2px 1px;
            gap: 6px;
          }
          .omni-thumb-item {
            flex: 0 0 54px;
            width: 54px;
            height: 54px;
            border-radius: 10px;
          }
          .omni-stage-row {
            gap: 6px;
          }
          .omni-stage-arrow {
            width: 32px;
            height: 32px;
          }
          .omni-tabs-row {
            gap: 16px;
            margin-top: 10px;
          }
          .omni-tab-btn {
            font-size: 11.5px;
            letter-spacing: 0.05em;
          }
          .buudy-gallery-badge {
            max-width: 170px !important;
          }
          .buudy-gallery-badge__title {
            font-size: 13px !important;
          }
          .buudy-gallery-badge__sub {
            font-size: 10px !important;
          }
        }
      `,
        }}
      />

      <div className="omni-gallery-container" id="buudyOmniluxGallery">
        {/* LEFT VERTICAL THUMBNAIL TRACK WITH MIROOOO ARROW NAVIGATION */}
        <div className="omni-thumbs-wrapper">
          {/* Top / Prev Thumbnail Arrow */}
          <button
            type="button"
            aria-label="Previous thumbnail"
            className="omni-thumb-arrow omni-thumb-arrow--prev"
            onClick={goPrev}
          >
            <ChevronUp size={16} className="omni-thumb-arrow-icon--vert" />
            <ChevronLeft size={16} className="omni-thumb-arrow-icon--horiz" />
          </button>

          <div className="omni-thumbs-col" ref={thumbsTrackRef}>
            {allMediaItems.map((item, idx) => (
              <button
                type="button"
                key={`thumb-${item.type}-${item.src}-${idx}`}
                aria-label={`Select item ${idx + 1}`}
                className={`omni-thumb-item ${
                  idx === currentIndex ? "omni-thumb-item--active" : ""
                }`}
                onClick={() => setCurrentIndex(idx)}
              >
                {item.type === "video" || item.src.endsWith(".mp4") || item.src.endsWith(".webm") ? (
                  <>
                    <video
                      src={item.src}
                      className="omni-thumb-img"
                      muted
                      playsInline
                      autoPlay
                      loop
                      preload="metadata"
                    />
                    {item.type === "video" && (
                      <div className="omni-video-thumb-overlay">
                        <Play size={15} fill="currentColor" />
                      </div>
                    )}
                  </>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="omni-thumb-img"
                    decoding="async"
                    loading="lazy"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Bottom / Next Thumbnail Arrow */}
          <button
            type="button"
            aria-label="Next thumbnail"
            className="omni-thumb-arrow omni-thumb-arrow--next"
            onClick={goNext}
          >
            <ChevronDown size={16} className="omni-thumb-arrow-icon--vert" />
            <ChevronRight size={16} className="omni-thumb-arrow-icon--horiz" />
          </button>
        </div>

        {/* RIGHT MAIN GALLERY COLUMN (STAGE + TABS) */}
        <div className="omni-gallery-main-col">
          {/* TOP MAIN DISPLAY STAGE ROW */}
          <div className="omni-stage-row">
            {/* MAIN DISPLAY STAGE WITH DYNAMIC < AND > HOVER CURSORS */}
            <div
              className={`omni-main-stage ${
                hoverSide === "left"
                  ? "omni-main-stage--cursor-left"
                  : "omni-main-stage--cursor-right"
              }`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseMove={handleStageMouseMove}
              onClick={handleStageClick}
            >
              {/* 1. GALLERY IMAGE / VIDEO DISPLAY */}
              {currentItem.type === "gallery" && (
                <div className="omni-main-img-wrap">
                  {currentItem.src.endsWith(".mp4") || currentItem.src.endsWith(".webm") ? (
                    <GalleryVideo
                      src={currentItem.src}
                      isActive={true}
                      className="omni-main-img"
                    />
                  ) : (
                    <img
                      src={currentItem.src}
                      alt={currentItem.alt}
                      className="omni-main-img"
                      decoding="async"
                      fetchPriority={currentIndex === 0 ? "high" : "low"}
                      loading={currentIndex === 0 ? "eager" : "lazy"}
                    />
                  )}
                  {currentItem.badge && (
                    <div key={`badge-${currentIndex}-${currentItem.src}`}>
                      <GalleryImageBadge badge={currentItem.badge} />
                    </div>
                  )}
                </div>
              )}

              {/* 2. BEFORE & AFTER DISPLAY (With 3 Bottom Treatment Pills) */}
              {currentItem.type === "before-after" && (
                <div className="omni-main-img-wrap">
                  <img
                    src={currentItem.src}
                    alt={currentItem.alt}
                    className="omni-main-img omni-main-img--contain"
                    decoding="async"
                    loading="eager"
                  />
                  {currentItem.pills && (
                    <div
                      key={`ba-pills-${currentIndex}-${currentItem.src}`}
                      className="omni-ba-pills-row"
                    >
                      {currentItem.pills.map((pill, pIdx) => (
                        <span
                          key={pIdx}
                          className="omni-ba-pill"
                          style={{
                            backgroundColor: pill.bg,
                            color: pill.textColor,
                            borderColor: pill.borderColor || "transparent",
                            animationDelay: `${0.08 + pIdx * 0.08}s`,
                          }}
                        >
                          {pill.text}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 3. DEDICATED VIDEO DISPLAY (Footer Guarantee Video & How-To-Use Video) */}
              {currentItem.type === "video" && (
                <div className="omni-video-wrapper">
                  <video
                    key={currentItem.src}
                    className="omni-video-element"
                    playsInline
                    loop
                    autoPlay
                    muted={isVideoMuted}
                    preload="auto"
                    ref={videoPlayerRef}
                    src={currentItem.src}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                  />

                  {/* Centered Play / Pause Button Overlay */}
                  <button
                    type="button"
                    aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                    className={`omni-video-play-btn ${
                      isVideoPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideoPlay();
                    }}
                  >
                    {isVideoPlaying ? (
                      <Pause size={26} fill="currentColor" />
                    ) : (
                      <Play size={26} fill="currentColor" className="translate-x-0.5" />
                    )}
                  </button>

                  {/* Bottom Right Controls: Mute + Enlarge/Expand Lightbox */}
                  <div className="omni-video-controls-bottom-right">
                    <button
                      type="button"
                      aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
                      className="omni-video-control-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleVideoMute(e);
                      }}
                    >
                      {isVideoMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                    </button>
                    <button
                      type="button"
                      aria-label="Enlarge video in fullscreen modal"
                      className="omni-video-control-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox();
                      }}
                    >
                      <Maximize2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3 OPTIONS / TABS SELECTOR ROW DIRECTLY BELOW MAIN IMAGE (Beige/Gold Star Dot) */}
          <div className="omni-tabs-row" role="tablist" aria-label="Product Media Options">
            {/* TAB 1: GALLERY */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "gallery"}
              className={`omni-tab-btn ${
                activeTab === "gallery" ? "omni-tab-btn--active" : ""
              }`}
              onClick={() => handleTabClick("gallery")}
            >
              {activeTab === "gallery" && <span className="omni-tab-indicator" />}
              Gallery
            </button>

            {/* TAB 2: BEFORE & AFTER */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "before-after"}
              className={`omni-tab-btn ${
                activeTab === "before-after" ? "omni-tab-btn--active" : ""
              }`}
              onClick={() => handleTabClick("before-after")}
            >
              {activeTab === "before-after" && <span className="omni-tab-indicator" />}
              Before & After
            </button>

            {/* TAB 3: VIDEO */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "video"}
              className={`omni-tab-btn ${
                activeTab === "video" ? "omni-tab-btn--active" : ""
              }`}
              onClick={() => handleTabClick("video")}
            >
              {activeTab === "video" && <span className="omni-tab-indicator" />}
              Video
            </button>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL (1:1 IDENTICAL WITH BUUDY-LED-MASK PRODUCTGALLERY) */}
      {isLightboxOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              aria-label="Expanded product gallery modal"
              aria-modal="true"
              className="buudyLED-23435t23-lightbox"
              ref={lightboxRef}
              role="dialog"
              style={{ display: "flex" }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsLightboxOpen(false);
              }}
            >
              <div
                className="buudyLED-23435t23-lightbox_content"
                onClick={(e) => {
                  if (e.target === e.currentTarget) setIsLightboxOpen(false);
                }}
              >
                <button
                  className="buudyLED-23435t23-close"
                  aria-label="Close View"
                  onClick={() => setIsLightboxOpen(false)}
                  ref={closeButtonRef}
                  type="button"
                >
                  <X size={24} />
                </button>

                <button
                  className="buudyLED-23435t23-arrow buudyLED-23435t23-modal_nav buudyLED-23435t23-prev"
                  aria-label="Previous item"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                >
                  <i className="buudyLED-23435t23-icon buudyLED-23435t23-icon_left" />
                </button>

                <div className="buudyLED-23435t23-lightbox_stage">
                  {currentItem.type === "video" || currentItem.src.endsWith(".mp4") || currentItem.src.endsWith(".webm") ? (
                    <video
                      className="buudyLED-23435t23-lightbox_img"
                      src={currentItem.src}
                      autoPlay
                      loop
                      playsInline
                      controls
                    />
                  ) : (
                    <img
                      className="buudyLED-23435t23-lightbox_img"
                      src={currentItem.src}
                      alt={currentItem.alt}
                      decoding="async"
                    />
                  )}
                  {currentItem.type === "gallery" && currentItem.badge && (
                    <div key={`modal-badge-${currentIndex}-${currentItem.src}`}>
                      <GalleryImageBadge badge={currentItem.badge} isLightbox />
                    </div>
                  )}
                  {currentItem.type === "before-after" && currentItem.pills && (
                    <div
                      key={`modal-ba-pills-${currentIndex}-${currentItem.src}`}
                      className="omni-ba-pills-row omni-ba-pills-row--lightbox"
                    >
                      {currentItem.pills.map((pill, pIdx) => (
                        <span
                          key={pIdx}
                          className="omni-ba-pill omni-ba-pill--lightbox"
                          style={{
                            backgroundColor: pill.bg,
                            color: pill.textColor,
                            borderColor: pill.borderColor || "transparent",
                            animationDelay: `${0.08 + pIdx * 0.08}s`,
                          }}
                        >
                          {pill.text}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  className="buudyLED-23435t23-arrow buudyLED-23435t23-modal_nav buudyLED-23435t23-next"
                  aria-label="Next item"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                >
                  <i className="buudyLED-23435t23-icon buudyLED-23435t23-icon_right" />
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}

function GalleryImageBadge({
  badge,
  isLightbox = false,
}: {
  badge: NonNullable<ProductImage["badge"]>;
  isLightbox?: boolean;
}) {
  const positionClass = badge.position
    ? `buudy-gallery-badge--${badge.position}`
    : "buudy-gallery-badge--top-left";
  const themeClass = badge.theme === "white" ? "buudy-gallery-badge--white" : "";
  const lightboxClass = isLightbox ? "buudy-gallery-badge--lightbox" : "";

  return (
    <div
      className={`buudy-gallery-badge ${positionClass} ${themeClass} ${lightboxClass}`}
    >
      <span className="buudy-gallery-badge__title">
        {badge.title.split("\n").map((line, idx, arr) => (
          <span key={idx}>
            {line}
            {idx < arr.length - 1 && <br />}
          </span>
        ))}
      </span>
      {badge.sub && (
        <span className="buudy-gallery-badge__sub">
          {badge.sub.split("\n").map((line, idx, arr) => (
            <span key={idx}>
              {line}
              {idx < arr.length - 1 && <br />}
            </span>
          ))}
        </span>
      )}
    </div>
  );
}

function GalleryVideo({
  src,
  isActive,
  id,
  className,
}: {
  src: string;
  isActive: boolean;
  id?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [isActive]);

  return (
    <video
      ref={videoRef}
      src={src}
      id={id}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  );
}
