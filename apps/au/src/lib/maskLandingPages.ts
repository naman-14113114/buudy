// Landing IDs identify acquisition pages, not distinct mask models or SKUs.
// Every landing below uses the same catalog product and hosted checkout offer.
export const MASK_CHECKOUT_PRODUCT_ID = "buudy-led-mask";

export const maskLandingPages = [
  { id: "buudy-mask-lp-best-face-au", slug: "best-led-face-mask" },
  { id: "buudy-mask-lp-best-mask-au", slug: "best-led-mask-in-au" },
  { id: "buudy-mask-lp-best-mask-uk", slug: "best-led-mask-in-uk" },
  { id: "buudy-mask-lp-buudy-face", slug: "buudy-led-face-mask" },
  { id: "buudy-mask-lp-7-colour", slug: "buudy-7-colour-led-mask" },
  { id: "buudy-mask-lp-7-colour-face", slug: "buudy-7-colour-led-face-mask" },
  { id: "buudy-mask-lp-mask-2", slug: "buudy-led-mask-2" },
  { id: "buudy-mask-lp-mask-compact", slug: "buudy-led-mask-compact" },
] as const;

export function getMaskLandingPage(pathname: string) {
  const path = pathname.replace(/\/$/, "");
  return maskLandingPages.find((landing) => path === `/products/${landing.slug}`);
}

export function resolveCheckoutProductId(productId: string) {
  return maskLandingPages.some(
    (landing) => productId === landing.id || productId === landing.slug,
  )
    ? MASK_CHECKOUT_PRODUCT_ID
    : productId;
}

export function normalizeCheckoutProductIds<T extends { productId: string }>(lines: T[]): T[] {
  return lines.map((line) => ({
    ...line,
    productId: resolveCheckoutProductId(line.productId),
  }));
}
