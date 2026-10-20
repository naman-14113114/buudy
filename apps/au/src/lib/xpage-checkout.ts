// Server-side adapter for the public XPage checkout used by Buudy's mask supplier.
// No admin credentials or shared shopper sessions are used here.
export const XPAGE = {
  origin: "https://mask.buudy.com",
  checkoutOrigin: "https://dfffe87d9d4b.myxpage.shop",
  bundleId: "a2bc86b5-9455-4d66-aa55-d0bc8d865563",
  regularOptionId: "a2bc86b5-9d77-49d0-80ae-228378b5e042",
  promoOptionId: "a2be21a3-7bb0-4f74-8878-9dc88d152f25",
  maskProductId: "a2c07c2a-bf3e-4b92-b7a3-0abd9217195b",
  maskVariantId: "a2c07c3b-1aa2-457e-96ba-b2ae0bf2d3f7",
  torchProductId: "a2bd4da0-e5f8-4b1e-a1af-e51e924915ad",
  torchVariantId: "a2bd4db9-992d-4f1a-84b8-472d1e173efd",
} as const;

export type CheckoutBundleOptions = {
  hasPromo?: boolean;
  hasGiftCard?: boolean;
  hasProtection?: boolean;
};

// 8 Verified Bundle Options on https://mask.buudy.com (bundleId: a2bc86b5-9455-4d66-aa55-d0bc8d865563)
export const BUNDLE_OPTION_MAP = {
  // Option 0: GET FREE BUUDY TORCH
  none: "a2bc86b5-9d77-49d0-80ae-228378b5e042",
  // Option 1: BUUDY10 + FREE TORCH
  promo: "a2be21a3-7bb0-4f74-8878-9dc88d152f25",
  // Option 4: BUUDY TORCH + FREE GIFT CARD
  giftcard: "a304aafc-5a6f-42b9-bbb2-0407b5c7f533",
  // Option 3: BUUDY10 + FREE GIFT CARD + FREE GIFTS
  promo_giftcard: "a304aafc-5a2d-4e74-85b6-31bab91ffcfb",
  // Option 6: FREE GIFTS + PACKAGE PROTECTION
  protection: "a304b259-1296-44e4-b3c8-1723a3e9d8cb",
  // Option 2: BUUDY10 + FREE GIFTS + PACKAGE PROTECTION
  promo_protection: "a304aafc-4512-4393-827b-6d2c9358c9c2",
  // Option 5: FREE GIFTS + GIFT CARD + PACKAGE PROTECTION
  giftcard_protection: "a304aafc-6217-4a7d-a7af-8862d9fc6397",
  // Option 7: FREE GIFTS + GIFT CARD + BUUDY10 + PACKAGE PROTECTION
  promo_giftcard_protection: "a304b259-18b6-465d-bfaa-65daa91f21f6",
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

type Variant = { id: string; price: number | string; is_visible: boolean };
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
type PublishedOffer = { bundle: Bundle; csrf: string; landingPageId: string };
type Fetcher = typeof fetch;

function decodeAttribute(value: string) {
  return value.replace(/&(?:quot|apos|amp|lt|gt|#\d+|#x[\da-f]+);/gi, (entity) => {
    const named: Record<string, string> = {
      "&quot;": '"',
      "&apos;": "'",
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
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
    } catch {
      /* Other Alpine attributes are expressions, not JSON. Never eval them. */
    }
  }
  const csrf = html.match(/["']X-CSRF-Token["']:\s*["']([^"']+)["']/)?.[1];
  const landingPageId = html.match(/orderData\.landing_page_id\s*=\s*["']([\da-f-]{36})["']/)?.[1];
  if (!bundle || bundle.status !== "ACTIVE" || !csrf || !landingPageId) {
    throw new Error("XPage's published mask offer is unavailable.");
  }
  return { bundle, csrf, landingPageId };
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
      (options.hasPromo ? 10 : 0) + (options.hasGiftCard ? 20 : 0);
    option = published.bundle.options.find((opt) => {
      const optDiscount = Number(opt.discount_amount || 0);
      const hasProtectionInOffered = opt.offered.some(
        (o) =>
          o.product?.status === "ACTIVE" &&
          o.product?.variants?.some((v) => Number(v.price) > 0 && Number(v.price) < 10),
      );
      return (
        optDiscount === expectedDiscount &&
        (options.hasProtection ? hasProtectionInOffered : !hasProtectionInOffered)
      );
    });
  }

  // Fallback to primary option if still not matched
  if (!option) {
    option = published.bundle.options[0];
  }

  if (!option) {
    throw new Error("XPage's published mask offer options are unavailable.");
  }

  return { option };
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
  return response.headers.getSetCookie().map((cookie) => cookie.split(";")[0]).join("; ");
}

async function loadPublishedOffer(fetcher: Fetcher) {
  const url = new URL("/?currency=AUD", XPAGE.origin);
  const response = await fetcher(url, {
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(12000),
    headers: { "accept-language": "en-AU,en;q=0.9", cookie: "xp_currency=AUD" },
  });
  if (!response.ok) throw new Error("XPage could not load its published offer.");
  return { published: parsePublishedOffer(await response.text()), cookie: cookieHeader(response), url };
}

export function validateCheckoutUrl(href: unknown, token: unknown) {
  if (typeof href !== "string" || typeof token !== "string" || !/^[\da-f]{64}$/.test(token)) {
    throw new Error("XPage did not return a checkout session.");
  }
  const url = new URL(href);
  if (
    (url.origin !== XPAGE.checkoutOrigin && url.origin !== XPAGE.origin) ||
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
) {
  const { published, cookie, url: landingUrl } = await loadPublishedOffer(fetcher);
  const payload = buildBundlePayload(published, quantity, optionsOrPromo);
  // Do not retry this POST: a timeout may still have created an unpaid checkout.
  const response = await fetcher(`${XPAGE.origin}/create-bundle-order`, {
    method: "POST",
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(15000),
    headers: {
      "content-type": "application/json",
      "X-CSRF-Token": published.csrf,
      origin: XPAGE.origin,
      referer: landingUrl.toString(),
      cookie: `xp_currency=AUD${cookie ? `; ${cookie}` : ""}`,
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`XPage checkout request failed (${response.status}).`);
  const result = (await response.json()) as {
    status?: string;
    checkout_url?: string;
    checkout_token?: string;
  };
  if (result.status !== "success") throw new Error("XPage could not prepare checkout.");
  const platformCheckoutUrl = validateCheckoutUrl(result.checkout_url, result.checkout_token);
  // The session is in the path. Do not copy optional provider query parameters
  // or fragments, which could reintroduce attribution into the browser handoff.
  const checkoutUrl = new URL(platformCheckoutUrl.pathname, XPAGE.origin);
  checkoutUrl.searchParams.set("currency", "AUD");
  return { checkoutUrl: checkoutUrl.toString(), checkoutToken: result.checkout_token };
}
