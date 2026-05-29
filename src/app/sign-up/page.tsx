import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/account/AuthForm";
import { getCurrentAccount } from "@/lib/account";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your Buudy customer account.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

type SignUpPageProps = {
  searchParams?: Promise<{
    redirectTo?: string | string[];
  }>;
};

function firstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams;
  const redirectTo = firstParam(params?.redirectTo) || "/my-profile";
  const account = await getCurrentAccount();

  if (account.user) {
    redirect(redirectTo);
  }

  return (
    <section className="buudy-section bg-[var(--cream)] py-20 md:py-28">
      <div className="buudy-wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="self-center">
          <p className="buudy-eyebrow">New account</p>
          <h1 className="buudy-heading mt-4">Your glow profile.</h1>
          <p className="buudy-copy mt-5 max-w-xl">
            Create an account to keep your contact details ready, track recorded
            sales, and make future Buudy orders smoother.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_24px_80px_-58px_rgba(58,31,61,.7)] md:p-8">
          <AuthForm mode="sign-up" redirectTo={redirectTo} />
        </div>
      </div>
    </section>
  );
}
