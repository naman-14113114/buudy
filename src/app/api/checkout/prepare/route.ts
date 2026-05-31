import { NextResponse, type NextRequest } from "next/server";
import { buildPlusbaseCheckoutUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

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

export async function POST(request: NextRequest) {
  const token = crypto.randomUUID();
  const body = (await request.json().catch(() => ({}))) as CheckoutPrepareBody;
  const quantity = Math.max(1, Math.round(Number(body.quantity) || 1));

  const checkoutUrl = buildPlusbaseCheckoutUrl({
    checkoutRef: token,
    quantity,
    giftQuantity: quantity,
    extraParams: bridgeParams(body.attribution),
  });

  return NextResponse.json({
    checkoutToken: token,
    checkoutUrl,
  });
}
