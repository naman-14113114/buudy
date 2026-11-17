"use client";

import dynamic from "next/dynamic";

import type { BeforeAfterGridProps } from "./BeforeAfterGrid";

const VideoReviews = dynamic(
  () => import("./VideoReviews").then((mod) => mod.VideoReviews),
  { ssr: false },
);

const BeforeAfterGrid = dynamic(
  () => import("./BeforeAfterGrid").then((mod) => mod.BeforeAfterGrid),
  { ssr: false },
);

const WavelengthSelector = dynamic(
  () => import("./WavelengthSelector").then((mod) => mod.WavelengthSelector),
  { ssr: false },
);

const ExpertSection = dynamic(
  () => import("./ExpertSection").then((mod) => mod.ExpertSection),
  { ssr: false },
);

const HowToUseSection = dynamic(
  () => import("./HowToUseSection").then((mod) => mod.HowToUseSection),
  { ssr: false },
);

export function DeferredVideoReviews() {
  return <VideoReviews />;
}

export function DeferredBeforeAfterGrid(props: BeforeAfterGridProps = {}) {
  return <BeforeAfterGrid {...props} />;
}

export function DeferredWavelengthSelector() {
  return <WavelengthSelector />;
}

export function DeferredExpertSection() {
  return <ExpertSection />;
}

export function DeferredHowToUseSection() {
  return <HowToUseSection />;
}
