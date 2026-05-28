import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://buudy.com/products/buudy-led-mask",
      lastModified: new Date("2026-05-28"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://buudy.com/cart",
      lastModified: new Date("2026-05-28"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
