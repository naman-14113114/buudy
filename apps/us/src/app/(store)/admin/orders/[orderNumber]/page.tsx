import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Gift, Mail, PackageCheck, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { requireAdmin } from "@/lib/account";
import { market } from "@/lib/market";
import { formatMoney } from "@/lib/money";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";
import type { Order, OrderItem } from "@/types/database";

type OrderWithItems = Order & {
  order_items: OrderItem[];
};

type AdminOrderPageProps = {
  params: Promise<{
    orderNumber: string;
  }>;
};

export const metadata: Metadata = {
  title: "Order Detail",
  description: "Buudy admin order detail.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat(market.locale, {
  month: "long",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export default async function AdminOrderPage({ params }: AdminOrderPageProps) {
  await requireAdmin();
  const { orderNumber } = await params;

  if (!isSupabaseAdminConfigured()) {
    return <AdminNotice message="Supabase admin env is not configured." />;
  }

  const admin = createSupabaseAdminClient();
  const { data } = await admin
    .from("orders")
    .select("*, order_items(*)")
    .eq("order_number", orderNumber)
    .maybeSingle();
  const order = data as OrderWithItems | null;

  if (!order) {
    return <AdminNotice message="Order was not found." />;
  }

  const gifts = order.order_items.filter((item) => item.line_type === "gift");

  return (
    <section className="buudy-section bg-[var(--cream)] py-16 md:py-24">
      <div className="buudy-wrap">
        <Button asChild variant="ghost">
          <Link href="/admin">
            <ArrowLeft size={17} />
            Admin dashboard
          </Link>
        </Button>

        <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="buudy-eyebrow">Order detail</p>
            <h1 className="buudy-heading mt-3">{order.order_number}</h1>
            <p className="buudy-copy mt-4 max-w-2xl">
              Sale status, customer snapshot, items, gifts, promos, and totals
              captured at checkout.
            </p>
          </div>
          <p className="buudy-display text-5xl text-[var(--plum)]">
            {formatMoney(order.total_cents)}
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-5 md:p-6">
              <p className="buudy-mono text-[var(--gold)]">Items</p>
              <div className="mt-5 grid gap-3">
                {order.order_items.map((item) => (
                  <div
                    className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--cream)] p-3"
                    key={item.id}
                  >
                    {item.image ? (
                      <div className="relative h-16 w-14 flex-none overflow-hidden rounded-lg bg-[var(--blush)]">
                        <Image
                          alt={item.title}
                          className="object-cover"
                          fill
                          sizes="56px"
                          src={item.image}
                        />
                      </div>
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[var(--plum)]">
                        {item.title}
                      </p>
                      <p className="text-sm text-[var(--muted)]">
                        {item.product_id} - {item.line_type} x {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[var(--plum)]">
                        {item.unit_price_cents === 0
                          ? "Free"
                          : formatMoney(item.unit_price_cents)}
                      </p>
                      {item.compare_at_cents ? (
                        <p className="text-xs text-[var(--muted)] line-through">
                          {formatMoney(item.compare_at_cents)}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-5 md:p-6">
              <p className="buudy-mono text-[var(--gold)]">Gift bundle</p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {gifts.length ? (
                  gifts.map((gift) => (
                    <div
                      className="rounded-2xl border border-[var(--border)] bg-[var(--cream)] p-4"
                      key={gift.id}
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-[rgba(2,177,117,.12)] text-[var(--success)]">
                          <Gift size={17} />
                        </span>
                        <div>
                          <p className="font-semibold text-[var(--plum)]">
                            {gift.title}
                          </p>
                          <p className="text-sm text-[var(--muted)]">
                            Quantity {gift.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[var(--muted)]">
                    No free gifts were attached to this order.
                  </p>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="buudy-mono text-[var(--gold)]">Customer snapshot</p>
              <h2 className="buudy-display mt-3 text-3xl text-[var(--plum)]">
                {order.customer_full_name}
              </h2>
              <p className="mt-4 flex items-center gap-2 text-sm text-[var(--muted)]">
                <Mail size={15} />
                {order.customer_email}
              </p>
              {order.customer_phone ? (
                <p className="mt-2 flex items-center gap-2 text-sm text-[var(--muted)]">
                  <Phone size={15} />
                  {order.customer_phone}
                </p>
              ) : null}
              {order.user_id ? (
                <Button asChild className="mt-5 w-full" variant="ghost">
                  <Link href={`/admin/customers/${order.user_id}`}>
                    View customer profile
                  </Link>
                </Button>
              ) : null}
            </section>

            <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="buudy-mono text-[var(--gold)]">Order signals</p>
              <div className="mt-4 space-y-3 text-sm">
                <DetailRow label="Status" value={order.status.replaceAll("_", " ")} />
                <DetailRow label="Source" value={order.source} />
                <DetailRow
                  label="Created"
                  value={dateFormatter.format(new Date(order.created_at))}
                />
                <DetailRow
                  label="Promo"
                  value={order.promo_codes.length ? order.promo_codes.join(", ") : "None"}
                />
              </div>
            </section>

            <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="buudy-mono text-[var(--gold)]">Totals</p>
              <div className="mt-4 space-y-3 text-sm">
                <DetailRow label="Subtotal" value={formatMoney(order.subtotal_cents)} />
                <DetailRow label="Shipping" value={formatMoney(order.shipping_cents)} />
                <DetailRow
                  label="Savings"
                  value={`-${formatMoney(order.savings_cents)}`}
                />
                <DetailRow
                  label="Gift value"
                  value={formatMoney(order.gift_value_cents)}
                />
                <DetailRow label="Total" value={formatMoney(order.total_cents)} />
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-[var(--muted)]">{label}</span>
      <span className="text-right font-semibold capitalize text-[var(--plum)]">
        {value}
      </span>
    </div>
  );
}

function AdminNotice({ message }: { message: string }) {
  return (
    <section className="buudy-section bg-[var(--cream)] py-20 md:py-28">
      <div className="buudy-wrap max-w-2xl text-center">
        <PackageCheck className="mx-auto text-[var(--gold)]" size={46} />
        <h1 className="buudy-heading mt-5">Order unavailable.</h1>
        <p className="buudy-copy mx-auto mt-5 max-w-lg">{message}</p>
        <Button asChild className="mt-8">
          <Link href="/admin">Back to admin</Link>
        </Button>
      </div>
    </section>
  );
}
