import { NextResponse, type NextRequest } from "next/server";
import { uploadPaidPlusbaseOrder } from "@/lib/conversions/reconcile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function providedSecret(request: NextRequest) {
  return (
    request.headers.get("x-buudy-webhook-secret") ??
    request.headers.get("x-shopbase-webhook-secret") ??
    request.nextUrl.searchParams.get("secret")
  );
}

export async function POST(request: NextRequest) {
  const configuredSecret = process.env.PLUSBASE_WEBHOOK_SECRET;
  if (!configuredSecret) {
    return NextResponse.json(
      { ok: false, error: "PLUSBASE_WEBHOOK_SECRET is not configured." },
      { status: 500 },
    );
  }
  if (providedSecret(request) !== configuredSecret) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized webhook." },
      { status: 401 },
    );
  }
  const payload = await request.json().catch(() => null);
  if (!payload || typeof payload !== "object") {
    return NextResponse.json(
      { ok: false, error: "Webhook body must be valid JSON." },
      { status: 400 },
    );
  }
  try {
    const order =
      "order" in payload && payload.order && typeof payload.order === "object"
        ? payload.order
        : payload;
    const result = await uploadPaidPlusbaseOrder(order);
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error("PlusBase Google Ads purchase upload failed", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Purchase upload failed.",
      },
      { status: 500 },
    );
  }
}
