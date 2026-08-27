import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import {
  extractMsclkidFromOrder,
  getPlusbaseOrderReference,
  getShopbaseAdminConfig,
  type PlusbaseOrder,
} from "@/lib/shopbase";

const MICROSOFT_CAPI_ORIGIN = "https://capi.uet.microsoft.com";
const MICROSOFT_SHOPPING_UET_TAG_ID = "355060364";
const MICROSOFT_SHOPPING_CAPI_TOKEN =
  "2274c80c-0548-429a-906e-52553e564beb";
const PURCHASE_EVENT_NAME = "purchase";
const MAX_EVENT_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const CONVERSION_FINANCIAL_STATUSES = new Set(["authorized", "paid"]);

type MicrosoftCapiEvent = {
  eventType: "custom";
  eventId: string;
  eventName: typeof PURCHASE_EVENT_NAME;
  eventTime: number;
  userData: {
    msclkid: string;
  };
  customData: {
    transactionId: string;
    value: number;
    currency: string;
    pageType: "purchase";
    ecommTotalValue: number;
  };
};

export type MicrosoftPurchaseBuildResult =
  | { status: "ready"; event: MicrosoftCapiEvent }
  | {
      status:
        | "not_authorized_or_paid"
        | "missing_msclkid"
        | "invalid_order"
        | "stale";
    };

export type MicrosoftPurchaseSendResult =
  | { status: "sent"; eventId: string }
  | {
      status:
        | "not_authorized_or_paid"
        | "missing_msclkid"
        | "invalid_order"
        | "stale";
    };

function getMicrosoftCapiConfig() {
  return {
    tagId: MICROSOFT_SHOPPING_UET_TAG_ID,
    token: MICROSOFT_SHOPPING_CAPI_TOKEN,
  };
}

function getOrderEventTime(order: PlusbaseOrder) {
  const raw = order.paid_at || order.updated_at || order.created_at;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function normalizeCurrency(currency: string) {
  const normalized = currency.trim().toUpperCase();
  return /^[A-Z]{3}$/.test(normalized) ? normalized : null;
}

export function buildMicrosoftPurchaseEvent(
  order: PlusbaseOrder,
  now = new Date(),
): MicrosoftPurchaseBuildResult {
  const financialStatus = order.financial_status?.trim().toLowerCase();
  if (!CONVERSION_FINANCIAL_STATUSES.has(financialStatus)) {
    return { status: "not_authorized_or_paid" };
  }

  const msclkid = extractMsclkidFromOrder(order)?.trim();
  if (!msclkid) {
    return { status: "missing_msclkid" };
  }

  const total = Number(order.total_price);
  const currency = normalizeCurrency(order.currency || "");
  const eventDate = getOrderEventTime(order);
  if (
    !Number.isFinite(total) ||
    total < 0 ||
    !currency ||
    !eventDate ||
    order.id == null
  ) {
    return { status: "invalid_order" };
  }

  const ageMs = now.getTime() - eventDate.getTime();
  if (ageMs > MAX_EVENT_AGE_MS || ageMs < -5 * 60 * 1000) {
    return { status: "stale" };
  }

  const transactionId = String(order.id);
  return {
    status: "ready",
    event: {
      eventType: "custom",
      eventId: `buudy-uk-plusbase-${transactionId}`,
      eventName: PURCHASE_EVENT_NAME,
      eventTime: Math.floor(eventDate.getTime() / 1000),
      userData: {
        msclkid: msclkid.slice(0, 255),
      },
      customData: {
        transactionId,
        value: Number(total.toFixed(2)),
        currency,
        pageType: "purchase",
        ecommTotalValue: Number(total.toFixed(2)),
      },
    },
  };
}

async function sendMicrosoftCapiEvents(events: MicrosoftCapiEvent[]) {
  if (!events.length) {
    return;
  }

  const config = getMicrosoftCapiConfig();
  const response = await fetch(
    `${MICROSOFT_CAPI_ORIGIN}/v1/${encodeURIComponent(config.tagId)}/events`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${config.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ data: events }),
      cache: "no-store",
      signal: AbortSignal.timeout(4_000),
    },
  );

  if (!response.ok) {
    const responseText = await response.text().catch(() => "");
    throw new Error(
      `Microsoft CAPI request failed (${response.status}): ${responseText.slice(0, 500)}`,
    );
  }
}

export async function sendMicrosoftPurchase(
  order: PlusbaseOrder,
): Promise<MicrosoftPurchaseSendResult> {
  const built = buildMicrosoftPurchaseEvent(order);
  if (built.status !== "ready") {
    return built;
  }

  await sendMicrosoftCapiEvents([built.event]);
  return { status: "sent", eventId: built.event.eventId };
}

export async function sendMicrosoftPurchases(events: MicrosoftCapiEvent[]) {
  const uniqueEvents = Array.from(
    new Map(events.map((event) => [event.eventId, event])).values(),
  );
  await sendMicrosoftCapiEvents(uniqueEvents);
  return uniqueEvents.length;
}

export function getShopbaseWebhookSecret() {
  return (
    process.env.SHOPBASE_WEBHOOK_SECRET?.trim() ||
    getShopbaseAdminConfig().sharedSecret
  );
}

export function verifyShopbaseWebhook(
  rawBody: string,
  providedHmac: string | null,
  secret = getShopbaseWebhookSecret(),
) {
  if (!providedHmac || !secret) {
    return false;
  }

  const expected = createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("base64");
  const expectedBuffer = Buffer.from(expected, "utf8");
  const providedBuffer = Buffer.from(providedHmac.trim(), "utf8");

  return (
    expectedBuffer.length === providedBuffer.length &&
    timingSafeEqual(expectedBuffer, providedBuffer)
  );
}

export function getWebhookOrder(payload: unknown): PlusbaseOrder | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const record = payload as Record<string, unknown>;
  const candidate =
    record.order && typeof record.order === "object" ? record.order : record;
  const order = candidate as Partial<PlusbaseOrder>;

  if (order.id == null || !order.created_at || !order.financial_status) {
    return null;
  }

  return order as PlusbaseOrder;
}

export function describeMicrosoftPurchaseOrder(order: PlusbaseOrder) {
  return {
    id: String(order.id),
    reference: getPlusbaseOrderReference(order),
  };
}
