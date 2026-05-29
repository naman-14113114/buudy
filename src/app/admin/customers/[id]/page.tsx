import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowLeft, Mail, Phone, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { requireAdmin } from "@/lib/account";
import { formatMoney } from "@/lib/money";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";
import type { Order, Profile } from "@/types/database";

type AdminCustomerPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata: Metadata = {
  title: "Customer Detail",
  description: "Buudy admin customer detail.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default async function AdminCustomerPage({
  params,
}: AdminCustomerPageProps) {
  await requireAdmin();
  const { id } = await params;

  if (!isSupabaseAdminConfigured()) {
    return <AdminNotice message="Supabase admin env is not configured." />;
  }

  const admin = createSupabaseAdminClient();
  const [{ data: profile }, { data: ordersData }] = await Promise.all([
    admin.from("profiles").select("*").eq("id", id).maybeSingle(),
    admin
      .from("orders")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false }),
  ]);
  const customer = profile as Profile | null;
  const orders = (ordersData ?? []) as Order[];

  if (!customer) {
    return <AdminNotice message="Customer profile was not found." />;
  }

  const totalSpend = orders.reduce((total, order) => total + order.total_cents, 0);
  const latestOrder = orders[0];

  return (
    <section className="buudy-section bg-[var(--cream)] py-16 md:py-24">
      <div className="buudy-wrap">
        <Button asChild variant="ghost">
          <Link href="/admin">
            <ArrowLeft size={17} />
            Admin dashboard
          </Link>
        </Button>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="buudy-eyebrow">Customer</p>
            <h1 className="buudy-heading mt-3">
              {customer.full_name || customer.email}
            </h1>
            <p className="buudy-copy mt-4 max-w-2xl">
              Customer profile, shipping details, marketing preference, and
              linked order history.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <DetailCard
                icon={<Mail size={18} />}
                label="Email"
                value={customer.email}
              />
              <DetailCard
                icon={<Phone size={18} />}
                label="Phone"
                value={customer.phone || "Not provided"}
              />
              <DetailCard
                icon={<ShoppingBag size={18} />}
                label="Total spend"
                value={formatMoney(totalSpend)}
              />
            </div>

            <section className="mt-8 rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-5 md:p-6">
              <p className="buudy-mono text-[var(--gold)]">Order history</p>
              <div className="mt-5 space-y-3">
                {orders.length ? (
                  orders.map((order) => (
                    <Link
                      className="flex flex-col justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--cream)] p-4 transition hover:border-[var(--gold)] md:flex-row md:items-center"
                      href={`/admin/orders/${order.order_number}`}
                      key={order.id}
                    >
                      <span>
                        <span className="block font-semibold text-[var(--plum)]">
                          {order.order_number}
                        </span>
                        <span className="mt-1 block text-sm text-[var(--muted)]">
                          {dateFormatter.format(new Date(order.created_at))} -{" "}
                          {order.status.replaceAll("_", " ")}
                        </span>
                      </span>
                      <span className="font-semibold text-[var(--plum)]">
                        {formatMoney(order.total_cents)}
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-[var(--muted)]">
                    No linked orders yet.
                  </p>
                )}
              </div>
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="buudy-mono text-[var(--gold)]">Profile id</p>
              <p className="mt-3 break-all text-sm font-semibold text-[var(--plum)]">
                {customer.id}
              </p>
            </section>

            <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="buudy-mono text-[var(--gold)]">Shipping</p>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {[
                  customer.shipping_line1,
                  customer.shipping_line2,
                  customer.shipping_city,
                  customer.shipping_state,
                  customer.shipping_postal_code,
                  customer.shipping_country,
                ]
                  .filter(Boolean)
                  .join(", ") || "No shipping address saved."}
              </p>
            </section>

            <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="buudy-mono text-[var(--gold)]">Account signals</p>
              <div className="mt-4 space-y-3 text-sm">
                <DetailRow
                  label="Marketing opt-in"
                  value={customer.marketing_opt_in ? "Yes" : "No"}
                />
                <DetailRow
                  label="Created"
                  value={dateFormatter.format(new Date(customer.created_at))}
                />
                <DetailRow
                  label="Latest order"
                  value={latestOrder?.order_number ?? "None"}
                />
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-[rgba(188,146,82,.14)] text-[var(--gold)]">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="buudy-mono text-[var(--gold)]">{label}</p>
          <p className="mt-1 truncate text-sm font-semibold text-[var(--plum)]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-[var(--muted)]">{label}</span>
      <span className="font-semibold text-[var(--plum)]">{value}</span>
    </div>
  );
}

function AdminNotice({ message }: { message: string }) {
  return (
    <section className="buudy-section bg-[var(--cream)] py-20 md:py-28">
      <div className="buudy-wrap max-w-2xl text-center">
        <p className="buudy-eyebrow">Admin</p>
        <h1 className="buudy-heading mt-4">Customer unavailable.</h1>
        <p className="buudy-copy mx-auto mt-5 max-w-lg">{message}</p>
        <Button asChild className="mt-8">
          <Link href="/admin">Back to admin</Link>
        </Button>
      </div>
    </section>
  );
}
