// Landing IDs identify acquisition pages, not distinct mask models or SKUs.
// Every landing below uses the same catalog product and hosted checkout offer.
export const MASK_CHECKOUT_PRODUCT_ID = "buudy-led-mask";

export const maskLandingPages = [
  { id: "buudy-mask-lp-best-face-uk", slug: "best-led-face-mask" },
  { id: "buudy-mask-lp-best-mask-uk", slug: "best-led-mask-in-uk" },
  { id: "buudy-mask-lp-buudy-face", slug: "buudy-led-face-mask" },
  { id: "buudy-mask-lp-7-colour", slug: "buudy-7-colour-led-mask" },
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
