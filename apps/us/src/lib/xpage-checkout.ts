// Server-side adapter for the public XPage checkout used by Buudy's mask supplier.
// No admin credentials or shared shopper sessions are used here.
import { currencies } from './international/markets.ts';
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

type Variant = { id: string; price: number | string; compare_price?: number | string; is_visible: boolean };
type BundleItem = {
  id: string;
  quantity: number;
  discount_type?: string;
  discount_amount?: string | number;
  product: { id: string; status: string; variants: Variant[] };
};
type BundleOption = {
  id: string;
  discount_target: string | null;
  discount_type: string | null;
  discount_amount: string | number;
  conditions: BundleItem[];
  offered: BundleItem[];
};
type Bundle = { id: string; status: string; options: BundleOption[] };
type PublishedOffer = { bundle: Bundle; csrf: string; landingPageId: string; currency: string; baseCurrency: string };
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

export function selectOffer(published: PublishedOffer, promo: boolean) {
  const option = published.bundle.options.find(
    (item) => item.id === (promo ? XPAGE.promoOptionId : XPAGE.regularOptionId),
  );
  const mask = option?.conditions?.find((item) => item.product?.id === XPAGE.maskProductId);
  const torch = option?.offered?.find((item) => item.product?.id === XPAGE.torchProductId);
  const maskVariant = mask?.product.variants.find((variant) => variant.id === XPAGE.maskVariantId);
  const torchVariant = torch?.product.variants.find((variant) => variant.id === XPAGE.torchVariantId);
  if (!option || option.conditions.length !== 1 || option.offered.length !== 1 ||
      !mask || !torch || mask.quantity !== 1 || torch.quantity !== 1 ||
      mask.product.status !== "ACTIVE" || torch.product.status !== "ACTIVE" ||
      !maskVariant?.is_visible || !torchVariant?.is_visible ||
      price(maskVariant.price) <= 0 || price(torchVariant.price) < 0 ||
      torch.discount_type !== "PERCENTAGE" || Number(torch.discount_amount) !== 100 ||
      (promo ? option.discount_type !== "FIXED" || option.discount_target !== "TOTAL" ||
        price(option.discount_amount) <= 0 || price(option.discount_amount) >= price(maskVariant.price) : price(option.discount_amount) !== 0)) {
    throw new Error("XPage's mask or free-torch offer has changed. Checkout was not created.");
  }
  return { option, mask, torch, maskVariant, torchVariant };
}

export function buildBundlePayload(published: PublishedOffer, quantity: number, promo: boolean) {
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
    throw new Error("Mask quantity must be between 1 and 100.");
  }
  const { option, mask, torch } = selectOffer(published, promo);
  return {
    bundle_option_id: option.id,
    bundle_selected_variants: {
      conditions: { [mask.id]: Array<string>(quantity).fill(XPAGE.maskVariantId) },
      offered: { [torch.id]: Array<string>(quantity).fill(XPAGE.torchVariantId) },
    },
    landing_page_id: published.landingPageId,
  };
}

function cookieHeader(response: Response) {
  return response.headers.getSetCookie().map((cookie) => cookie.split(";")[0]).join("; ");
}

async function loadPublishedOffer(fetcher: Fetcher, currency: string) {
  if (!currencies.includes(currency)) throw new Error('Unsupported display currency.');
  const url = new URL(`/?currency=${currency}`, XPAGE.origin);
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
  const { maskVariant } = selectOffer(published,false);
  const { option } = selectOffer(published,true);
  return { currency, unitPrice:price(maskVariant.price), discount:price(option.discount_amount),
    settlementCurrency:published.baseCurrency, checkedAt:new Date().toISOString() };
}
export type XpageQuote = ReturnType<typeof readQuote>;
const quoteCache = new Map<string,{expires:number;value:XpageQuote}>();
const pendingQuotes = new Map<string,Promise<XpageQuote>>();
export async function getXpageQuote(currency: string): Promise<XpageQuote> {
  const cached=quoteCache.get(currency);
  if (cached && cached.expires>Date.now()) return cached.value;
  const pending=pendingQuotes.get(currency);
  if(pending) return pending;
  const task=loadPublishedOffer(fetch,currency).then(({published})=>{
    const value=readQuote(published,currency);
    // Only sanitized public numbers are retained; never cache cookies or CSRF.
    quoteCache.set(currency,{expires:Date.now()+60000,value});
    return value;
  }).finally(()=>pendingQuotes.delete(currency));
  pendingQuotes.set(currency,task);
  return task;
}

export function validateCheckoutUrl(href: unknown, token: unknown) {
  if (typeof href !== "string" || typeof token !== "string" || !/^[\da-f]{64}$/.test(token)) {
    throw new Error("XPage did not return a checkout session.");
  }
  const url = new URL(href);
  if ((url.origin !== XPAGE.checkoutOrigin && url.origin !== XPAGE.origin) || url.username || url.password ||
      !url.pathname.endsWith(`/checkout/${token}`)) {
    throw new Error("XPage returned an unexpected checkout destination.");
  }
  return url;
}

// Attribution stays in the storefront; this boundary accepts only order inputs.
export async function createXpageCheckout(quantity: number, promo: boolean, fetcher: Fetcher = fetch, currency = 'USD') {
  const { published, cookie, url: landingUrl } = await loadPublishedOffer(fetcher,currency);
  const payload = buildBundlePayload(published, quantity, promo);
  // Do not retry this POST: a timeout may still have created an unpaid checkout.
  const response = await fetcher(`${XPAGE.origin}/create-bundle-order`, {
    method: "POST", cache: "no-store", redirect: "error", signal: AbortSignal.timeout(15000),
    headers: { "content-type": "application/json", "X-CSRF-Token": published.csrf,
      origin: XPAGE.origin, referer: landingUrl.toString(),
      cookie: `${cookie ? `${cookie.split('; ').filter(c=>!c.startsWith('xp_currency=')).join('; ')}; ` : ''}xp_currency=${currency}` },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`XPage checkout request failed (${response.status}).`);
  const result = await response.json() as { status?: string; checkout_url?: string; checkout_token?: string };
  if (result.status !== "success") throw new Error("XPage could not prepare checkout.");
  const platformCheckoutUrl = validateCheckoutUrl(result.checkout_url, result.checkout_token);
  // The session is in the path. Do not copy optional provider query parameters
  // or fragments, which could reintroduce attribution into the browser handoff.
  const checkoutUrl = new URL(platformCheckoutUrl.pathname, XPAGE.origin);
  checkoutUrl.searchParams.set("currency", currency);
  return { checkoutUrl: checkoutUrl.toString(), checkoutToken: result.checkout_token };
}
