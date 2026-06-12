import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/account/AuthForm";
import { getCurrentAccount } from "@/lib/account";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Buudy account.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

type SignInPageProps = {
  searchParams?: Promise<{
    redirectTo?: string | string[];
  }>;
};

function firstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
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
          <p className="buudy-eyebrow">Account</p>
          <h1 className="buudy-heading mt-4">Welcome back.</h1>
          <p className="buudy-copy mt-5 max-w-xl">
            Sign in to save profile details, view recorded Buudy orders, and
            manage your account settings.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_24px_80px_-58px_rgba(58,31,61,.7)] md:p-8">
          <AuthForm mode="sign-in" redirectTo={redirectTo} />
        </div>
      </div>
    </section>
  );
}
