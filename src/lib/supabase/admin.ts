import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { requireSupabaseAdminConfig } from "./config";

let adminClient: SupabaseClient<Database> | null = null;

export function createSupabaseAdminClient() {
  if (!adminClient) {
    const { url, serviceRoleKey } = requireSupabaseAdminConfig();

    adminClient = createClient<Database>(url, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return adminClient;
}
