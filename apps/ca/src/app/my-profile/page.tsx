import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, Mail, MapPin, Phone, ShoppingBag } from "lucide-react";
import { ProfileForm } from "@/components/account/ProfileForm";
import { Button } from "@/components/ui/Button";
import { requireAccount } from "@/lib/account";
import { formatMoney } from "@/lib/money";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your Buudy customer profile.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function MyProfilePage() {
  const account = await requireAccount("/my-profile");
  const supabase = await createSupabaseServerClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("id, order_number, total_cents, status, created_at")
    .eq("user_id", account.user.id)
    .order("created_at", { ascending: false })
    .limit(3);
  const safeOrders = orders ?? [];
  const totalSpend = safeOrders.reduce(
    (total, order) => total + order.total_cents,
    0,
  );

  return (
    <section className="buudy-section bg-[var(--cream)] py-16 md:py-24">
      <div className="buudy-wrap">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="buudy-eyebrow">My profile</p>
            <h1 className="buudy-heading mt-3">
              Hello, {account.profile?.full_name?.split(" ")[0] ?? "there"}.
            </h1>
            <p className="buudy-copy mt-4 max-w-2xl">
              Keep your contact and shipping details ready for faster Buudy
              checkout.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/order-history">
              View orders
              <ArrowRight size={17} />
            </Link>
          </Button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <ProfileCard
            icon={<Mail size={18} />}
            label="Email"
            value={account.user.email}
          />
          <ProfileCard
            icon={<Phone size={18} />}
            label="Phone"
            value={account.profile?.phone || "Not added yet"}
          />
          <ProfileCard
            icon={<ShoppingBag size={18} />}
            label="Recent spend"
            value={formatMoney(totalSpend)}
          />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 md:p-8">
            <h2 className="buudy-display text-3xl text-[var(--plum)]">
              Profile details
            </h2>
            <div className="mt-6">
              <ProfileForm email={account.user.email} profile={account.profile} />
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[rgba(188,146,82,.14)] text-[var(--gold)]">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="buudy-mono text-[var(--gold)]">Default address</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
                    {account.profile?.shipping_line1
                      ? [
                          account.profile.shipping_line1,
                          account.profile.shipping_city,
                          account.profile.shipping_state,
                          account.profile.shipping_postal_code,
                        ]
                          .filter(Boolean)
                          .join(", ")
                      : "Add your shipping address to make checkout faster."}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="buudy-mono text-[var(--gold)]">Recent orders</p>
              <div className="mt-4 space-y-3">
                {safeOrders.length ? (
                  safeOrders.map((order) => (
                    <Link
                      className="block rounded-xl border border-[var(--border)] bg-[var(--cream)] p-4 transition hover:border-[var(--gold)]"
                      href={`/order-confirmation/${order.order_number}`}
                      key={order.id}
                    >
                      <span className="block text-sm font-semibold text-[var(--plum)]">
                        {order.order_number}
                      </span>
                      <span className="mt-1 block text-sm text-[var(--muted)]">
                        {formatMoney(order.total_cents)} - {order.status}
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm leading-6 text-[var(--muted)]">
                    Recorded orders will appear here after checkout.
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ProfileCard({
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
