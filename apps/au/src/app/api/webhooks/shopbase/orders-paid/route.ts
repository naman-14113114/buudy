import { NextResponse, type NextRequest } from "next/server";
import {
  describeMicrosoftPurchaseOrder,
  getWebhookOrder,
  sendMicrosoftPurchase,
  verifyShopbaseWebhook,
} from "@/lib/microsoft-ads/capi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 10;

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const providedHmac = request.headers.get("x-shopbase-hmac-sha256");

  if (!verifyShopbaseWebhook(rawBody, providedHmac)) {
    return NextResponse.json(
      { ok: false, error: "Invalid ShopBase webhook signature." },
      { status: 401 },
    );
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const order = getWebhookOrder(payload);
  if (!order) {
    return NextResponse.json(
      { ok: false, error: "Invalid ShopBase order payload." },
      { status: 400 },
    );
  }

  try {
    const result = await sendMicrosoftPurchase(order);
    const orderSummary = describeMicrosoftPurchaseOrder(order);

    console.info("Microsoft Shopping conversion-order webhook processed", {
      ...orderSummary,
      result: result.status,
    });

    return NextResponse.json({ ok: true, result: result.status });
  } catch (error) {
    console.error(
      "Microsoft Shopping purchase event failed",
      describeMicrosoftPurchaseOrder(order),
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json(
      { ok: false, error: "Microsoft purchase delivery failed." },
      { status: 502 },
    );
  }
}
