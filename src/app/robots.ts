import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/account-settings",
        "/my-profile",
        "/order-history",
        "/order-confirmation",
        "/sign-in",
        "/sign-up",
      ],
    },
    sitemap: "https://buudy.com/sitemap.xml",
  };
}
