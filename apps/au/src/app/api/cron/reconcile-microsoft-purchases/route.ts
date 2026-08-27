import { NextResponse, type NextRequest } from "next/server";
import { reconcileMicrosoftPurchases } from "@/lib/microsoft-ads/reconcile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET?.trim();
  return Boolean(
    secret && request.headers.get("authorization") === `Bearer ${secret}`,
  );
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const summary = await reconcileMicrosoftPurchases();
    return NextResponse.json({ ok: true, ...summary });
  } catch (error) {
    console.error(
      "Microsoft Shopping purchase reconciliation failed",
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json(
      { ok: false, error: "Purchase reconciliation failed." },
      { status: 500 },
    );
  }
}
