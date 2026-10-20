import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import { getSupabaseConfig, isSupabaseConfigured } from "@/lib/supabase/config";
import { getMaskLandingPage, MASK_CHECKOUT_PRODUCT_ID } from "@/lib/maskLandingPages";

export async function proxy(request: NextRequest) {
  const landingPage = getMaskLandingPage(request.nextUrl.pathname);
  function createResponse() {
    const nextResponse = NextResponse.next({ request });
    if (landingPage) {
      nextResponse.headers.set("X-Buudy-Landing-Id", landingPage.id);
      nextResponse.headers.set("X-Buudy-Checkout-Product", MASK_CHECKOUT_PRODUCT_ID);
    }
    return nextResponse;
  }
  let response = createResponse();

  if (!isSupabaseConfigured()) {
    return response;
  }

  const { url, publishableKey } = getSupabaseConfig();

  if (!url || !publishableKey) {
    return response;
  }

  const supabase = createServerClient<Database>(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = createResponse();

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  await supabase.auth.getClaims();

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|txt|xml)$).*)",
  ],
};
