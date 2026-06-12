"use client";

import { useActionState } from "react";
import { KeyRound } from "lucide-react";
import { updatePasswordAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { initialAuthState, type AuthActionState } from "@/types/actions";

function getFieldError(state: AuthActionState, name: string) {
  return state.fieldErrors?.[name]?.[0];
}

function inputClasses(hasError = false) {
  return [
    "mt-2 h-12 w-full rounded-xl border bg-[var(--cream)] px-4 text-sm text-[var(--plum)] outline-none transition",
    hasError ? "border-red-300 focus:border-red-500" : "border-[var(--border)] focus:border-[var(--plum)]",
  ].join(" ");
}

export function PasswordForm() {
  const [state, formAction, pending] = useActionState(
    updatePasswordAction,
    initialAuthState,
  );

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="buudy-mono text-[var(--plum)]">New password</span>
          <input
            autoComplete="new-password"
            className={inputClasses(Boolean(getFieldError(state, "password")))}
            name="password"
            placeholder="At least 8 characters"
            required
            type="password"
          />
          {getFieldError(state, "password") ? (
            <span className="mt-2 block text-sm text-red-700">
              {getFieldError(state, "password")}
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="buudy-mono text-[var(--plum)]">Confirm password</span>
          <input
            autoComplete="new-password"
            className={inputClasses(Boolean(getFieldError(state, "confirmPassword")))}
            name="confirmPassword"
            required
            type="password"
          />
          {getFieldError(state, "confirmPassword") ? (
            <span className="mt-2 block text-sm text-red-700">
              {getFieldError(state, "confirmPassword")}
            </span>
          ) : null}
        </label>
      </div>

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

      <Button className="w-full md:w-auto" disabled={pending} type="submit">
        <KeyRound size={17} />
        {pending ? "Updating..." : "Update password"}
      </Button>
    </form>
  );
}
