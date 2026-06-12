import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CheckCircle2, Mail, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { market } from "@/lib/market";
import { formatMoney } from "@/lib/money";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";
import type { Order, OrderItem } from "@/types/database";

type OrderWithItems = Order & {
  order_items: OrderItem[];
};

type OrderConfirmationPageProps = {
  params: Promise<{
    orderNumber: string;
  }>;
};

export const metadata: Metadata = {
  title: "Order Confirmation",
  description: "Your Buudy order confirmation.",
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
});

export default async function OrderConfirmationPage({
  params,
}: OrderConfirmationPageProps) {
  const { orderNumber } = await params;

  if (!isSupabaseAdminConfigured()) {
    return <OrderSetupNotice orderNumber={orderNumber} />;
  }

  const admin = createSupabaseAdminClient();
  const { data, error } = await admin
    .from("orders")
    .select("*, order_items(*)")
    .eq("order_number", orderNumber)
    .maybeSingle();
  const order = data as OrderWithItems | null;

  if (error || !order) {
    return (
      <section className="buudy-section bg-[var(--cream)] py-20 md:py-28">
        <div className="buudy-wrap max-w-2xl text-center">
          <PackageCheck className="mx-auto text-[var(--gold)]" size={46} />
          <h1 className="buudy-heading mt-5">Order not found.</h1>
          <p className="buudy-copy mx-auto mt-5 max-w-lg">
            We could not load order {orderNumber}. Check the order number or{" "}
            <a className="font-semibold underline" href="mailto:support@buudy.com">
              contact support@buudy.com
            </a>
            .
          </p>
          <Button asChild className="mt-8">
            <Link href="/pages/contact-us#contact-form">Contact support</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="buudy-section bg-[var(--cream)] py-16 md:py-24">
      <div className="buudy-wrap">
        <div className="mx-auto max-w-3xl text-center">
          <CheckCircle2 className="mx-auto text-[var(--success)]" size={46} />
          <p className="buudy-eyebrow mt-5">Sale recorded</p>
          <h1 className="buudy-heading mt-3">Thank you, {order.customer_full_name}.</h1>
          <p className="buudy-copy mx-auto mt-5 max-w-2xl">
            Your Buudy order has been recorded as {order.order_number}. A real
            payment gateway can be connected later without changing the order
            dashboard structure.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-5 md:p-6">
            <div className="flex flex-col justify-between gap-4 border-b border-[var(--border)] pb-5 md:flex-row md:items-center">
              <div>
                <p className="buudy-mono text-[var(--gold)]">Order</p>
                <h2 className="buudy-display mt-2 text-3xl text-[var(--plum)]">
                  {order.order_number}
                </h2>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {dateFormatter.format(new Date(order.created_at))}
                </p>
              </div>
              <p className="buudy-display text-4xl text-[var(--plum)]">
                {formatMoney(order.total_cents)}
              </p>
            </div>

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
                      {item.line_type === "gift" ? "Free gift" : "Product"} x{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[var(--plum)]">
                    {item.unit_price_cents === 0
                      ? "Free"
                      : formatMoney(item.unit_price_cents)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="buudy-mono text-[var(--gold)]">Customer</p>
              <h2 className="buudy-display mt-3 text-3xl text-[var(--plum)]">
                {order.customer_full_name}
              </h2>
              <p className="mt-3 flex items-center gap-2 text-sm text-[var(--muted)]">
                <Mail size={15} />
                {order.customer_email}
              </p>
              {order.customer_phone ? (
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {order.customer_phone}
                </p>
              ) : null}
            </div>

            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="buudy-mono text-[var(--gold)]">Summary</p>
              <div className="mt-4 space-y-3 text-sm">
                <SummaryRow label="Subtotal" value={formatMoney(order.subtotal_cents)} />
                <SummaryRow label="Shipping" value="Free" />
                <SummaryRow
                  label="Savings"
                  value={`-${formatMoney(order.savings_cents)}`}
                />
                <SummaryRow
                  label="Gift value"
                  value={formatMoney(order.gift_value_cents)}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-[var(--muted)]">{label}</span>
      <span className="font-semibold text-[var(--plum)]">{value}</span>
    </div>
  );
}

function OrderSetupNotice({ orderNumber }: { orderNumber: string }) {
  return (
    <section className="buudy-section bg-[var(--cream)] py-20 md:py-28">
      <div className="buudy-wrap max-w-2xl text-center">
        <PackageCheck className="mx-auto text-[var(--gold)]" size={46} />
        <h1 className="buudy-heading mt-5">Order storage needs setup.</h1>
        <p className="buudy-copy mx-auto mt-5 max-w-lg">
          Order {orderNumber} cannot be loaded until the Supabase service role
          env var is added and the migration is applied.
        </p>
      </div>
    </section>
  );
}
