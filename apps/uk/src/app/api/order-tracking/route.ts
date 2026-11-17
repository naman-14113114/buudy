import { NextResponse, type NextRequest } from "next/server";
import { lookupOrderTracking, TrackingUnavailableError } from "@/lib/order-tracking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "private, no-store, max-age=0" } });
}

export async function POST(request: NextRequest) {
  try {
    const parsed: unknown = await request.json().catch(() => null);
    const body = parsed && typeof parsed === "object" ? parsed as Record<string, unknown> : {};
    const query =
      (typeof body.tracking === "string" && body.tracking) ||
      (typeof body.trackingNumber === "string" && body.trackingNumber) ||
      (typeof body.tracking_number === "string" && body.tracking_number) ||
      (typeof body.order === "string" && body.order) ||
      (typeof body.orderNumber === "string" && body.orderNumber) ||
      (typeof body.order_number === "string" && body.order_number) ||
      (typeof body.orderId === "string" && body.orderId) ||
      (typeof body.order_id === "string" && body.order_id) ||
      (typeof body.q === "string" && body.q) ||
      (typeof body.query === "string" && body.query) ||
      "";

    const cleanQuery = query.trim();

    if (!cleanQuery || cleanQuery.length > 100) {
      return json(
        {
          status: "error",
          message: "Please enter a tracking number or order number of up to 100 characters.",
        },
        400,
      );
    }

    const trackingData = await lookupOrderTracking(cleanQuery);

    if (!trackingData) {
      return json(
        {
          status: "not_found",
          message:
            "No Buudy order found matching this tracking number or order reference. Please check your number from your order confirmation email and try again.",
        },
        404,
      );
    }

    return json({
      status: "found",
      data: trackingData,
    });
  } catch (error) {
    console.error("Order tracking request failed", error instanceof TrackingUnavailableError ? "carrier unavailable" : "unexpected error");
    return json(
      {
        status: "error",
        message:
          "Unable to retrieve tracking information at this moment. Please try again shortly or contact support@buudy.co.uk.",
      },
      error instanceof TrackingUnavailableError ? 503 : 500,
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query =
      searchParams.get("tracking") ||
      searchParams.get("trackingNumber") ||
      searchParams.get("tracking_number") ||
      searchParams.get("order") ||
      searchParams.get("orderNumber") ||
      searchParams.get("order_number") ||
      searchParams.get("orderId") ||
      searchParams.get("order_id") ||
      searchParams.get("q") ||
      searchParams.get("query") ||
      "";

    const cleanQuery = query.trim();

    if (!cleanQuery || cleanQuery.length > 100) {
      return json(
        {
          status: "error",
          message: "Please enter a tracking number or order number of up to 100 characters.",
        },
        400,
      );
    }

    const trackingData = await lookupOrderTracking(cleanQuery);

    if (!trackingData) {
      return json(
        {
          status: "not_found",
          message:
            "No Buudy order found matching this tracking number or order reference. Please check your number from your order confirmation email and try again.",
        },
        404,
      );
    }

    return json({
      status: "found",
      data: trackingData,
    });
  } catch (error) {
    console.error("Order tracking request failed", error instanceof TrackingUnavailableError ? "carrier unavailable" : "unexpected error");
    return json(
      {
        status: "error",
        message:
          "Unable to retrieve tracking information at this moment. Please try again shortly or contact support@buudy.co.uk.",
      },
      error instanceof TrackingUnavailableError ? 503 : 500,
    );
  }
}
