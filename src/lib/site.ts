export const defaultSiteUrl = "https://us.buudy.com";
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
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  extraParams?: Record<string, string | number | boolean | null | undefined>;
};

export function buildPlusbaseCheckoutUrl(options: CheckoutBridgeOptions = {}) {
  const url = new URL(getPlusbaseCheckoutBridgeUrl());
  const quantity = Math.max(1, Math.round(options.quantity ?? 1));
  const giftQuantity = Math.max(
    1,
    Math.round(options.giftQuantity ?? options.quantity ?? 1),
  );

  const params: Record<string, string> = {
    variant_id: "1000019092784268",
    product_id: "1000000611225890",
    quantity: String(quantity),
    qty: String(quantity),
    product_quantity: String(quantity),
    gift_variant_id: "1000020018633106",
    gift_product_id: "1000000647209032",
    gift_quantity: String(giftQuantity),
    gift: "buudy-red-torch",
    redirect: "checkout",
    product_handle: "buudy-led-mask",
    source: options.source ?? "us_buudy",
    utm_source: options.utmSource ?? "us.buudy.com",
    utm_medium: options.utmMedium ?? "store_cart_checkout",
    utm_campaign: options.utmCampaign ?? "us_led_mask",
  };

  if (options.checkoutRef) {
    params.checkout_ref = options.checkoutRef;
  }

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  Object.entries(options.extraParams ?? {}).forEach(([key, value]) => {
    if (value != null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}
