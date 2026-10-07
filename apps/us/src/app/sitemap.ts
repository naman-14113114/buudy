import type { MetadataRoute } from "next";
import { market } from "@/lib/market";
import { languages, indexedPathsForLocale, localePath, languageAlternates, type Locale } from '@/lib/international/markets';
import { localizedStorefrontEnabled } from '@/lib/international/rollout';

const routes = [
  { path: "/", lastModified: "2026-06-16", changeFrequency: "weekly", priority: 1 },
  { path: "/products/buudy-led-mask", lastModified: "2026-06-16", changeFrequency: "weekly", priority: 1 },
  { path: "/pages/best-led-face-mask-us", lastModified: "2026-06-16", changeFrequency: "weekly", priority: 0.95 },
  { path: "/products/red-light-torch", lastModified: "2026-06-16", changeFrequency: "weekly", priority: 0.9 },
  { path: "/pages/contact-us", lastModified: "2026-06-16", changeFrequency: "monthly", priority: 0.6 },
  { path: "/pages/about-us", lastModified: "2026-06-16", changeFrequency: "monthly", priority: 0.6 },
  { path: "/pages/faqs", lastModified: "2026-06-16", changeFrequency: "monthly", priority: 0.6 },
  { path: "/pages/skincare-quiz", lastModified: "2026-06-16", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pages/premium-travel-box", lastModified: "2026-06-16", changeFrequency: "monthly", priority: 0.6 },
  { path: "/pages/buudy-led-torch", lastModified: "2026-06-16", changeFrequency: "monthly", priority: 0.6 },
  { path: "/pages/skincare-ebook", lastModified: "2026-09-29", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ebook", lastModified: "2026-09-29", changeFrequency: "monthly", priority: 0.8 },
  { path: "/policies/shipping-policy", lastModified: "2026-06-16", changeFrequency: "monthly", priority: 0.4 },
  { path: "/policies/return-policy", lastModified: "2026-06-16", changeFrequency: "monthly", priority: 0.4 },
  { path: "/policies/refund-policy", lastModified: "2026-06-16", changeFrequency: "monthly", priority: 0.4 },
  { path: "/policies/privacy-policy", lastModified: "2026-06-16", changeFrequency: "monthly", priority: 0.3 },
  { path: "/policies/terms-of-service", lastModified: "2026-06-16", changeFrequency: "monthly", priority: 0.3 },
  { path: "/policies/cookies-policy", lastModified: "2026-06-16", changeFrequency: "monthly", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes.map((route) => ({
    url: `${market.siteUrl}${route.path === "/" ? "" : route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency as "weekly" | "monthly",
    priority: route.priority,
    ...(indexedPathsForLocale('en').some(path=>path===route.path)?{alternates:{languages:languageAlternates(route.path)}}:{}),
  })), ...(localizedStorefrontEnabled?Object.keys(languages).filter(locale=>locale!=='en'):[]).flatMap(locale=>indexedPathsForLocale(locale).map(path=>({
    url:`${market.siteUrl}${localePath(locale as Locale,path)}`,
    alternates:{languages:languageAlternates(path)},
  })))];
}
