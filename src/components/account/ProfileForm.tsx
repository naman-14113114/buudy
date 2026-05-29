"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";
import { updateProfileAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { initialAuthState, type AuthActionState } from "@/types/actions";
import type { Profile } from "@/types/database";

type ProfileFormProps = {
  email: string;
  profile: Profile | null;
};

function getFieldError(state: AuthActionState, name: string) {
  return state.fieldErrors?.[name]?.[0];
}

function textInput(hasError = false) {
  return [
    "mt-2 h-12 w-full rounded-xl border bg-[var(--cream)] px-4 text-sm text-[var(--plum)] outline-none transition",
    hasError ? "border-red-300 focus:border-red-500" : "border-[var(--border)] focus:border-[var(--plum)]",
  ].join(" ");
}

export function ProfileForm({ email, profile }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProfileAction,
    initialAuthState,
  );

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="buudy-mono text-[var(--plum)]">Full name</span>
          <input
            className={textInput(Boolean(getFieldError(state, "fullName")))}
            defaultValue={profile?.full_name ?? ""}
            name="fullName"
            placeholder="Your full name"
            required
            type="text"
          />
          {getFieldError(state, "fullName") ? (
            <span className="mt-2 block text-sm text-red-700">
              {getFieldError(state, "fullName")}
            </span>
          ) : null}
        </label>

        <label className="block">
          <span className="buudy-mono text-[var(--plum)]">Email</span>
          <input
            className={`${textInput()} cursor-not-allowed opacity-70`}
            readOnly
            value={email}
          />
        </label>

        <label className="block">
          <span className="buudy-mono text-[var(--plum)]">Phone</span>
          <input
            autoComplete="tel"
            className={textInput(Boolean(getFieldError(state, "phone")))}
            defaultValue={profile?.phone ?? ""}
            name="phone"
            placeholder="+1 555 000 0000"
            type="tel"
          />
        </label>

        <label className="block">
          <span className="buudy-mono text-[var(--plum)]">Country</span>
          <input
            autoComplete="country-name"
            className={textInput(Boolean(getFieldError(state, "shippingCountry")))}
            defaultValue={profile?.shipping_country ?? "United States"}
            name="shippingCountry"
            placeholder="United States"
            type="text"
          />
        </label>
      </div>

      <label className="block">
        <span className="buudy-mono text-[var(--plum)]">Shipping address</span>
        <input
          autoComplete="address-line1"
          className={textInput(Boolean(getFieldError(state, "shippingLine1")))}
          defaultValue={profile?.shipping_line1 ?? ""}
          name="shippingLine1"
          placeholder="Street address"
          type="text"
        />
      </label>

      <label className="block">
        <span className="buudy-mono text-[var(--plum)]">Apartment, suite, etc.</span>
        <input
          autoComplete="address-line2"
          className={textInput(Boolean(getFieldError(state, "shippingLine2")))}
          defaultValue={profile?.shipping_line2 ?? ""}
          name="shippingLine2"
          placeholder="Optional"
          type="text"
        />
      </label>

      <div className="grid gap-5 md:grid-cols-3">
        <label className="block">
          <span className="buudy-mono text-[var(--plum)]">City</span>
          <input
            autoComplete="address-level2"
            className={textInput(Boolean(getFieldError(state, "shippingCity")))}
            defaultValue={profile?.shipping_city ?? ""}
            name="shippingCity"
            type="text"
          />
        </label>
        <label className="block">
          <span className="buudy-mono text-[var(--plum)]">State</span>
          <input
            autoComplete="address-level1"
            className={textInput(Boolean(getFieldError(state, "shippingState")))}
            defaultValue={profile?.shipping_state ?? ""}
            name="shippingState"
            type="text"
          />
        </label>
        <label className="block">
          <span className="buudy-mono text-[var(--plum)]">Postal code</span>
          <input
            autoComplete="postal-code"
            className={textInput(Boolean(getFieldError(state, "shippingPostalCode")))}
            defaultValue={profile?.shipping_postal_code ?? ""}
            name="shippingPostalCode"
            type="text"
          />
        </label>
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[rgba(241,223,210,.32)] p-4 text-sm text-[var(--muted)]">
        <input
          className="mt-1 h-4 w-4 accent-[var(--plum)]"
          defaultChecked={profile?.marketing_opt_in ?? false}
          name="marketingOptIn"
          type="checkbox"
        />
        <span>
          Send me Buudy care tips, offer updates, and early product news.
        </span>
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

      <Button className="w-full md:w-auto" disabled={pending} type="submit">
        <Save size={17} />
        {pending ? "Saving..." : "Save profile"}
      </Button>
    </form>
  );
}
