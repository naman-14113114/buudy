import { NextResponse, type NextRequest } from "next/server";
import { buildPlusbaseCheckoutUrl } from "@/lib/site";
import {
  attributionKeys,
  buildPlusbaseAttributionProperties,
  normalizeAttribution,
  type Attribution,
} from "@/lib/conversions/attribution";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const plusbaseOrigin = "https://buudy.com";
const maskProductId = 1000000667637100;
const maskVariantId = 1000020458546865;
const torchProductId = 1000000667833423;
const torchVariantId = 1000020464156156;

type CheckoutPrepareBody = {
  customerEmail?: string;
  quantity?: number;
  attribution?: Record<string, string | null | undefined>;
};

function bridgeParams(attribution: CheckoutPrepareBody["attribution"]) {
  const params: Record<string, string> = {};
  attributionKeys.forEach((key) => {
    const value = attribution?.[key];
    if (value) params[key] = String(value).slice(0, 500);
  });
  return params;
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
  if (!setCookies.length) return current;
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
    if (name && pair) cookieMap.set(name, pair);
  });
  return Array.from(cookieMap.values()).join("; ");
}

async function createPlusbaseCheckout(
  quantity: number,
  attribution: Attribution,
) {
  let cookie = "";
  const createResponse = await fetch(
    `${plusbaseOrigin}/api/checkout/next/cart.json`,
    { method: "POST", headers: { accept: "application/json" } },
  );
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
    const messages = Array.isArray(json?.messages) ? json.messages : [];
    if (!response.ok || json?.code !== 0 || !json?.result || messages.length) {
      throw new Error(
        `Could not add item to PlusBase cart${
          messages.length ? `: ${messages.join(", ")}` : "."
        }`,
      );
    }
  }

  await addItem(
    maskProductId,
    maskVariantId,
    quantity,
    buildPlusbaseAttributionProperties(attribution),
  );
  await addItem(torchProductId, torchVariantId, quantity);
  return {
    checkoutToken,
    checkoutUrl: `${plusbaseOrigin}/checkouts/${checkoutToken}?discount=FREE_BUNDLE_CA`,
  };
}

export async function POST(request: NextRequest) {
  const token = crypto.randomUUID();
  const body = (await request.json().catch(() => ({}))) as CheckoutPrepareBody;
  const quantity = Math.max(1, Math.round(Number(body.quantity) || 1));
  const attribution = normalizeAttribution(body.attribution);
  try {
    const checkout = await createPlusbaseCheckout(quantity, attribution);
    return NextResponse.json(checkout);
  } catch (error) {
    console.error("Direct PlusBase checkout creation failed", error);
  }
  return NextResponse.json({
    checkoutToken: token,
    checkoutUrl: buildPlusbaseCheckoutUrl({
      checkoutRef: token,
      quantity,
      giftQuantity: quantity,
      extraParams: { ...bridgeParams(attribution), discount: "FREE_BUNDLE_CA" },
    }),
  });
}
