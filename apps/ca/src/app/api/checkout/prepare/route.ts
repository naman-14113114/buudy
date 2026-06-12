import { NextResponse, type NextRequest } from "next/server";
import { buildPlusbaseCheckoutUrl } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const plusbaseOrigin = "https://buudy.com";
const maskProductId = 1000000611225890;
const maskVariantId = 1000019092784268;
const torchProductId = 1000000665008955;
const torchVariantId = 1000020384558655;

type CheckoutPrepareBody = {
  customerEmail?: string;
  quantity?: number;
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
];

function bridgeParams(attribution: CheckoutPrepareBody["attribution"]) {
  const params: Record<string, string> = {};

  passthroughAttributionKeys.forEach((key) => {
    const value = attribution?.[key];
    if (value) {
      params[key] = String(value).slice(0, 500);
    }
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

async function createPlusbaseCheckout(quantity: number) {
  let cookie = "";

  const createResponse = await fetch(
    `${plusbaseOrigin}/api/checkout/next/cart.json`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
      },
    },
  );
  cookie = appendCookies(cookie, createResponse);

  const createJson = await createResponse.json();
  const cartToken = createJson?.result?.token;
  const checkoutToken = createJson?.result?.checkout_token;

  if (!createResponse.ok || !cartToken || !checkoutToken) {
    throw new Error("Could not create PlusBase cart.");
  }

  async function addItem(productId: number, variantId: number, itemQuantity: number) {
    const response = await fetch(
      `${plusbaseOrigin}/api/checkout/next/cart.json?cart_token=${encodeURIComponent(
        cartToken,
      )}`,
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
            properties: [],
            metadata: {
              image_preview_id: "",
            },
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

  await addItem(maskProductId, maskVariantId, quantity);
  await addItem(torchProductId, torchVariantId, quantity);

  return {
    checkoutToken,
    checkoutUrl: `${plusbaseOrigin}/checkouts/${checkoutToken}`,
  };
}

export async function POST(request: NextRequest) {
  const token = crypto.randomUUID();
  const body = (await request.json().catch(() => ({}))) as CheckoutPrepareBody;
  const quantity = Math.max(1, Math.round(Number(body.quantity) || 1));

  try {
    const checkout = await createPlusbaseCheckout(quantity);

    return NextResponse.json({
      checkoutToken: checkout.checkoutToken,
      checkoutUrl: checkout.checkoutUrl,
    });
  } catch (error) {
    console.error("Direct PlusBase checkout creation failed", error);
  }

  return NextResponse.json({
    checkoutToken: token,
    checkoutUrl: buildPlusbaseCheckoutUrl({
      checkoutRef: token,
      quantity,
      giftQuantity: quantity,
      extraParams: bridgeParams(body.attribution),
    }),
  });
}
