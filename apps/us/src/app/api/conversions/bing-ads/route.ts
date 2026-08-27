import { NextResponse, type NextRequest } from "next/server";
import { fetchRecentPlusbaseOrders, extractMsclkidFromOrder } from "@/lib/shopbase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The offline conversion action created in Microsoft Advertising.
const CONVERSION_NAME = "US - Purchase";
// How far back to include paid orders. Microsoft accepts msclkid conversions
// up to 90 days after the click; 30 days keeps the feed small and is safely
// inside the window. Re-sending the same orders daily is idempotent because
// Microsoft de-duplicates on (Microsoft Click Id + Conversion Name + Conversion Time).
const LOOKBACK_DAYS = 30;

/**
 * Microsoft Advertising's bulk offline-conversion CSV expects the Conversion
 * Time as `M/D/YYYY h:mm:ss AM/PM` in the timezone declared by the
 * `Parameters:TimeZone` line. We declare +0000 (UTC) and format the order's
 * created_at in UTC so the declared zone and the value always agree.
 * Example: 6/30/2026 2:45:49 PM
 */
function formatMicrosoftTimeUtc(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";

  const pad = (n: number) => String(n).padStart(2, "0");
  const month = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();

  let hours = d.getUTCHours();
  const minutes = d.getUTCMinutes();
  const seconds = d.getUTCSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;

  return `${month}/${day}/${year} ${hours}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
}

export async function GET(request: NextRequest) {
  const configuredSecret = process.env.CRON_SECRET;
  const providedSecret = request.nextUrl.searchParams.get("secret");

  if (!configuredSecret) {
    return new NextResponse("CRON_SECRET is not configured.", { status: 500 });
  }

  if (providedSecret !== configuredSecret) {
    return new NextResponse("Unauthorized request.", { status: 401 });
  }

  const createdAtMin = new Date(
    Date.now() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();

  try {
    const orders = await fetchRecentPlusbaseOrders({
      createdAtMin,
      limit: 250,
    });

    const seen = new Set<string>();
    const dataRows: string[] = [];

    for (const order of orders) {
      const msclkid = extractMsclkidFromOrder(order);
      if (!msclkid) continue;

      const conversionTime = formatMicrosoftTimeUtc(order.created_at);
      if (!conversionTime) continue;

      const value = Number(order.total_price);
      const conversionValue = Number.isFinite(value) ? value.toFixed(2) : "0.00";
      const currency = (order.currency || "USD").toUpperCase();

      // Idempotency: Microsoft de-duplicates on (click id + name + time).
      // Guard against the same order appearing twice in one feed as well.
      const dedupeKey = `${msclkid}|${conversionTime}`;
      if (seen.has(dedupeKey)) continue;
      seen.add(dedupeKey);

      dataRows.push(
        [msclkid, CONVERSION_NAME, conversionTime, conversionValue, currency].join(","),
      );
    }

    // Exact format Microsoft Advertising's offline-conversion import expects.
    const csvContent = [
      "Parameters:TimeZone=+0000",
      "Microsoft Click Id,Conversion Name,Conversion Time,Conversion Value,Conversion Currency",
      ...dataRows,
    ].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=bing-ads-conversions.csv",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Failed to generate Bing Ads CSV feed", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Failed to generate feed",
      { status: 500 },
    );
  }
}
