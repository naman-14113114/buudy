import { NextResponse } from "next/server";
import { getCurrentAccount } from "@/lib/account";

export const dynamic = "force-dynamic";

export async function GET() {
  const account = await getCurrentAccount();

  return NextResponse.json({
    user: account.user,
    profile: account.profile
      ? {
          fullName: account.profile.full_name,
          email: account.profile.email,
        }
      : null,
    isAdmin: account.isAdmin,
  });
}
