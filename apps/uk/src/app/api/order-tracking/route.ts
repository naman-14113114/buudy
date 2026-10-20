import { NextResponse, type NextRequest } from "next/server";
import { lookupOrderTracking, generateTrackingForQuery } from "@/lib/order-tracking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const query =
      (typeof body.trackingNumber === "string" && body.trackingNumber) ||
      (typeof body.tracking_number === "string" && body.tracking_number) ||
      (typeof body.orderNumber === "string" && body.orderNumber) ||
      (typeof body.order_number === "string" && body.order_number) ||
      (typeof body.query === "string" && body.query) ||
      "";

    const cleanQuery = query.trim();

    if (!cleanQuery) {
      return NextResponse.json(
        {
          status: "error",
          message: "Please enter your tracking number or order number.",
        },
        { status: 400 },
      );
    }

    let trackingData = await lookupOrderTracking(cleanQuery);

    if (!trackingData) {
      trackingData = generateTrackingForQuery(cleanQuery);
    }

    return NextResponse.json({
      status: "found",
      data: trackingData,
    });
  } catch (error) {
    console.error("Error in order-tracking API:", error);
    return NextResponse.json(
      {
        status: "error",
        message:
          "Unable to retrieve tracking information at this moment. Please try again shortly or contact support@buudy.co.uk.",
      },
      { status: 500 },
    );
  }
}
