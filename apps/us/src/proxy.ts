import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import { getSupabaseConfig, isSupabaseConfigured } from "@/lib/supabase/config";
import { resolveLanguage, localePath, hasLocale } from '@/lib/international/markets';
import { localizedStorefrontEnabled, isPublishedLocalizedPath } from '@/lib/international/rollout';

export async function proxy(request: NextRequest) {
  const prefix=request.nextUrl.pathname.split('/')[1];
  const unprefixedPath=request.nextUrl.pathname.slice(prefix.length+1)||'/';
  if(!localizedStorefrontEnabled&&prefix!=='en'&&hasLocale(prefix)&&!isPublishedLocalizedPath(prefix,unprefixedPath)){
    const target=request.nextUrl.clone();
    target.pathname=request.nextUrl.pathname.slice(prefix.length+1)||'/';
    const response=NextResponse.redirect(target,307);
    response.headers.set('Cache-Control','private, no-store');
    return response;
  }
  // Select only a complete original-template translation; unfinished routes stay English.
  if(request.nextUrl.pathname==='/products/buudy-led-mask') {
    const locale=resolveLanguage(request.cookies.get('buudy_language')?.value,request.headers.get('accept-language') || undefined,request.headers.get('x-vercel-ip-country') || undefined);
    if(isPublishedLocalizedPath(locale,request.nextUrl.pathname)) {
      const target=request.nextUrl.clone();target.pathname=localePath(locale,request.nextUrl.pathname);
      const redirect=NextResponse.redirect(target,307);
      redirect.headers.set('Cache-Control','private, no-store');
      redirect.headers.set('Vary','Accept-Language, Cookie, X-Vercel-IP-Country');
      return redirect;
    }
  }
  // Only the neutral homepage chooses a first-visit language. Deep links,
  // APIs and explicit language URLs always keep their URL-defined content.
  if(localizedStorefrontEnabled&&request.nextUrl.pathname==='/') {
    const locale=resolveLanguage(request.cookies.get('buudy_language')?.value,request.headers.get('accept-language') || undefined,request.headers.get('x-vercel-ip-country') || undefined);
    if(locale!=='en') {
      const target=request.nextUrl.clone();target.pathname=localePath(locale);
      const redirect=NextResponse.redirect(target,307);
      redirect.headers.set('Cache-Control','private, no-store');
      redirect.headers.set('Vary','Accept-Language, Cookie, X-Vercel-IP-Country');
      return redirect;
    }
  }
  let response = NextResponse.next({
    request,
  });

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

        response = NextResponse.next({
          request,
        });

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
