"use client";

import dynamic from "next/dynamic";

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

export function DeferredVideoReviews() {
  return <VideoReviews />;
}

export function DeferredBeforeAfterGrid() {
  return <BeforeAfterGrid />;
}

export function DeferredWavelengthSelector() {
  return <WavelengthSelector />;
}

export function DeferredExpertSection() {
  return <ExpertSection />;
}
