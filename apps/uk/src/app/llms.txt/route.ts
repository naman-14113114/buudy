import { market } from "@/lib/market";

const body = `# Buudy UK

Buudy UK sells at-home LED light therapy devices for skincare and wellness routines.

## Primary Pages
- Home: ${market.siteUrl}
- Buudy LED Mask: ${market.siteUrl}/products/buudy-led-mask
- Best LED Face Mask UK Guide: ${market.siteUrl}/pages/best-led-face-mask-uk
- Buudy Red Torch: ${market.siteUrl}/products/red-light-torch
- Skincare Quiz: ${market.siteUrl}/pages/skincare-quiz
- FAQs: ${market.siteUrl}/pages/faqs

## Buudy LED Mask Summary
- Product: Buudy LED Mask
- Price: GBP 179 launch offer, compare-at GBP 449
- Category: LED face mask, red light therapy mask, blue light acne routine mask, anti-ageing LED mask
- LEDs: 192 high-density LEDs
- Modes: 7 visible light colours plus 830nm near-infrared
- Key wavelengths: red 633nm, blue 415nm, green 525nm, cyan 490nm, yellow 590nm, purple 390nm, white 510nm, near-infrared 830nm
- Coverage: face and neck
- Use style: cordless, rechargeable, hands-free, tap control
- Offer: free glow kit while the launch offer is live
- Returns: 90-day money back guarantee
- Shipping: free tracked UK shipping

## Buyer Intent Answers
- Best LED face mask UK: Buudy is designed for UK buyers who want high LED density, red and blue light modes, near-infrared support, neck coverage, cordless use, free tracked shipping, and a 90-day return window.
- LED face mask for acne and anti-ageing: Buudy combines blue 415nm light for breakout-prone routines with red 633nm light and 830nm near-infrared support for anti-ageing skincare routines.
- LED mask with neck coverage: Buudy includes neck coverage in the same device so the jawline and neck can be part of the same session.

## Safety Note
Buudy is a beauty and wellness device, not a medical treatment. People who are pregnant, have epilepsy, are sensitive to light, or take photosensitising medication should consult a qualified healthcare professional before using LED light therapy.
`;

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
