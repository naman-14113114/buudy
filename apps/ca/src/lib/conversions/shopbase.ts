import { getShopbaseAdminConfig } from "./config";
import {
  googleAdsUploadTag,
  type PlusbaseOrder,
} from "./plusbase";

type ShopbaseOrdersResponse = {
  orders?: PlusbaseOrder[];
  data?: PlusbaseOrder[];
};

function authorization(config: ReturnType<typeof getShopbaseAdminConfig>) {
  return `Basic ${Buffer.from(`${config.apiKey}:${config.password}`).toString("base64")}`;
}

export async function fetchRecentPlusbaseOrders(options: {
  createdAtMin?: string;
  limit?: number;
} = {}) {
  const config = getShopbaseAdminConfig();
  const url = new URL("/admin/orders.json", config.storeUrl);
  url.searchParams.set("status", "any");
  url.searchParams.set("limit", String(options.limit ?? 250));
  if (options.createdAtMin) {
    url.searchParams.set("created_at_min", options.createdAtMin);
  }
  const response = await fetch(url, {
    headers: {
      Authorization: authorization(config),
      Accept: "application/json",
    },
    cache: "no-store",
  });
  const raw = await response.text();
  let body: ShopbaseOrdersResponse = {};
  try {
    body = raw ? (JSON.parse(raw) as ShopbaseOrdersResponse) : {};
  } catch {
    throw new Error(`ShopBase returned invalid JSON (${response.status}).`);
  }
  if (!response.ok) {
    throw new Error(`ShopBase order request failed (${response.status}).`);
  }
  return body.orders ?? body.data ?? [];
}

export async function markPlusbaseOrderGoogleAdsUploaded(order: PlusbaseOrder) {
  if (order.id == null) {
    throw new Error("Cannot tag a PlusBase order without an ID.");
  }
  const config = getShopbaseAdminConfig();
  const existingTags = String(order.tags || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const tags = Array.from(new Set([...existingTags, googleAdsUploadTag])).join(", ");
  const response = await fetch(
    `${config.storeUrl}/admin/orders/${encodeURIComponent(String(order.id))}.json`,
    {
      method: "PUT",
      headers: {
        Authorization: authorization(config),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order: { id: order.id, tags } }),
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new Error(`ShopBase order tag update failed (${response.status}).`);
  }
}
