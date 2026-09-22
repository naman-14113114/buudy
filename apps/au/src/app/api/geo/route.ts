import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const queryCountry = request.nextUrl.searchParams.get("country");
  const headerCountry =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    request.headers.get("x-country-code") ||
    request.headers.get("x-country") ||
    request.headers.get("x-geo-country");

  const country = (queryCountry || headerCountry || "").trim().toUpperCase();

  return NextResponse.json(
    { country: country || null },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    },
  );
}
