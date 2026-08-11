import { NextResponse, type NextRequest } from "next/server";
import { getAppliedManualPromoCode } from "@/lib/cart";
import { buildPlusbaseCheckoutUrl } from "@/lib/site";
import {
  buildPlusbaseAttributionProperties,
  normalizeAttribution,
} from "@/lib/conversions/attribution";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const plusbaseOrigin = "https://buudy.com";
const freeGiftCode = "free_bundle_ca";
const PLUSBASE_PRODUCTS: Record<string, { productId: number; variantId: number }> = {
  "buudy-led-mask": { productId: 1000000667637100, variantId: 1000020458546865 },
  "buudy-red-torch": { productId: 1000000667833423, variantId: 1000020464156156 },
};

type CheckoutPrepareBody = {
  customerEmail?: string;
  quantity?: number;
  cart?: {
    lines: Array<{ productId: string; quantity: number; type?: string }>;
    manualPromoCode?: string;
    promoCodes?: string[];
  };
  attribution?: Record<string, string | null | undefined>;
};

function cleanAttribution(attribution: CheckoutPrepareBody["attribution"]) {
  return Object.fromEntries(
    Object.entries(normalizeAttribution(attribution)),
  ) as Record<string, string>;
}

function getManualPromoFromCart(cart: CheckoutPrepareBody["cart"]) {
  return getAppliedManualPromoCode(
    cart?.manualPromoCode ??
      cart?.promoCodes?.find((code) => getAppliedManualPromoCode(code)),
  );
}

function appendParamsToUrl(
  href: string,
  params: Record<string, string>,
  discountCodes: string[],
) {
  const url = new URL(href);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  Array.from(new Set(discountCodes.filter(Boolean))).forEach((code) =>
    url.searchParams.append("discount", code),
  );
  return url.toString();
}

function appendCookies(current: string, response: Response) {
  const headers = response.headers as Headers & { getSetCookie?: () => string[] };
  const setCookies =
    typeof headers.getSetCookie === "function"
      ? headers.getSetCookie()
      : headers.get("set-cookie")
        ? [headers.get("set-cookie") as string]
        : [];
  if (!setCookies.length) return current;

  const cookieMap = new Map<string, string>();
  current
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .forEach((part) => cookieMap.set(part.split("=")[0], part));
  setCookies.forEach((cookie) => {
    const pair = cookie.split(";")[0];
    const name = pair.split("=")[0];
    if (name && pair) cookieMap.set(name, pair);
  });
  return Array.from(cookieMap.values()).join("; ");
}

async function createPlusbaseCheckout(
  quantity: number,
  attribution: CheckoutPrepareBody["attribution"],
  cart?: CheckoutPrepareBody["cart"],
) {
  let cookie = "";
  const createResponse = await fetch(`${plusbaseOrigin}/api/checkout/next/cart.json`, {
    method: "POST",
    headers: { accept: "application/json" },
  });
  cookie = appendCookies(cookie, createResponse);
  const createJson = await createResponse.json();
  const cartToken = createJson?.result?.token;
  const checkoutToken = createJson?.result?.checkout_token;
  if (!createResponse.ok || !cartToken || !checkoutToken) {
    throw new Error("Could not create PlusBase cart.");
  }

  async function addItem(
    productId: number,
    variantId: number,
    itemQuantity: number,
    properties: Array<{ name: string; value: string }> = [],
  ) {
    const response = await fetch(
      `${plusbaseOrigin}/api/checkout/next/cart.json?cart_token=${encodeURIComponent(cartToken)}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          ...(cookie ? { cookie } : {}),
        },
        body: JSON.stringify({
          cartItem: {
            product_id: productId,
            variant_id: variantId,
            qty: itemQuantity,
            properties,
            metadata: { image_preview_id: "" },
          },
          from: "add-to-cart",
        }),
      },
    );
    cookie = appendCookies(cookie, response);
    const json = await response.json();
    if (!response.ok || json?.code !== 0) {
      throw new Error("Could not add item to PlusBase cart.");
    }
  }

  let maskQuantity = 0;
  if (cart?.lines?.length) {
    for (const line of cart.lines) {
      if (line.type === "gift" || !PLUSBASE_PRODUCTS[line.productId]) continue;
      await addItem(
        PLUSBASE_PRODUCTS[line.productId].productId,
        PLUSBASE_PRODUCTS[line.productId].variantId,
        line.quantity,
        buildPlusbaseAttributionProperties(normalizeAttribution(attribution)),
      );
      if (line.productId === "buudy-led-mask") maskQuantity = line.quantity;
    }
  } else {
    maskQuantity = quantity;
    await addItem(
      PLUSBASE_PRODUCTS["buudy-led-mask"].productId,
      PLUSBASE_PRODUCTS["buudy-led-mask"].variantId,
      quantity,
      buildPlusbaseAttributionProperties(normalizeAttribution(attribution)),
    );
  }

  if (maskQuantity > 0) {
    await addItem(
      PLUSBASE_PRODUCTS["buudy-red-torch"].productId,
      PLUSBASE_PRODUCTS["buudy-red-torch"].variantId,
      maskQuantity,
    );
  }

  return {
    checkoutToken,
    checkoutUrl: `${plusbaseOrigin}/checkouts/${checkoutToken}`,
    hasMask: maskQuantity > 0,
  };
}

async function attemptManualPromo(checkoutToken: string, code: string) {
  if (!code) return;

  try {
    const response = await fetch(
      `${plusbaseOrigin}/api/checkout/${encodeURIComponent(checkoutToken)}/next/apply-coupon.json`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "x-lang": "en-us",
          "x-shopbase-checkout-token": checkoutToken,
          "x-source-page": "checkout",
        },
        body: JSON.stringify({ code, is_coupon_from_share_able_link: true }),
      },
    );
    if (!response.ok) {
      console.error(`PlusBase promo request failed for ${code}.`);
    }
  } catch (error) {
    console.error(`PlusBase promo request failed for ${code}.`, error);
  }
}

export async function POST(request: NextRequest) {
  const token = crypto.randomUUID();
  const body = (await request.json().catch(() => ({}))) as CheckoutPrepareBody;
  const quantity = Math.max(1, Math.round(Number(body.quantity) || 1));
  const manualPromo = getManualPromoFromCart(body.cart);
  const fallbackProductLine = body.cart?.lines.find(
    (line) => line.type !== "gift" && PLUSBASE_PRODUCTS[line.productId],
  );
  const fallbackProductId = fallbackProductLine?.productId ?? "buudy-led-mask";
  const fallbackQuantity = fallbackProductLine?.quantity ?? quantity;
  const requestedMaskQuantity = body.cart?.lines
    ? (body.cart.lines.find(
        (line) => line.type !== "gift" && line.productId === "buudy-led-mask",
      )?.quantity ?? 0)
    : quantity;
  const fallbackCodes = [
    ...(requestedMaskQuantity > 0 ? [freeGiftCode] : []),
    ...(manualPromo ? [manualPromo] : []),
  ];

  try {
    const checkout = await createPlusbaseCheckout(quantity, body.attribution, body.cart);
    if (checkout.hasMask && manualPromo) {
      await attemptManualPromo(checkout.checkoutToken, manualPromo);
    }
    const discountCodes = [
      ...(checkout.hasMask ? [freeGiftCode] : []),
      ...(manualPromo ? [manualPromo] : []),
    ];
    return NextResponse.json({
      checkoutToken: checkout.checkoutToken,
      checkoutUrl: appendParamsToUrl(
        checkout.checkoutUrl,
        cleanAttribution(body.attribution),
        discountCodes,
      ),
    });
  } catch (error) {
    console.error("Direct PlusBase checkout creation failed", error);
  }

  return NextResponse.json({
    checkoutToken: token,
    checkoutUrl: buildPlusbaseCheckoutUrl({
      checkoutRef: token,
      quantity: fallbackQuantity,
      giftQuantity: requestedMaskQuantity,
      productId: fallbackProductId,
      discountCodes: fallbackCodes,
      extraParams: cleanAttribution(body.attribution),
    }),
  });
}
