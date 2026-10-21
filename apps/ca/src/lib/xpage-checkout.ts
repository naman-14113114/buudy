// Server-side adapter for the public XPage checkout used by Buudy's mask supplier.
// No admin credentials or shared shopper sessions are used here.
export const XPAGE = {
  landingPageUrl:
    "https://dfffe87d9d4b.myxpage.shop/landing-page/usbuudyled-en-MTc5MjU4NjMxMDM1MTc5NjIwOQ==?currency=CAD",
  checkoutOrigin: "https://dfffe87d9d4b.myxpage.shop",
  origin: "https://dfffe87d9d4b.myxpage.shop",
  bundleId: "a308e3c3-e85c-4d7a-ba75-380a9e2777cc",
  regularOptionId: "a308e3c3-ef3b-40a4-9d17-ea12dbb256f5",
  promoOptionId: "a308e3c4-09c7-4cbf-a226-59800cc5843e",
} as const;

export type CheckoutBundleOptions = {
  hasPromo?: boolean;
  hasGiftCard?: boolean;
  hasProtection?: boolean;
};

// 8 Verified Bundle Options on US Landing Page with currency=CAD (bundleId: a308e3c3-e85c-4d7a-ba75-380a9e2777cc)
export const BUNDLE_OPTION_MAP = {
  // Option 0: Regular (Mask + Torch + Ebook)
  none: "a308e3c3-ef3b-40a4-9d17-ea12dbb256f5",
  // Option 1: BUUDY10 promo (5% / CA$14)
  promo: "a308e3c4-09c7-4cbf-a226-59800cc5843e",
  // Option 2: BUUDY10 + Protection
  promo_protection: "a308e3c4-18b0-410b-9391-cb6181fcb2e3",
  // Option 3: BUUDY10 + Gift Card (15% / CA$42)
  promo_giftcard: "a308e3c4-41e9-4027-9bda-53836340ca39",
  // Option 4: Gift Card (10% / CA$28)
  giftcard: "a308e3c4-55ec-4331-b42a-388ee8a6eb3c",
  // Option 5: Gift Card + Protection
  giftcard_protection: "a308e3c4-6faa-4f0a-804f-48d156337bfa",
  // Option 6: Protection
  protection: "a308e3c4-84d2-4852-8a99-f1ea0a0977ac",
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

type Variant = { id: string; price: number | string; is_visible?: boolean };
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
  const csrf = html.match(/["']X-CSRF-Token["']:\s*["']([^"']+)["']/i)?.[1];
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
      (options.hasPromo ? 5 : 0) + (options.hasGiftCard ? 10 : 0);
    option = published.bundle.options.find((opt) => {
      const optDiscount = Number(opt.discount_amount || 0);
      const hasProtectionInOffered = opt.offered?.some(
        (o) =>
          o.product?.status === "ACTIVE" &&
          o.product?.variants?.some((v) => Number(v.price) > 0 && Number(v.price) < 15),
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
      c.product?.variants?.[0]?.id;
    if (!variantId) {
      throw new Error(`Variant not found for condition product ${c.product?.id || c.id}`);
    }
    const count = (c.quantity || 1) * quantity;
    conditions[c.id] = Array<string>(count).fill(variantId);
  }

  const offered: Record<string, string[]> = {};
  for (const o of option.offered) {
    const variantId =
      o.product?.variants?.find((v) => v.is_visible)?.id ||
      o.product?.variants?.[0]?.id;
    if (!variantId) {
      throw new Error(`Variant not found for offered product ${o.product?.id || o.id}`);
    }
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
  const url = new URL(XPAGE.landingPageUrl);
  const response = await fetcher(url, {
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(12000),
    headers: {
      "accept-language": "en-CA,en;q=0.9",
      cookie: "xp_currency=CAD",
    },
  });
  if (!response.ok) throw new Error("XPage could not load its published offer.");
  return {
    published: parsePublishedOffer(await response.text()),
    cookie: cookieHeader(response),
    url,
  };
}

export const ALLOWED_CHECKOUT_ORIGINS = [
  "https://us.buudy.com",
  "https://dfffe87d9d4b.myxpage.shop",
  "https://mask.buudy.com",
];

export function validateCheckoutUrl(href: unknown, token: unknown) {
  if (typeof href !== "string" || typeof token !== "string" || !/^[\da-f]{64}$/.test(token)) {
    throw new Error("XPage did not return a checkout session.");
  }
  const url = new URL(href);
  if (
    !ALLOWED_CHECKOUT_ORIGINS.includes(url.origin) ||
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
  const response = await fetcher(`${XPAGE.checkoutOrigin}/create-bundle-order`, {
    method: "POST",
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(15000),
    headers: {
      "content-type": "application/json",
      "X-CSRF-Token": published.csrf,
      origin: XPAGE.checkoutOrigin,
      referer: landingUrl.toString(),
      cookie: `xp_currency=CAD${cookie ? `; ${cookie}` : ""}`,
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
  const checkoutUrl = new URL(platformCheckoutUrl.pathname, XPAGE.checkoutOrigin);
  checkoutUrl.searchParams.set("currency", "CAD");
  return { checkoutUrl: checkoutUrl.toString(), checkoutToken: result.checkout_token };
}
