"use server";

import { z } from "zod";
import { getProductById } from "@/data/products";
import {
  calculateCartTotals,
  normalizeCartLines,
  type CartLine,
  type CartState,
} from "@/lib/cart";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CheckoutActionState } from "@/types/actions";

const checkoutSchema = z.object({
  cartJson: z.string().min(2),
  fullName: z.string().trim().min(2, "Enter the customer name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().max(40).optional(),
  shippingLine1: z.string().trim().max(180).optional(),
  shippingLine2: z.string().trim().max(180).optional(),
  shippingCity: z.string().trim().max(80).optional(),
  shippingState: z.string().trim().max(80).optional(),
  shippingPostalCode: z.string().trim().max(40).optional(),
  shippingCountry: z.string().trim().max(80).optional(),
  marketingOptIn: z.string().optional(),
});

function generateOrderNumber() {
  const now = new Date();
  const stamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const suffix = crypto.randomUUID().slice(0, 8).toUpperCase();

  return `BUD-${stamp}-${suffix}`;
}

function parseCart(cartJson: string): CartState | null {
  try {
    const parsed = JSON.parse(cartJson) as CartState;

    return {
      lines: Array.isArray(parsed.lines) ? (parsed.lines as CartLine[]) : [],
      promoCode: typeof parsed.promoCode === "string" ? parsed.promoCode : "AUTO",
      giftMessage:
        typeof parsed.giftMessage === "string" ? parsed.giftMessage.slice(0, 300) : "",
    };
  } catch {
    return null;
  }
}

async function getSignedInUserId() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
}

export async function recordCheckoutAction(
  _state: CheckoutActionState,
  formData: FormData,
): Promise<CheckoutActionState> {
  if (!isSupabaseConfigured() || !isSupabaseAdminConfigured()) {
    return {
      status: "error",
      message:
        "Supabase order storage is not configured yet. Add Supabase env vars and run the migration before recording sales.",
    };
  }

  const parsed = checkoutSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      status: "error",
      message: "Check the highlighted checkout fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const cart = parseCart(parsed.data.cartJson);

  if (!cart) {
    return {
      status: "error",
      message: "Cart data could not be read. Refresh the page and try again.",
    };
  }

  const lines = normalizeCartLines(cart.lines);
  const productLines = lines.filter((line) => line.type === "product");

  if (productLines.length === 0) {
    return {
      status: "error",
      message: "Add a product before checkout.",
    };
  }

  const totals = calculateCartTotals(lines);
  const userId = await getSignedInUserId();
  const admin = createSupabaseAdminClient();
  const promoCodes = Array.from(
    new Set(
      productLines
        .map((line) => getProductById(line.productId)?.promoCode)
        .filter((code): code is string => Boolean(code)),
    ),
  );
  const orderNumber = generateOrderNumber();

  const { data: order, error: orderError } = await admin
    .from("orders")
    .insert({
      order_number: orderNumber,
      user_id: userId,
      customer_email: parsed.data.email,
      customer_full_name: parsed.data.fullName,
      customer_phone: parsed.data.phone || null,
      shipping_line1: parsed.data.shippingLine1 || null,
      shipping_line2: parsed.data.shippingLine2 || null,
      shipping_city: parsed.data.shippingCity || null,
      shipping_state: parsed.data.shippingState || null,
      shipping_postal_code: parsed.data.shippingPostalCode || null,
      shipping_country: parsed.data.shippingCountry || "United States",
      status: "sale_recorded",
      source: "site_static_checkout",
      subtotal_cents: totals.subtotalCents,
      shipping_cents: totals.shippingCents,
      total_cents: totals.totalCents,
      savings_cents: totals.savingsCents,
      gift_value_cents: totals.giftValueCents,
      currency: "USD",
      promo_codes: promoCodes,
      gift_message: cart.giftMessage || null,
    })
    .select("id, order_number")
    .single();

  if (orderError || !order) {
    return {
      status: "error",
      message: orderError?.message ?? "Order could not be recorded.",
    };
  }

  const { error: itemsError } = await admin.from("order_items").insert(
    lines.map((line) => ({
      order_id: order.id,
      product_id: line.productId,
      product_slug: line.slug ?? null,
      line_type: line.type,
      title: line.title,
      subtitle: line.subtitle ?? null,
      image: line.image,
      quantity: line.quantity,
      unit_price_cents: line.unitPriceCents,
      compare_at_cents: line.compareAtCents ?? null,
    })),
  );

  if (itemsError) {
    await admin.from("orders").delete().eq("id", order.id);

    return {
      status: "error",
      message: itemsError.message,
    };
  }

  if (userId) {
    await admin.from("profiles").upsert({
      id: userId,
      email: parsed.data.email,
      full_name: parsed.data.fullName,
      phone: parsed.data.phone || null,
      shipping_line1: parsed.data.shippingLine1 || null,
      shipping_line2: parsed.data.shippingLine2 || null,
      shipping_city: parsed.data.shippingCity || null,
      shipping_state: parsed.data.shippingState || null,
      shipping_postal_code: parsed.data.shippingPostalCode || null,
      shipping_country: parsed.data.shippingCountry || "United States",
      marketing_opt_in: parsed.data.marketingOptIn === "on",
    });
  }

  return {
    status: "success",
    message: "Sale recorded.",
    orderNumber: order.order_number,
  };
}
