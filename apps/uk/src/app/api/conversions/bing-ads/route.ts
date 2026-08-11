import { NextResponse, type NextRequest } from "next/server";
import { fetchRecentPlusbaseOrders, extractMsclkidFromOrder } from "@/lib/shopbase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const configuredSecret = process.env.CRON_SECRET;
  const providedSecret = request.nextUrl.searchParams.get("secret");

  if (!configuredSecret) {
    return new NextResponse("CRON_SECRET is not configured.", { status: 500 });
  }

  if (providedSecret !== configuredSecret) {
    return new NextResponse("Unauthorized request.", { status: 401 });
  }

  // Look back up to 30 days for recent paid orders
  const lookbackDays = 30;
  const createdAtMin = new Date(
    Date.now() - lookbackDays * 24 * 60 * 60 * 1000,
  ).toISOString();

  try {
    const orders = await fetchRecentPlusbaseOrders({
      createdAtMin,
      limit: 250, 
    });

    const csvHeaders = [
      "Microsoft Click ID",
      "Conversion Name",
      "Conversion Time",
      "Conversion Value",
      "Conversion Currency",
    ];
    const conversionName = "UK - Purchase"; 

    const rows = orders.map((order) => {
      const msclkid = extractMsclkidFromOrder(order);
      if (!msclkid) return null;

      const conversionTime = order.created_at;

      return [
        msclkid,
        conversionName,
        conversionTime,
        order.total_price, 
        order.currency,
      ].join(",");
    });

    const validRows = rows.filter(Boolean);
    const csvContent = [csvHeaders.join(","), ...validRows].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=bing-ads-conversions.csv",
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
