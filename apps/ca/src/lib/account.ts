import { redirect } from "next/navigation";
import { isAdminEmail, isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Profile } from "@/types/database";

export type CurrentAccount = {
  user: {
    id: string;
    email: string;
  } | null;
  profile: Profile | null;
  isAdmin: boolean;
};

export async function getCurrentAccount(): Promise<CurrentAccount> {
  if (!isSupabaseConfigured()) {
    return {
      user: null,
      profile: null,
      isAdmin: false,
    };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return {
      user: null,
      profile: null,
      isAdmin: false,
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    profile,
    isAdmin: isAdminEmail(user.email),
  };
}

export async function requireAccount(redirectTo = "/my-profile") {
  const account = await getCurrentAccount();

  if (!account.user) {
    redirect(`/sign-in?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  return account as CurrentAccount & {
    user: NonNullable<CurrentAccount["user"]>;
  };
}

export async function requireAdmin() {
  const account = await requireAccount("/admin");

  if (!account.isAdmin) {
    redirect("/my-profile");
  }

  return account;
}
