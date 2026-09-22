import type { MetadataRoute } from "next";
import { market } from "@/lib/market";

const routes = [
  { path: "/", lastModified: "2026-06-16" },
  { path: "/products/buudy-led-mask", lastModified: "2026-06-16" },
  { path: "/pages/best-led-face-mask-australia", lastModified: "2026-06-16" },
  { path: "/products/red-light-torch", lastModified: "2026-06-16" },
  { path: "/pages/contact-us", lastModified: "2026-06-16" },
  { path: "/pages/about-us", lastModified: "2026-06-16" },
  { path: "/pages/faqs", lastModified: "2026-06-16" },
  { path: "/pages/skincare-quiz", lastModified: "2026-06-16" },
  { path: "/pages/premium-travel-box", lastModified: "2026-06-16" },
  { path: "/pages/buudy-led-torch", lastModified: "2026-06-16" },
  { path: "/policies/shipping-policy", lastModified: "2026-06-16" },
  { path: "/policies/return-policy", lastModified: "2026-06-16" },
  { path: "/policies/refund-policy", lastModified: "2026-06-16" },
  { path: "/policies/privacy-policy", lastModified: "2026-06-16" },
  { path: "/policies/terms-of-service", lastModified: "2026-06-16" },
  { path: "/policies/cookies-policy", lastModified: "2026-06-16" },
  { path: "/order-tracking", lastModified: "2026-06-16" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${market.siteUrl}${route.path === "/" ? "" : route.path}`,
    lastModified: new Date(route.lastModified),
  }));
}
