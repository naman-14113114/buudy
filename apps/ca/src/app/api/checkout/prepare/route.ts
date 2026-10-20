import { NextResponse, type NextRequest } from "next/server";
import { appendAttributionToAbsoluteUrl } from "@/lib/attribution";
import { getAppliedManualPromoCode } from "@/lib/cart";
import { z } from "zod";
import { createXpageCheckout } from "@/lib/xpage-checkout";
import { normalizeCheckoutProductIds } from "@/lib/maskLandingPages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Buudy's replacement PlusBase store uses this public primary domain for checkout.
const plusbaseOrigin = "https://buudy.com";

const PLUSBASE_PRODUCTS: Record<string, { productId: number; variantId: number }> = {
  "buudy-led-mask": { productId: 1000000671255940, variantId: 1000020579664196 },
  "buudy-7-colour-led-mask": { productId: 1000000671255940, variantId: 1000020579664196 },
  "buudy-ipl-device": { productId: 1000000671255943, variantId: 1000020579664199 },
  "buudy-red-torch": { productId: 1000000671255948, variantId: 1000020579664204 },
};

type CheckoutPrepareBody = {
  customerEmail?: string;
  quantity?: number;
  cart?: {
    lines: Array<{ productId: string; quantity: number; type?: string }>;
    manualPromoCode?: string;
    manualPromoCodes?: string[];
    promoCodes?: string[];
  };
  attribution?: Record<string, string | null | undefined>;
};

const passthroughAttributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "msclkid",
  "gclid",
  "fbclid",
  "source",
];

const prepareSchema = z.object({
  quantity: z.number().int().min(1).max(100).optional(),
  cart: z.object({
    lines: z.array(z.object({
      productId: z.string().min(1).max(100),
      quantity: z.number().int().min(1).max(100),
      type: z.enum(["product", "gift"]).optional(),
    })).min(1).max(100),
    manualPromoCode: z.string().max(60).optional(),
    manualPromoCodes: z.array(z.string().max(60)).max(20).optional(),
    promoCodes: z.array(z.string().max(60)).max(20).optional(),
  }).optional(),
  attribution: z.record(z.string(), z.union([z.string().max(2000), z.null()])).optional(),
}).refine((body) => body.cart || body.quantity, "The cart is empty.");

function buildPlusbaseAttributionProperties(attribution: CheckoutPrepareBody["attribution"]) {
  const properties: Array<{ name: string; value: string }> = [];

  passthroughAttributionKeys.forEach((key) => {
    const value = attribution?.[key];
    if (value) {
      properties.push({ name: `_blfm_${key}`, value: String(value).slice(0, 500) });
    }
  });

  return properties;
}

function cleanAttribution(attribution: CheckoutPrepareBody["attribution"]) {
  const params: Record<string, string> = {};

  passthroughAttributionKeys.forEach((key) => {
    const value = attribution?.[key];
    if (value) {
      params[key] = String(value).slice(0, 500);
    }
  });

  return params;
}

function getManualPromoFromCart(cart: CheckoutPrepareBody["cart"]) {
  return getAppliedManualPromoCode(
    cart?.manualPromoCode ??
      cart?.manualPromoCodes?.[0] ??
      cart?.promoCodes?.find((code) => getAppliedManualPromoCode(code)),
  );
}

function appendDiscountCodeToUrl(href: string, discountCode: string) {
  if (!discountCode) return href;

  const url = new URL(href);
  url.searchParams.set("discount", discountCode);
  return url.toString();
}

function appendCookies(current: string, response: Response) {
  const headers = response.headers as Headers & {
    getSetCookie?: () => string[];
  };
  const setCookies =
    typeof headers.getSetCookie === "function"
      ? headers.getSetCookie()
      : headers.get("set-cookie")
        ? [headers.get("set-cookie") as string]
        : [];

  if (!setCookies.length) {
    return current;
  }

  const cookieMap = new Map<string, string>();

  current
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .forEach((part) => {
      const [name] = part.split("=");
      cookieMap.set(name, part);
    });

  setCookies.forEach((cookie) => {
    const pair = cookie.split(";")[0];
    const [name] = pair.split("=");
    if (name && pair) {
      cookieMap.set(name, pair);
    }
  });

  return Array.from(cookieMap.values()).join("; ");
}

async function createPlusbaseCheckout(
  quantity: number,
  attribution: CheckoutPrepareBody["attribution"],
  cart?: CheckoutPrepareBody["cart"],
  clientHeaders?: {
    forwardedFor?: string | null;
    connectingIp?: string | null;
    acceptLanguage?: string | null;
  },
) {
  let cookie = "X-Global-Market=CA; X-Global-Market-Currency=CAD; X-Lang=en-ca; country_code=CA; currency=CAD";

  const requestHeaders: Record<string, string> = {
    accept: "application/json",
    cookie,
    "accept-language": clientHeaders?.acceptLanguage || "en-CA,en;q=0.9",
  };

  if (clientHeaders?.forwardedFor) {
    requestHeaders["x-forwarded-for"] = clientHeaders.forwardedFor;
  }
  if (clientHeaders?.connectingIp) {
    requestHeaders["cf-connecting-ip"] = clientHeaders.connectingIp;
  }

  const createResponse = await fetch(
    `${plusbaseOrigin}/api/checkout/next/cart.json`,
    {
      method: "POST",
      headers: requestHeaders,
    },
  );
  cookie = appendCookies(cookie, createResponse);

  const createJson = await createResponse.json();
  const cartToken = createJson?.result?.token;

  if (!createResponse.ok || !cartToken) {
    throw new Error(
      `PlusBase cart creation failed with status ${createResponse.status}`,
    );
  }

  const attributionProperties = buildPlusbaseAttributionProperties(attribution);

  const addItem = async (
    productId: number,
    variantId: number,
    itemQuantity: number,
  ) => {
    const itemResponse = await fetch(
      `${plusbaseOrigin}/api/checkout/next/cart/items.json`,
      {
        method: "POST",
        headers: {
          ...requestHeaders,
          "content-type": "application/json",
          cookie,
        },
        body: JSON.stringify({
          cart_token: cartToken,
          items: [
            {
              product_id: productId,
              variant_id: variantId,
              quantity: itemQuantity,
              properties: attributionProperties,
            },
          ],
        }),
      },
    );
    cookie = appendCookies(cookie, itemResponse);

    if (!itemResponse.ok) {
      throw new Error(
        `PlusBase add item failed for product ${productId} with status ${itemResponse.status}`,
      );
    }
  };

  const checkoutResponse = await fetch(
    `${plusbaseOrigin}/api/checkout/next/checkouts.json`,
    {
      method: "POST",
      headers: {
        ...requestHeaders,
        "content-type": "application/json",
        cookie,
      },
      body: JSON.stringify({
        cart_token: cartToken,
      }),
    },
  );

  const checkoutJson = await checkoutResponse.json();
  const checkoutToken = checkoutJson?.result?.token;

  if (!checkoutResponse.ok || !checkoutToken) {
    throw new Error(
      `PlusBase checkout creation failed with status ${checkoutResponse.status}`,
    );
  }

  if (cart?.lines && cart.lines.length > 0) {
    const itemsToAdd = cart.lines
      .filter((line) => line.type !== "gift")
      .map((line) => {
        const product = PLUSBASE_PRODUCTS[line.productId];
        if (!product) return null;
        return {
          productId: product.productId,
          variantId: product.variantId,
          quantity: line.quantity,
        };
      })
      .filter(
        (
          item,
        ): item is { productId: number; variantId: number; quantity: number } =>
          item !== null,
      );

    for (const item of itemsToAdd) {
      await addItem(item.productId, item.variantId, item.quantity);
    }
  } else {
    await addItem(
      PLUSBASE_PRODUCTS["buudy-led-mask"].productId,
      PLUSBASE_PRODUCTS["buudy-led-mask"].variantId,
      quantity,
    );
    await addItem(PLUSBASE_PRODUCTS["buudy-red-torch"].productId, PLUSBASE_PRODUCTS["buudy-red-torch"].variantId, quantity);
  }

  return {
    checkoutToken,
    checkoutUrl: `${plusbaseOrigin}/checkouts/${checkoutToken}`,
  };
}

export async function POST(request: NextRequest) {
  const clientCountry =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country-code") ||
    request.headers.get("x-country");

  if (
    clientCountry &&
    (clientCountry.trim().toUpperCase() === "MA" ||
      clientCountry.trim().toUpperCase() === "MOROCCO" ||
      clientCountry.trim().toUpperCase() === "ES" ||
      clientCountry.trim().toUpperCase() === "SPAIN")
  ) {
    return NextResponse.json(
      { error: "The checkout has not been connected, and no order has been placed." },
      { status: 400 },
    );
  }

  const parsed = prepareSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your cart quantities and try again." }, { status: 400 });
  }
  const body = {
    ...parsed.data,
    cart: parsed.data.cart
      ? {
          ...parsed.data.cart,
          lines: normalizeCheckoutProductIds(parsed.data.cart.lines),
        }
      : undefined,
  };
  const isMaskId = (id: string) =>
    id === "buudy-led-mask" || id === "buudy-7-colour-led-mask";
  const isProtectionId = (id: string) =>
    id === "buudy-package-protection" || id === "package-protection";
  const isGiftCardId = (id: string) =>
    id === "buudy-gift-card" || id === "gift-card";
  const isEbookId = (id: string) =>
    id === "buudy-skincare-ebook" || id === "skincare-ebook";
  const isDigitalOrAddonId = (id: string) =>
    isProtectionId(id) || isGiftCardId(id) || isEbookId(id);

  const productLines = body.cart?.lines.filter((line) => line.type !== "gift");
  const maskLines = productLines?.filter((line) => isMaskId(line.productId));

  if (!body.cart || (maskLines && maskLines.length > 0)) {
    const otherPhysicalProducts = productLines?.filter(
      (line) => !isMaskId(line.productId) && !isDigitalOrAddonId(line.productId),
    );
    if (otherPhysicalProducts && otherPhysicalProducts.length > 0) {
      return NextResponse.json(
        {
          error:
            "Please check out the LED Mask separately from your other products. Your cart has been kept.",
        },
        { status: 422 },
      );
    }

    const quantity =
      maskLines?.reduce((total, line) => total + line.quantity, 0) ||
      body.quantity ||
      1;
    if (quantity > 100) {
      return NextResponse.json(
        { error: "Please contact us for orders of more than 100 masks." },
        { status: 400 },
      );
    }

    const allPromoCodes = [
      ...(body.cart?.manualPromoCodes || []),
      ...(body.cart?.promoCodes || []),
      ...(body.cart?.manualPromoCode ? [body.cart.manualPromoCode] : []),
    ].map((c) => c.trim().toUpperCase());

    const hasPromo = allPromoCodes.some(
      (c) => c === "BUUDY10" || c === "BUUDY",
    );
    const hasGiftCard =
      allPromoCodes.includes("9PQ28ENBLJ") ||
      Boolean(productLines?.some((line) => isGiftCardId(line.productId)));
    const hasProtection = Boolean(
      productLines?.some((line) => isProtectionId(line.productId)),
    );

    try {
      const checkout = await createXpageCheckout(quantity, {
        hasPromo,
        hasGiftCard,
        hasProtection,
      });
      return NextResponse.json(checkout, {
        headers: { "Cache-Control": "no-store" },
      });
    } catch (error) {
      // Never log session cookies, CSRF tokens, checkout URLs or customer data.
      console.error(
        "XPage checkout preparation failed",
        error instanceof Error ? error.message : "Unknown error",
      );
      return NextResponse.json(
        {
          error:
            "Could not prepare the mask offer. Please try again; your cart has been kept.",
        },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }
  }

  if (
    productLines &&
    (!productLines.length ||
      productLines.some((line) => !PLUSBASE_PRODUCTS[line.productId]))
  ) {
    return NextResponse.json(
      { error: "One of these products is not available for checkout." },
      { status: 400 },
    );
  }
  const quantity = body.quantity || 1;
  const appliedManualPromoCode = getManualPromoFromCart(body.cart);

  const clientHeaders = {
    forwardedFor: request.headers.get("x-forwarded-for"),
    connectingIp: request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip"),
    acceptLanguage: request.headers.get("accept-language"),
  };

  try {
    const checkout = await createPlusbaseCheckout(quantity, body.attribution, body.cart, clientHeaders);

    return NextResponse.json({
      checkoutToken: checkout.checkoutToken,
      checkoutUrl: appendAttributionToAbsoluteUrl(
        appendDiscountCodeToUrl(checkout.checkoutUrl, appliedManualPromoCode),
        cleanAttribution(body.attribution),
      ),
    });
  } catch (error) {
    console.error("Direct PlusBase checkout creation failed", error);
    return NextResponse.json(
      { error: "Could not prepare checkout. Please try again." },
      { status: 502 },
    );
  }
}
