"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AuthActionState } from "@/types/actions";

const emailSchema = z.string().trim().email("Enter a valid email address.");
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.");

const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password."),
  redirectTo: z.string().optional(),
});

const signUpSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  email: emailSchema,
  password: passwordSchema,
  redirectTo: z.string().optional(),
});

const profileSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  phone: z.string().trim().max(40).optional(),
  shippingLine1: z.string().trim().max(180).optional(),
  shippingLine2: z.string().trim().max(180).optional(),
  shippingCity: z.string().trim().max(80).optional(),
  shippingState: z.string().trim().max(80).optional(),
  shippingPostalCode: z.string().trim().max(40).optional(),
  shippingCountry: z.string().trim().max(80).optional(),
  marketingOptIn: z.string().optional(),
});

const passwordUpdateSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string().min(1, "Confirm your new password."),
});

function missingSupabaseState(): AuthActionState {
  return {
    status: "error",
    message:
      "Supabase is not configured yet. Add the Supabase environment variables and run the database migration.",
  };
}

function parseAction<T extends z.ZodTypeAny>(
  schema: T,
  formData: FormData,
) {
  return schema.safeParse(Object.fromEntries(formData));
}

async function getRequestOrigin() {
  const headerStore = await headers();
  const host =
    headerStore.get("x-forwarded-host") ?? headerStore.get("host") ?? "";
  const protocol = headerStore.get("x-forwarded-proto") ?? "https";

  if (!host) {
    return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  }

  return `${protocol}://${host}`;
}

export async function signInAction(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return missingSupabaseState();
  }

  const parsed = parseAction(signInSchema, formData);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Check the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  revalidatePath("/", "layout");
  redirect(parsed.data.redirectTo || "/my-profile");
}

export async function signUpAction(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return missingSupabaseState();
  }

  const parsed = parseAction(signUpSchema, formData);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Check the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createSupabaseServerClient();
  const origin = await getRequestOrigin();
  const { data, error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(
        parsed.data.redirectTo || "/my-profile",
      )}`,
      data: {
        full_name: parsed.data.fullName,
      },
    },
  });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  if (data.session) {
    await supabase.from("profiles").upsert({
      id: data.session.user.id,
      email: parsed.data.email,
      full_name: parsed.data.fullName,
    });

    revalidatePath("/", "layout");
    redirect(parsed.data.redirectTo || "/my-profile");
  }

  return {
    status: "success",
    message:
      "Account created. Check your email to confirm your Buudy account, then sign in.",
  };
}

export async function signOutAction() {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function updateProfileAction(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return missingSupabaseState();
  }

  const parsed = parseAction(profileSchema, formData);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Check the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user?.email) {
    return {
      status: "error",
      message: "Please sign in again before updating your profile.",
    };
  }

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    email: user.email,
    full_name: parsed.data.fullName,
    phone: parsed.data.phone || null,
    shipping_line1: parsed.data.shippingLine1 || null,
    shipping_line2: parsed.data.shippingLine2 || null,
    shipping_city: parsed.data.shippingCity || null,
    shipping_state: parsed.data.shippingState || null,
    shipping_postal_code: parsed.data.shippingPostalCode || null,
    shipping_country: parsed.data.shippingCountry || "United States",
    marketing_opt_in: parsed.data.marketingOptIn === "on",
  });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  revalidatePath("/my-profile");
  revalidatePath("/account-settings");

  return {
    status: "success",
    message: "Profile updated.",
  };
}

export async function updatePasswordAction(
  _state: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  if (!isSupabaseConfigured()) {
    return missingSupabaseState();
  }

  const parsed = parseAction(passwordUpdateSchema, formData);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Check the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  if (parsed.data.password !== parsed.data.confirmPassword) {
    return {
      status: "error",
      message: "Passwords do not match.",
      fieldErrors: {
        confirmPassword: ["Passwords do not match."],
      },
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "success",
    message: "Password updated.",
  };
}
