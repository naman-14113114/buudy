"use client";

import Link from "next/link";
import { useActionState } from "react";
import { LockKeyhole, Mail, Sparkles, UserRound } from "lucide-react";
import { signInAction, signUpAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { initialAuthState, type AuthActionState } from "@/types/actions";

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
  redirectTo?: string;
};

function fieldError(
  state: AuthActionState,
  name: string,
): string | undefined {
  return state.fieldErrors?.[name]?.[0];
}

function inputClasses(hasError: boolean) {
  return [
    "mt-2 h-13 w-full rounded-full border bg-[var(--cream)] px-5 text-sm text-[var(--plum)] outline-none transition",
    hasError
      ? "border-red-300 focus:border-red-500"
      : "border-[var(--border)] focus:border-[var(--plum)]",
  ].join(" ");
}

export function AuthForm({ mode, redirectTo }: AuthFormProps) {
  const action = mode === "sign-in" ? signInAction : signUpAction;
  const [state, formAction, pending] = useActionState(action, initialAuthState);
  const isSignIn = mode === "sign-in";

  return (
    <form action={formAction} className="space-y-5">
      <input name="redirectTo" type="hidden" value={redirectTo ?? ""} />

      {!isSignIn ? (
        <label className="block">
          <span className="buudy-mono text-[var(--plum)]">Full name</span>
          <span className="relative block">
            <UserRound
              className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[var(--gold)]"
              size={18}
            />
            <input
              autoComplete="name"
              className={`${inputClasses(Boolean(fieldError(state, "fullName")))} pl-12`}
              name="fullName"
              placeholder="Sahil Jain"
              required
              type="text"
            />
          </span>
          {fieldError(state, "fullName") ? (
            <span className="mt-2 block text-sm text-red-700">
              {fieldError(state, "fullName")}
            </span>
          ) : null}
        </label>
      ) : null}

      <label className="block">
        <span className="buudy-mono text-[var(--plum)]">Email</span>
        <span className="relative block">
          <Mail
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[var(--gold)]"
            size={18}
          />
          <input
            autoComplete="email"
            className={`${inputClasses(Boolean(fieldError(state, "email")))} pl-12`}
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </span>
        {fieldError(state, "email") ? (
          <span className="mt-2 block text-sm text-red-700">
            {fieldError(state, "email")}
          </span>
        ) : null}
      </label>

      <label className="block">
        <span className="buudy-mono text-[var(--plum)]">Password</span>
        <span className="relative block">
          <LockKeyhole
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[var(--gold)]"
            size={18}
          />
          <input
            autoComplete={isSignIn ? "current-password" : "new-password"}
            className={`${inputClasses(Boolean(fieldError(state, "password")))} pl-12`}
            name="password"
            placeholder={isSignIn ? "Your password" : "At least 8 characters"}
            required
            type="password"
          />
        </span>
        {fieldError(state, "password") ? (
          <span className="mt-2 block text-sm text-red-700">
            {fieldError(state, "password")}
          </span>
        ) : null}
      </label>

      {state.message ? (
        <div
          className={`rounded-2xl border p-4 text-sm ${
            state.status === "success"
              ? "border-[rgba(2,177,117,.22)] bg-[rgba(2,177,117,.08)] text-[var(--success)]"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <Button className="w-full" disabled={pending} type="submit">
        <Sparkles size={17} />
        {pending
          ? isSignIn
            ? "Signing in..."
            : "Creating account..."
          : isSignIn
            ? "Sign in"
            : "Create account"}
      </Button>

      <p className="text-center text-sm text-[var(--muted)]">
        {isSignIn ? "New to Buudy?" : "Already have an account?"}{" "}
        <Link
          className="font-semibold text-[var(--plum)] underline underline-offset-4"
          href={
            isSignIn
              ? `/sign-up${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`
              : `/sign-in${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`
          }
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </form>
  );
}
