import { NextResponse, type NextRequest } from "next/server";
import { plusbaseStoreUrl } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AnyRecord = Record<string, unknown>;
type TrackingEvent = { label: string; description?: string; date?: string };

const trackingPage = `${plusbaseStoreUrl}/pages/order-tracking`;

function isRecord(value: unknown): value is AnyRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asText(value: unknown) {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

function captchaHeader() {
  return Buffer.from(JSON.stringify({ service: "hcaptcha", challenge: "" })).toString("base64");
}

function findDeep(value: unknown, keys: string[], depth = 0): string {
  if (depth > 8 || value == null) return "";

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findDeep(item, keys, depth + 1);
      if (found) return found;
    }
    return "";
  }

  if (!isRecord(value)) return "";

  for (const key of keys) {
    const found = asText(value[key]);
    if (found) return found;
  }

  for (const child of Object.values(value)) {
    const found = findDeep(child, keys, depth + 1);
    if (found) return found;
  }

  return "";
}

function findEvents(value: unknown, depth = 0): TrackingEvent[] {
  if (depth > 8 || value == null) return [];

  if (Array.isArray(value)) {
    const events = value
      .map((item): TrackingEvent | null => {
        if (!isRecord(item)) return null;
        const label =
          findDeep(item, ["status", "title", "checkpoint_status"], 0) ||
          findDeep(item, ["message", "description", "checkpoint_message"], 0);
        if (!label) return null;

        return {
          label,
          description: findDeep(item, ["description", "message", "location", "checkpoint_location"]),
          date: findDeep(item, ["date", "created_at", "updated_at", "checkpoint_time", "time"]),
        };
      })
      .filter((event): event is TrackingEvent => Boolean(event));

    if (events.length >= 2) return events.slice(0, 6);

    for (const item of value) {
      const found = findEvents(item, depth + 1);
      if (found.length) return found;
    }
    return [];
  }

  if (!isRecord(value)) return [];

  for (const child of Object.values(value)) {
    const found = findEvents(child, depth + 1);
    if (found.length) return found;
  }

  return [];
}

function normalizeOrder(value: unknown) {
  const order = asText(value);
  return order && !order.startsWith("#") ? `#${order}` : order;
}

function errorMessage(code: string) {
  if (code === "email_not_matched") {
    return "That email does not match the order number. Use the exact email from the Buudy checkout confirmation.";
  }
  if (code === "order_not_found" || code === "not_found") {
    return "No matching Buudy order was found. Check the order number from your confirmation email and try again.";
  }
  if (code === "email_invalid_format") return "Enter a valid email address.";
  return "We could not verify that order right now. Please try again or contact support@buudy.com.";
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as AnyRecord;
  const orderName = normalizeOrder(body.orderNumber ?? body.order_name);
  const email = asText(body.email).toLowerCase();

  if (!orderName || !email) {
    return NextResponse.json(
      { status: "error", message: "Enter both your order number and email." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ status: "error", message: "Enter a valid email address." }, { status: 400 });
  }

  let lookup: Response;
  try {
    lookup = await fetch(`${plusbaseStoreUrl}/api/checkout/order-status/url.json`, {
      method: "POST",
      cache: "no-store",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        origin: plusbaseStoreUrl,
        referer: trackingPage,
        "user-agent": "Mozilla/5.0 BuudyOrderTracking/1.0",
        "x-sb-captcha": captchaHeader(),
      },
      body: JSON.stringify({ order_name: orderName, email }),
    });
  } catch {
    return NextResponse.json(
      { status: "error", message: "We could not reach Buudy tracking right now. Please try again." },
      { status: 502 },
    );
  }

  const lookupJson = (await lookup.json().catch(() => ({}))) as AnyRecord;

  if (!lookup.ok) {
    const code = asText(lookupJson.error) || asText(lookupJson.code) || "not_found";
    return NextResponse.json(
      { status: "not_found", code, message: errorMessage(code) },
      { status: lookup.status === 404 ? 404 : 502 },
    );
  }

  const result = isRecord(lookupJson.result) ? lookupJson.result : {};
  const token = asText(result.token);
  const accessKey = asText(result.access_key);

  if (!token || !accessKey) {
    return NextResponse.json(
      { status: "error", message: "Buudy found the order, but did not return a secure status token." },
      { status: 502 },
    );
  }

  const officialOrderUrl = `${plusbaseStoreUrl}/orders/${encodeURIComponent(token)}`;
  const info = await fetch(
    `${plusbaseStoreUrl}/api/checkout/order-status/${encodeURIComponent(token)}/next/info.json?key=${encodeURIComponent(accessKey)}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        accept: "application/json",
        referer: officialOrderUrl,
        "user-agent": "Mozilla/5.0 BuudyOrderTracking/1.0",
      },
    },
  );

  const infoJson = (await info.json().catch(() => ({}))) as AnyRecord;
  const infoRoot = isRecord(infoJson.result) ? infoJson.result : infoJson;
  const trackingEvents = findEvents(infoRoot);
  const trackingNumber = findDeep(infoRoot, [
    "tracking_number",
    "trackingNumber",
    "tracking_no",
    "tracking_code",
    "tracking_id",
    "trackingId",
  ]);
  const trackingUrl = findDeep(infoRoot, ["tracking_url", "trackingUrl", "tracking_link", "trackingLink"]);
  const carrier = findDeep(infoRoot, [
    "carrier",
    "carrier_name",
    "carrierName",
    "tracking_company",
    "shipping_carrier",
  ]);
  const shipmentStatus =
    findDeep(infoRoot, ["fulfillment_status", "shipment_status", "shipping_status", "status", "financial_status"]) ||
    "Order found";
  const orderId = findDeep(infoRoot, ["name", "order_name", "order_number", "orderNumber"]) || orderName;
  const trackingAvailable = Boolean(trackingNumber || trackingUrl || trackingEvents.length);

  return NextResponse.json({
    status: "found",
    orderId,
    shipmentStatus,
    carrier: carrier || null,
    trackingNumber: trackingNumber || null,
    trackingUrl: trackingUrl || null,
    officialOrderUrl,
    trackingEvents,
    trackingAvailable,
    message: trackingAvailable
      ? "Real tracking details found from Buudy checkout."
      : "Order found. Carrier tracking has not been assigned yet, or it is still updating in the carrier system.",
  });
}
