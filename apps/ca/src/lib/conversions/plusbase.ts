import {
  attributionKeys,
  normalizeAttribution,
  type Attribution,
} from "./attribution";

const maskProductId = 1000000664830560;
const maskVariantId = 1000020374538805;
export const googleAdsUploadTag = "google_ads_purchase_uploaded";

export type PlusbaseLineItem = {
  product_id?: number | string | null;
  variant_id?: number | string | null;
  quantity?: number | string | null;
  properties?: Array<{ name?: string | null; value?: string | null }> | null;
};

export type PlusbaseOrder = {
  id?: number | string | null;
  name?: string | null;
  order_number?: string | number | null;
  checkout_token?: string | null;
  financial_status?: string | null;
  currency?: string | null;
  total_price?: number | string | null;
  paid_at?: string | null;
  created_at?: string | null;
  line_items?: PlusbaseLineItem[] | null;
  tags?: string | null;
};

export function getPlusbaseCheckoutReference(order: PlusbaseOrder) {
  return typeof order.checkout_token === "string"
    ? order.checkout_token.trim()
    : "";
}

export function isPaidPlusbaseOrder(order: PlusbaseOrder) {
  return (
    getPlusbaseCheckoutReference(order).length > 0 &&
    order.financial_status?.toLowerCase() === "paid"
  );
}

export function hasGoogleAdsUploadTag(order: PlusbaseOrder) {
  return String(order.tags || "")
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .includes(googleAdsUploadTag);
}

export function getPlusbaseOrderAttribution(order: PlusbaseOrder): Attribution {
  const maskLine = (order.line_items ?? []).find(
    (line) =>
      Number(line.product_id) === maskProductId ||
      Number(line.variant_id) === maskVariantId,
  );
  const raw: Record<string, unknown> = {};
  (maskLine?.properties ?? []).forEach((property) => {
    const name = property.name?.trim();
    const value = property.value?.trim();
    if (!name?.startsWith("_blfm_") || !value) return;
    const key = name.slice("_blfm_".length);
    if ((attributionKeys as readonly string[]).includes(key)) raw[key] = value;
  });
  return normalizeAttribution(raw);
}

function toFiniteNumber(value: number | string | null | undefined) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function summarizePaidPlusbaseOrder(order: PlusbaseOrder) {
  if (!isPaidPlusbaseOrder(order) || order.id == null) return null;
  const timestamp = order.paid_at || order.created_at;
  if (!timestamp) return null;
  const paidAt = new Date(timestamp);
  if (Number.isNaN(paidAt.getTime())) return null;
  const maskQuantity = (order.line_items ?? []).reduce((quantity, line) => {
    const isMask =
      Number(line.product_id) === maskProductId ||
      Number(line.variant_id) === maskVariantId;
    return isMask
      ? quantity + Math.max(0, Math.round(toFiniteNumber(line.quantity)))
      : quantity;
  }, 0);
  const orderId = String(order.id);
  return {
    checkoutRef: getPlusbaseCheckoutReference(order),
    orderId,
    orderName: String(order.name || order.order_number || orderId),
    paidAt: paidAt.toISOString(),
    financialStatus: "paid" as const,
    orderCurrency: String(order.currency || "USD"),
    orderTotal: toFiniteNumber(order.total_price),
    maskQuantity,
  };
}
