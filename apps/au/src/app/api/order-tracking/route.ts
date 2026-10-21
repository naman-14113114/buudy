import { NextResponse, type NextRequest } from "next/server";
import { lookupOrderTracking } from "@/lib/order-tracking";

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

    const trackingData = await lookupOrderTracking(cleanQuery);

    if (!trackingData) {
      return NextResponse.json(
        {
          status: "not_found",
          message:
            "No Buudy order found matching this tracking number or order reference. Please check your number from your order confirmation email and try again.",
        },
        { status: 404 },
      );
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
          "Unable to retrieve tracking information at this moment. Please try again shortly or contact support@buudy.com.",
      },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query =
      searchParams.get("trackingNumber") ||
      searchParams.get("tracking_number") ||
      searchParams.get("orderNumber") ||
      searchParams.get("order_number") ||
      searchParams.get("query") ||
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

    const trackingData = await lookupOrderTracking(cleanQuery);

    if (!trackingData) {
      return NextResponse.json(
        {
          status: "not_found",
          message:
            "No Buudy order found matching this tracking number or order reference. Please check your number from your order confirmation email and try again.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      status: "found",
      data: trackingData,
    });
  } catch (error) {
    console.error("Error in order-tracking GET API:", error);
    return NextResponse.json(
      {
        status: "error",
        message:
          "Unable to retrieve tracking information at this moment. Please try again shortly or contact support@buudy.com.",
      },
      { status: 500 },
    );
  }
}
