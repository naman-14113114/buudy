import { market } from "@/lib/market";

export const defaultSiteUrl = market.siteUrl;
export const plusbaseStoreUrl = "https://buudy.com";

const plusbaseBridgePath = "/pages/add-to-cart";

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl).replace(/\/+$/, "");
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function getPlusbaseCheckoutBridgeUrl() {
  const configured =
    process.env.NEXT_PUBLIC_PLUSBASE_ADD_TO_CART_URL ??
    `${plusbaseStoreUrl}${plusbaseBridgePath}`;

  return configured;
}

export type CheckoutBridgeOptions = {
  checkoutRef?: string;
  quantity?: number;
  giftQuantity?: number;
  productId?: string;
  discountCode?: string;
  discountCodes?: string[];
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  extraParams?: Record<string, string | number | boolean | null | undefined>;
};

const PLUSBASE_PRODUCTS: Record<string, { productId: string; variantId: string }> = {
  "buudy-led-mask": { productId: "1000000667467053", variantId: "1000020450989467" },
  "buudy-ipl-device": { productId: "1000000667723529", variantId: "1000020460632985" },
  "buudy-red-torch": { productId: "1000000670474158", variantId: "1000020550222900" },
};

export function buildPlusbaseCheckoutUrl(options: CheckoutBridgeOptions = {}) {
  const url = new URL(getPlusbaseCheckoutBridgeUrl());
  const quantity = Math.max(1, Math.round(options.quantity ?? 1));
  const giftQuantity = Math.max(
    1,
    Math.round(options.giftQuantity ?? options.quantity ?? 1),
  );

  const targetProductId = options.productId || "buudy-led-mask";
  const targetProduct = PLUSBASE_PRODUCTS[targetProductId] || PLUSBASE_PRODUCTS["buudy-led-mask"];

  const params: Record<string, string> = {
    variant_id: targetProduct.variantId,
    product_id: targetProduct.productId,
    quantity: String(quantity),
    qty: String(quantity),
    product_quantity: String(quantity),
    redirect: "checkout",
    product_handle: targetProductId,
    source: options.source ?? market.checkoutSource,
    utm_source: options.utmSource ?? market.checkoutUtmSource,
    utm_medium: options.utmMedium ?? "store_cart_checkout",
    utm_campaign: options.utmCampaign ?? market.checkoutUtmCampaign,
  };

  if (targetProductId === "buudy-led-mask") {
    params.gift_variant_id = PLUSBASE_PRODUCTS["buudy-red-torch"].variantId;
    params.gift_product_id = PLUSBASE_PRODUCTS["buudy-red-torch"].productId;
    params.gift_quantity = String(giftQuantity);
    params.gift = "buudy-red-torch";
  }

  if (options.checkoutRef) {
    params.checkout_ref = options.checkoutRef;
  }

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  Array.from(
    new Set([
      ...(options.discountCodes ?? []),
      ...(options.discountCode ? [options.discountCode] : []),
    ]),
  ).forEach((code) => url.searchParams.append("discount", code));

  Object.entries(options.extraParams ?? {}).forEach(([key, value]) => {
    if (value != null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}
