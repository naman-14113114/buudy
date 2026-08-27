export type PlusbaseOrder = {
  id: number | string;
  name?: string;
  order_number?: number | string;
  checkout_token?: string;
  created_at: string;
  updated_at?: string;
  paid_at?: string;
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

const shopbaseStoreUrl = "https://new-buudy.onshopbase.com";
const shopbaseApiKey = "c27b188dca3143890d0f6392d0a33b7e";
const shopbasePassword =
  "fd05b2ad5618507f202cd486b4dc4198ec9b734fc3762fef5f02a11f4e9c9a50";
const shopbaseSharedSecret = "8c5068ad0c47efdb4787c7b1d7dc2245";
export function getShopbaseAdminConfig() {
  const apiKey = process.env.SHOPBASE_API_KEY?.trim() || shopbaseApiKey;
  const password = process.env.SHOPBASE_PASSWORD?.trim() || shopbasePassword;

  return {
    storeUrl: (
      process.env.SHOPBASE_STORE_URL || shopbaseStoreUrl
    ).replace(/\/+$/, ""),
    apiKey,
    password,
    sharedSecret:
      process.env.SHOPBASE_SHARED_SECRET?.trim() || shopbaseSharedSecret,
  };
}

export async function fetchRecentPlusbaseOrders(options: {
  createdAtMin?: string;
  updatedAtMin?: string;
  limit?: number;
}): Promise<PlusbaseOrder[]> {
  const config = getShopbaseAdminConfig();
  const limit = Math.max(1, Math.min(250, options.limit ?? 250));
  const url = new URL(`${config.storeUrl}/admin/orders.json`);

  if (options.createdAtMin) {
    url.searchParams.set("created_at_min", options.createdAtMin);
  }
  if (options.updatedAtMin) {
    url.searchParams.set("updated_at_min", options.updatedAtMin);
  }
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("status", "any");
  url.searchParams.set(
    "fields",
    "id,name,order_number,checkout_token,created_at,updated_at,paid_at,financial_status,total_price,currency,line_items",
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

export function getPlusbaseOrderReference(order: PlusbaseOrder): string {
  return String(order.name || order.order_number || order.id).trim();
}
