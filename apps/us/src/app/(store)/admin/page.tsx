import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { requireAdmin } from "@/lib/account";
import { market } from "@/lib/market";
import { formatMoney } from "@/lib/money";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";
import type { Order, OrderItem, Profile } from "@/types/database";

type OrderWithItems = Order & {
  order_items: OrderItem[];
};

type AdminPageProps = {
  searchParams?: Promise<{
    q?: string | string[];
  }>;
};

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Buudy admin dashboard for customers and recorded sales.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

const dateFormatter = new Intl.DateTimeFormat(market.locale, {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function firstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function includesQuery(values: Array<string | null | undefined>, query: string) {
  return values.some((value) => value?.toLowerCase().includes(query));
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  await requireAdmin();
  const params = await searchParams;
  const query = (firstParam(params?.q) ?? "").trim().toLowerCase();

  if (!isSupabaseAdminConfigured()) {
    return <AdminSetupNotice />;
  }

  const admin = createSupabaseAdminClient();
  const [{ data: ordersData, error: ordersError }, { data: profilesData }] =
    await Promise.all([
      admin
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false })
        .limit(100),
      admin
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100),
    ]);

  const orders = (ordersData ?? []) as OrderWithItems[];
  const profiles = (profilesData ?? []) as Profile[];
  const filteredOrders = query
    ? orders.filter((order) =>
        includesQuery(
          [
            order.order_number,
            order.customer_email,
            order.customer_full_name,
            order.customer_phone,
            order.status,
          ],
          query,
        ),
      )
    : orders;
  const filteredProfiles = query
    ? profiles.filter((profile) =>
        includesQuery(
          [profile.email, profile.full_name, profile.phone, profile.id],
          query,
        ),
      )
    : profiles;
  const totalRevenue = orders.reduce((total, order) => total + order.total_cents, 0);
  const uniqueCustomerEmails = new Set([
    ...profiles.map((profile) => profile.email.toLowerCase()),
    ...orders.map((order) => order.customer_email.toLowerCase()),
  ]);
  const recentOrders = filteredOrders.slice(0, 8);

  return (
    <section className="buudy-section bg-[var(--cream)] py-16 md:py-24">
      <div className="buudy-wrap">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="buudy-eyebrow">Admin</p>
            <h1 className="buudy-heading mt-3">Buudy dashboard.</h1>
            <p className="buudy-copy mt-4 max-w-2xl">
              Track customers, recorded sales, order snapshots, gifts, and promo
              performance from Supabase.
            </p>
          </div>
          <form className="relative w-full max-w-md" action="/admin">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--gold)]"
              size={17}
            />
            <input
              className="h-12 w-full rounded-full border border-[var(--border)] bg-[var(--card)] pl-11 pr-4 text-sm text-[var(--plum)] outline-none transition focus:border-[var(--plum)]"
              defaultValue={query}
              name="q"
              placeholder="Search customers or orders"
              type="search"
            />
          </form>
        </div>

        {ordersError ? (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {ordersError.message}
          </div>
        ) : null}

        <div className="grid gap-5 md:grid-cols-4">
          <MetricCard label="Recorded revenue" value={formatMoney(totalRevenue)} />
          <MetricCard label="Recorded sales" value={String(orders.length)} />
          <MetricCard
            label="Known customers"
            value={String(uniqueCustomerEmails.size)}
          />
          <MetricCard
            label="Average order"
            value={
              orders.length
                ? formatMoney(Math.round(totalRevenue / orders.length))
                : formatMoney(0)
            }
          />
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="buudy-mono text-[var(--gold)]">Orders</p>
                <h2 className="buudy-display mt-1 text-3xl text-[var(--plum)]">
                  Recent sales
                </h2>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="buudy-mono border-b border-[var(--border)] text-[var(--muted)]">
                  <tr>
                    <th className="py-3 pr-4 font-normal">Order</th>
                    <th className="py-3 pr-4 font-normal">Customer</th>
                    <th className="py-3 pr-4 font-normal">Items</th>
                    <th className="py-3 pr-4 font-normal">Total</th>
                    <th className="py-3 pr-4 font-normal">Status</th>
                    <th className="py-3 font-normal">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      className="border-b border-[rgba(58,31,61,.09)] last:border-0"
                      key={order.id}
                    >
                      <td className="py-4 pr-4 font-semibold text-[var(--plum)]">
                        <Link
                          className="underline underline-offset-4"
                          href={`/admin/orders/${order.order_number}`}
                        >
                          {order.order_number}
                        </Link>
                      </td>
                      <td className="py-4 pr-4 text-[var(--muted)]">
                        <span className="block font-semibold text-[var(--plum)]">
                          {order.customer_full_name}
                        </span>
                        {order.customer_email}
                      </td>
                      <td className="py-4 pr-4 text-[var(--muted)]">
                        {order.order_items.length}
                      </td>
                      <td className="py-4 pr-4 font-semibold text-[var(--plum)]">
                        {formatMoney(order.total_cents)}
                      </td>
                      <td className="py-4 pr-4 text-[var(--muted)]">
                        {order.status.replaceAll("_", " ")}
                      </td>
                      <td className="py-4 text-[var(--muted)]">
                        {dateFormatter.format(new Date(order.created_at))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!recentOrders.length ? (
                <p className="py-8 text-center text-sm text-[var(--muted)]">
                  No orders match this search.
                </p>
              ) : null}
            </div>
          </section>

          <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-5 md:p-6">
            <div className="mb-5">
              <p className="buudy-mono text-[var(--gold)]">Customers</p>
              <h2 className="buudy-display mt-1 text-3xl text-[var(--plum)]">
                Known profiles
              </h2>
            </div>
            <div className="space-y-3">
              {filteredProfiles.slice(0, 10).map((profile) => {
                const customerOrders = orders.filter(
                  (order) =>
                    order.user_id === profile.id ||
                    order.customer_email.toLowerCase() ===
                      profile.email.toLowerCase(),
                );
                const spend = customerOrders.reduce(
                  (total, order) => total + order.total_cents,
                  0,
                );

                return (
                  <Link
                    className="block rounded-2xl border border-[var(--border)] bg-[var(--cream)] p-4 transition hover:border-[var(--gold)]"
                    href={`/admin/customers/${profile.id}`}
                    key={profile.id}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="min-w-0">
                        <span className="block truncate font-semibold text-[var(--plum)]">
                          {profile.full_name || profile.email}
                        </span>
                        <span className="mt-1 block truncate text-sm text-[var(--muted)]">
                          {profile.email}
                        </span>
                      </span>
                      <ArrowRight size={16} className="text-[var(--gold)]" />
                    </span>
                    <span className="mt-3 flex justify-between text-xs text-[var(--muted)]">
                      <span>{customerOrders.length} orders</span>
                      <span>{formatMoney(spend)}</span>
                    </span>
                  </Link>
                );
              })}
              {!filteredProfiles.length ? (
                <p className="py-8 text-center text-sm text-[var(--muted)]">
                  No customer profiles match this search.
                </p>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5">
      <p className="buudy-mono text-[var(--gold)]">{label}</p>
      <p className="buudy-display mt-3 text-4xl text-[var(--plum)]">{value}</p>
    </div>
  );
}

function AdminSetupNotice() {
  return (
    <section className="buudy-section bg-[var(--cream)] py-20 md:py-28">
      <div className="buudy-wrap max-w-2xl text-center">
        <p className="buudy-eyebrow">Admin setup</p>
        <h1 className="buudy-heading mt-4">Supabase admin env missing.</h1>
        <p className="buudy-copy mx-auto mt-5 max-w-lg">
          Add NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
          SUPABASE_SERVICE_ROLE_KEY, and ADMIN_EMAILS, then apply the migration.
        </p>
        <Button asChild className="mt-8">
          <Link href="/my-profile">Back to profile</Link>
        </Button>
      </div>
    </section>
  );
}
