export type PlusbaseOrder = {
  id: number;
  created_at: string;
  financial_status: string;
  total_price: string;
  currency: string;
  line_items?: Array<{
    id: number;
    product_id: number;
    variant_id: number;
    price: string;
    quantity: number;
    properties?: Array<{ name: string; value: string }>;
  }>;
};

export function getShopbaseAdminConfig() {
  const apiKey = process.env.SHOPBASE_API_KEY?.trim();
  const password = process.env.SHOPBASE_PASSWORD?.trim();

  if (!apiKey || !password) {
    throw new Error("Missing SHOPBASE_API_KEY or SHOPBASE_PASSWORD.");
  }

  return {
    storeUrl: (
      process.env.SHOPBASE_STORE_URL || "https://buudy.onshopbase.com"
    ).replace(/\/+$/, ""),
    apiKey,
    password,
  };
}

export async function fetchRecentPlusbaseOrders(options: {
  createdAtMin: string;
  limit?: number;
}): Promise<PlusbaseOrder[]> {
  const config = getShopbaseAdminConfig();
  const limit = Math.max(1, Math.min(250, options.limit ?? 250));
  const url = new URL(`${config.storeUrl}/admin/orders.json`);

  url.searchParams.set("created_at_min", options.createdAtMin);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("financial_status", "paid");
  url.searchParams.set(
    "fields",
    "id,created_at,financial_status,total_price,currency,line_items",
  );

  const auth = Buffer.from(`${config.apiKey}:${config.password}`).toString(
    "base64",
  );

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: `Basic ${auth}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`ShopBase API error: ${response.status} ${text}`);
  }

  const json = await response.json();
  return Array.isArray(json.orders) ? json.orders : [];
}

export function extractMsclkidFromOrder(order: PlusbaseOrder): string | null {
  if (!order.line_items) return null;

  for (const item of order.line_items) {
    if (!item.properties) continue;
    
    const prop = item.properties.find((p) => p.name === "_blfm_msclkid");
    if (prop && prop.value) {
      return prop.value;
    }
  }

  return null;
}
