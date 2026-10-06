import { NextRequest, NextResponse } from 'next/server';
import { resolveCurrency } from '@/lib/international/markets';
import { getXpageQuote } from '@/lib/xpage-checkout';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
  const currency=resolveCurrency(request.nextUrl.searchParams.get('currency') || request.cookies.get('buudy_currency')?.value,request.headers.get('x-vercel-ip-country'));
  try {
    const [quote,base]=await Promise.all([getXpageQuote(currency),getXpageQuote('GBP')]);
    return NextResponse.json({quote,base},{headers:{'Cache-Control':'private, no-store'}});
  } catch {
    return NextResponse.json({error:'PRICE_UNAVAILABLE'},{status:503,headers:{'Cache-Control':'private, no-store'}});
  }
}
