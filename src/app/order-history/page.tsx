import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { requireAccount } from "@/lib/account";
import { formatMoney } from "@/lib/money";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Order, OrderItem } from "@/types/database";

type OrderWithItems = Order & {
  order_items: OrderItem[];
};

export const metadata: Metadata = {
  title: "Order History",
  description: "View your Buudy order history.",
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

export default async function OrderHistoryPage() {
  const account = await requireAccount("/order-history");
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", account.user.id)
    .order("created_at", { ascending: false });
  const orders = (data ?? []) as OrderWithItems[];

  return (
    <section className="buudy-section bg-[var(--cream)] py-16 md:py-24">
      <div className="buudy-wrap">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="buudy-eyebrow">Order history</p>
            <h1 className="buudy-heading mt-3">Your Buudy orders.</h1>
            <p className="buudy-copy mt-4 max-w-2xl">
              Signed-in checkout records appear here automatically with customer
              details and order totals.
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/">
              Continue shopping
              <ArrowRight size={17} />
            </Link>
          </Button>
        </div>

        {orders.length ? (
          <div className="space-y-5">
            {orders.map((order) => (
              <article
                className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-5 md:p-6"
                key={order.id}
              >
                <div className="flex flex-col justify-between gap-5 border-b border-[var(--border)] pb-5 md:flex-row md:items-center">
                  <div>
                    <p className="buudy-mono text-[var(--gold)]">
                      {dateFormatter.format(new Date(order.created_at))}
                    </p>
                    <h2 className="buudy-display mt-2 text-3xl text-[var(--plum)]">
                      {order.order_number}
                    </h2>
                    <p className="mt-1 text-sm capitalize text-[var(--muted)]">
                      {order.status.replaceAll("_", " ")}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="buudy-display text-3xl text-[var(--plum)]">
                      {formatMoney(order.total_cents)}
                    </p>
                    <Link
                      className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[var(--plum)] underline underline-offset-4"
                      href={`/order-confirmation/${order.order_number}`}
                    >
                      View confirmation
                      <ArrowRight size={15} />
                    </Link>
                  </div>
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
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-10 text-center">
            <PackageCheck className="mx-auto text-[var(--gold)]" size={42} />
            <h2 className="buudy-display mt-5 text-3xl text-[var(--plum)]">
              No recorded orders yet.
            </h2>
            <p className="buudy-copy mx-auto mt-3 max-w-lg">
              Once you checkout while signed in, your Buudy order record will
              appear here.
            </p>
            <Button asChild className="mt-7">
              <Link href="/">Shop Buudy</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
