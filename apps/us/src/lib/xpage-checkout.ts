// Server-side adapter for the public XPage checkout used by Buudy's mask supplier.
// No admin credentials or shared shopper sessions are used here.
import { currencies } from './international/markets.ts';

export const XPAGE = {
  landingPageUrl: "https://dfffe87d9d4b.myxpage.shop/landing-page/usbuudyled-en-MTc5MjU4NjMxMDM1MTc5NjIwOQ==",
  origin: "https://us.buudy.com",
  checkoutOrigin: "https://dfffe87d9d4b.myxpage.shop",
  bundleId: "a308e3c3-e85c-4d7a-ba75-380a9e2777cc",
  regularOptionId: "a308e3c3-ef3b-40a4-9d17-ea12dbb256f5",
  promoOptionId: "a308e3c4-09c7-4cbf-a226-59800cc5843e",
  maskProductId: "a308c9bc-b4ec-48a7-8942-e6f8fdbece9a",
  maskVariantId: "a308c9bc-ca52-4d5e-8a8b-4bd1926a65ed",
  torchProductId: "a308c9dc-16ca-4ffa-956a-c465fd4b0d49",
  torchVariantId: "a308c9dc-278f-4f50-a569-8d08d178d2e8",
  ebookProductId: "a308c9a1-1c1c-4a58-84e0-00b5d0b60a93",
  ebookVariantId: "a308c9a1-2068-47f6-ab1b-5dba6b2ba6da",
  giftCardProductId: "a308c98d-d8e5-4d78-b348-f34b15a1fbb5",
  giftCardVariantId: "a308c98d-de4b-45c7-8dea-c465b9821b42",
  protectionProductIds: [
    "a2fad5db-45c4-4b36-8032-f56fa22f5cdf",
    "a308c942-8236-466e-8b63-a833e8e6a82f",
  ],
} as const;

export type CheckoutBundleOptions = {
  hasPromo?: boolean;
  hasGiftCard?: boolean;
  hasProtection?: boolean;
};

// 8 Verified Bundle Options on US Landing Page (bundleId: a308e3c3-e85c-4d7a-ba75-380a9e2777cc)
export const BUNDLE_OPTION_MAP = {
  // Option 0: Regular (Mask + Torch + Ebook)
  none: "a308e3c3-ef3b-40a4-9d17-ea12dbb256f5",
  // Option 1: BUUDY10 promo
  promo: "a308e3c4-09c7-4cbf-a226-59800cc5843e",
  // Option 4: Gift Card (9PQ28ENBLJ)
  giftcard: "a308e3c4-55ec-4331-b42a-388ee8a6eb3c",
  // Option 3: BUUDY10 + Gift Card
  promo_giftcard: "a308e3c4-41e9-4027-9bda-53836340ca39",
  // Option 6: Protection
  protection: "a308e3c4-84d2-4852-8a99-f1ea0a0977ac",
  // Option 2: BUUDY10 + Protection
  promo_protection: "a308e3c4-18b0-410b-9391-cb6181fcb2e3",
  // Option 5: Gift Card + Protection
  giftcard_protection: "a308e3c4-6faa-4f0a-804f-48d156337bfa",
  // Option 7: BUUDY10 + Gift Card + Protection
  promo_giftcard_protection: "a308e3c4-979b-4a4b-a69a-2ac8782fcd28",
} as const;

export function getOptionIdForFlags(options: CheckoutBundleOptions): string {
  const p = Boolean(options.hasPromo);
  const g = Boolean(options.hasGiftCard);
  const prot = Boolean(options.hasProtection);

  if (p && g && prot) return BUNDLE_OPTION_MAP.promo_giftcard_protection;
  if (!p && g && prot) return BUNDLE_OPTION_MAP.giftcard_protection;
  if (p && !g && prot) return BUNDLE_OPTION_MAP.promo_protection;
  if (!p && !g && prot) return BUNDLE_OPTION_MAP.protection;
  if (p && g && !prot) return BUNDLE_OPTION_MAP.promo_giftcard;
  if (!p && g && !prot) return BUNDLE_OPTION_MAP.giftcard;
  if (p && !g && !prot) return BUNDLE_OPTION_MAP.promo;
  return BUNDLE_OPTION_MAP.none;
}

type Variant = {
  id: string;
  price: number | string;
  compare_price?: number | string;
  is_visible: boolean;
};

type BundleItem = {
  id: string;
  quantity: number;
  discount_type?: string;
  discount_amount?: string | number;
  product: { id: string; status: string; variants: Variant[] };
};

type BundleOption = {
  id: string;
  title?: string;
  discount_target: string | null;
  discount_type: string | null;
  discount_amount: string | number;
  conditions: BundleItem[];
  offered: BundleItem[];
};

type Bundle = { id: string; status: string; options: BundleOption[] };

type PublishedOffer = {
  bundle: Bundle;
  csrf: string;
  landingPageId: string;
  currency: string;
  baseCurrency: string;
};

type Fetcher = typeof fetch;

function decodeAttribute(value: string) {
  return value.replace(/&(?:quot|apos|amp|lt|gt|#\d+|#x[\da-f]+);/gi, (entity) => {
    const named: Record<string, string> = {
      "&quot;": '"', "&apos;": "'", "&amp;": "&", "&lt;": "<", "&gt;": ">",
    };
    if (entity.toLowerCase() in named) return named[entity.toLowerCase()];
    const hex = entity.toLowerCase().startsWith("&#x");
    return String.fromCodePoint(parseInt(entity.slice(hex ? 3 : 2, -1), hex ? 16 : 10));
  });
}

export function parsePublishedOffer(html: string): PublishedOffer {
  let bundle: Bundle | undefined;
  for (const match of html.matchAll(/\bx-data\s*=\s*(["'])([\s\S]*?)\1/g)) {
    const attribute = decodeAttribute(match[2]);
    if (!attribute.includes(XPAGE.bundleId)) continue;
    try {
      const parsed = JSON.parse(attribute) as { bundle?: Bundle };
      if (parsed.bundle?.id === XPAGE.bundleId) bundle = parsed.bundle;
    } catch { /* Other Alpine attributes are expressions, not JSON. Never eval them. */ }
  }
  const csrf = html.match(/["']X-CSRF-Token["']:\s*["']([^"']+)["']/)?.[1];
  const landingPageId = html.match(/orderData\.landing_page_id\s*=\s*["']([\da-f-]{36})["']/)?.[1];
  const currency = html.match(/style:\s*["']currency["'],\s*currency:\s*["']([A-Z]{3})["']/)?.[1];
  const baseCurrency = html.match(/var STORE_CURRENCY = ["']([A-Z]{3})["']/)?.[1];
  if (!bundle || bundle.status !== "ACTIVE" || !csrf || !landingPageId || !currency || baseCurrency !== 'GBP') {
    throw new Error("XPage's published mask offer is unavailable.");
  }
  return { bundle, csrf, landingPageId, currency, baseCurrency };
}

function price(value: unknown) {
  if ((typeof value !== 'string' && typeof value !== 'number') || !/^\d+(\.\d{1,3})?$/.test(String(value)) || !Number.isFinite(Number(value))) {
    throw new Error('Invalid native XPage price.');
  }
  return Number(value);
}

export function selectOffer(
  published: PublishedOffer,
  optionsOrPromo: boolean | CheckoutBundleOptions = false,
) {
  const options: CheckoutBundleOptions =
    typeof optionsOrPromo === "boolean"
      ? { hasPromo: optionsOrPromo }
      : optionsOrPromo;

  const targetOptionId = getOptionIdForFlags(options);
  let option = published.bundle.options.find((item) => item.id === targetOptionId);

  // Dynamic fallback: If supplier modified an ID, match dynamically by discount and protection presence
  if (!option) {
    const expectedDiscount =
      (options.hasPromo ? 5 : 0) + (options.hasGiftCard ? 10 : 0);
    option = published.bundle.options.find((opt) => {
      const optDiscount = Number(opt.discount_amount || 0);
      const hasProtectionInOffered = opt.offered.some(
        (o) =>
          o.product?.status === "ACTIVE" &&
          (XPAGE.protectionProductIds.includes(o.product?.id as any) ||
            o.product?.variants?.some((v) => Number(v.price) > 0 && Number(v.price) <= 10 && Number(v.price) !== 19)),
      );
      return (
        optDiscount === expectedDiscount &&
        (options.hasProtection ? hasProtectionInOffered : !hasProtectionInOffered)
      );
    });
  }

  if (!option) {
    option = published.bundle.options[0];
  }

  if (!option) {
    throw new Error("XPage's published mask offer options are unavailable.");
  }

  const mask = option.conditions?.find((item) => item.product?.id === XPAGE.maskProductId) || option.conditions?.[0];
  const torch = option.offered?.find((item) => item.product?.id === XPAGE.torchProductId) || option.offered?.[0];
  const maskVariant = mask?.product.variants.find((variant) => variant.id === XPAGE.maskVariantId) || mask?.product.variants?.find((v) => v.is_visible) || mask?.product.variants?.[0];
  const torchVariant = torch?.product.variants.find((variant) => variant.id === XPAGE.torchVariantId) || torch?.product.variants?.find((v) => v.is_visible) || torch?.product.variants?.[0];

  return { option, mask, torch, maskVariant, torchVariant };
}

export function buildBundlePayload(
  published: PublishedOffer,
  quantity: number,
  optionsOrPromo: boolean | CheckoutBundleOptions = false,
) {
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
    throw new Error("Mask quantity must be between 1 and 100.");
  }
  const { option } = selectOffer(published, optionsOrPromo);

  const conditions: Record<string, string[]> = {};
  for (const c of option.conditions) {
    const variantId =
      c.product?.variants?.find((v) => v.is_visible)?.id ||
      c.product?.variants?.[0]?.id ||
      XPAGE.maskVariantId;
    const count = (c.quantity || 1) * quantity;
    conditions[c.id] = Array<string>(count).fill(variantId);
  }

  const offered: Record<string, string[]> = {};
  for (const o of option.offered) {
    const variantId =
      o.product?.variants?.find((v) => v.is_visible)?.id ||
      o.product?.variants?.[0]?.id ||
      XPAGE.torchVariantId;
    const count = (o.quantity || 1) * quantity;
    offered[o.id] = Array<string>(count).fill(variantId);
  }

  return {
    bundle_option_id: option.id,
    bundle_selected_variants: {
      conditions,
      offered,
    },
    landing_page_id: published.landingPageId,
  };
}

function cookieHeader(response: Response) {
  const getSetCookie = (response.headers as Headers & { getSetCookie?: () => string[] }).getSetCookie;
  if (typeof getSetCookie === "function") {
    return getSetCookie.call(response.headers).map((cookie) => cookie.split(";")[0]).join("; ");
  }
  const setCookie = response.headers.get("set-cookie");
  return setCookie ? setCookie.split(";")[0] : "";
}

async function loadPublishedOffer(fetcher: Fetcher, currency: string) {
  if (!currencies.includes(currency)) throw new Error('Unsupported display currency.');
  const url = new URL(XPAGE.landingPageUrl);
  url.searchParams.set("currency", currency);
  const response = await fetcher(url, {
    cache: "no-store", redirect: "error", signal: AbortSignal.timeout(12000),
    headers: { "accept-language": "en-US,en;q=0.9", cookie: `xp_currency=${currency}` },
  });
  if (!response.ok) throw new Error("XPage could not load its published offer.");
  const published = parsePublishedOffer(await response.text());
  if (published.currency !== currency) throw new Error('XPage did not return the requested currency.');
  return { published, cookie: cookieHeader(response), url };
}

export function readQuote(published: PublishedOffer, currency: string) {
  if (published.currency !== currency) throw new Error('Price currency mismatch.');
  const { maskVariant } = selectOffer(published, false);
  const { option } = selectOffer(published, true);
  return {
    currency,
    unitPrice: price(maskVariant?.price),
    ...(maskVariant?.compare_price != null ? { compareAtPrice: price(maskVariant.compare_price) } : {}),
    discount: price(option?.discount_amount),
    settlementCurrency: published.baseCurrency,
    checkedAt: new Date().toISOString(),
  };
}

export type XpageQuote = ReturnType<typeof readQuote>;
const quoteCache = new Map<string, { expires: number; value: XpageQuote }>();
const pendingQuotes = new Map<string, Promise<XpageQuote>>();

export async function getXpageQuote(currency: string): Promise<XpageQuote> {
  const cached = quoteCache.get(currency);
  if (cached && cached.expires > Date.now()) return cached.value;
  const pending = pendingQuotes.get(currency);
  if (pending) return pending;
  const task = loadPublishedOffer(fetch, currency).then(({ published }) => {
    const value = readQuote(published, currency);
    quoteCache.set(currency, { expires: Date.now() + 60000, value });
    return value;
  }).finally(() => pendingQuotes.delete(currency));
  pendingQuotes.set(currency, task);
  return task;
}

export const ALLOWED_CHECKOUT_ORIGINS = [
  "https://us.buudy.com",
  "https://dfffe87d9d4b.myxpage.shop",
  "https://mask.buudy.com",
] as const;

export function validateCheckoutUrl(href: unknown, token: unknown) {
  if (typeof href !== "string" || typeof token !== "string" || !/^[\da-f]{64}$/.test(token)) {
    throw new Error("XPage did not return a checkout session.");
  }
  const url = new URL(href);
  if (
    !ALLOWED_CHECKOUT_ORIGINS.includes(url.origin as (typeof ALLOWED_CHECKOUT_ORIGINS)[number]) ||
    url.username ||
    url.password ||
    !url.pathname.endsWith(`/checkout/${token}`)
  ) {
    throw new Error("XPage returned an unexpected checkout destination.");
  }
  return url;
}

// Attribution stays in the storefront; this boundary accepts only order inputs.
export async function createXpageCheckout(
  quantity: number,
  optionsOrPromo: boolean | CheckoutBundleOptions = false,
  fetcher: Fetcher = fetch,
  currency = 'USD',
) {
  const { published, cookie, url: landingUrl } = await loadPublishedOffer(fetcher, currency);
  const payload = buildBundlePayload(published, quantity, optionsOrPromo);
  // Do not retry this POST: a timeout may still have created an unpaid checkout.
  const response = await fetcher(`${XPAGE.checkoutOrigin}/create-bundle-order`, {
    method: "POST", cache: "no-store", redirect: "error", signal: AbortSignal.timeout(15000),
    headers: {
      "content-type": "application/json",
      "X-CSRF-Token": published.csrf,
      origin: XPAGE.checkoutOrigin,
      referer: landingUrl.toString(),
      cookie: `${cookie ? `${cookie.split('; ').filter(c => !c.startsWith('xp_currency=')).join('; ')}; ` : ''}xp_currency=${currency}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`XPage checkout request failed (${response.status}).`);
  const result = await response.json() as { status?: string; checkout_url?: string; checkout_token?: string };
  if (result.status !== "success") throw new Error("XPage could not prepare checkout.");
  const platformCheckoutUrl = validateCheckoutUrl(result.checkout_url, result.checkout_token);
  const checkoutUrl = new URL(platformCheckoutUrl.pathname, platformCheckoutUrl.origin);
  checkoutUrl.searchParams.set("currency", currency);
  return { checkoutUrl: checkoutUrl.toString(), checkoutToken: result.checkout_token };
}
