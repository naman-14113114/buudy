import { buildGoogleMerchantXml } from "@/lib/googleMerchant";

export const revalidate = 3600;

export function GET() {
  return new Response(buildGoogleMerchantXml(), {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
