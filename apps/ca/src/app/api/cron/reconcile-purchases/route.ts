import { NextResponse, type NextRequest } from "next/server";
import { requireCronAuthorization } from "@/lib/conversions/config";
import { reconcilePurchaseConversions } from "@/lib/conversions/reconcile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  try {
    requireCronAuthorization(request.headers.get("authorization"));
    const dryRun = request.nextUrl.searchParams.get("dry_run") === "1";
    const summary = await reconcilePurchaseConversions({ dryRun });
    return NextResponse.json({ ok: summary.failed === 0, ...summary });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Purchase reconciliation failed.";
    return NextResponse.json(
      { ok: false, error: message },
      { status: message === "Unauthorized cron request." ? 401 : 500 },
    );
  }
}
