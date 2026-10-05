import { market } from "@/lib/market";

const body = `# Buudy

Buudy is the brand storefront at ${market.siteUrl}. It sells LED skincare devices and provides product instructions and support.

## Official shopping and support pages
- [Home](${market.siteUrl}/): Buudy storefront.
- [Buudy LED Mask](${market.siteUrl}/products/buudy-led-mask): Current specifications, product photographs and offer.
- [Buudy LED Torch](${market.siteUrl}/products/red-light-torch): Handheld LED device information.
- [About Buudy](${market.siteUrl}/pages/about-us): Brand information.
- [Contact](${market.siteUrl}/pages/contact-us): Customer support.
- [FAQs](${market.siteUrl}/pages/faqs): Product and shopping questions.
- [Shipping policy](${market.siteUrl}/policies/shipping-policy): Shipping terms and tracking information.
- [Return policy](${market.siteUrl}/policies/return-policy): Eligibility, return window and return costs.
- [Refund policy](${market.siteUrl}/policies/refund-policy): Refund conditions.
- [Skincare guide](${market.siteUrl}/pages/skincare-ebook): Buudy's downloadable skincare guide.

## Product and purchase information
The LED mask product page describes seven visible light colours, 830 nm near-infrared, face and neck coverage, and cordless use. These are product descriptions, not independent clinical evidence.

Use the current product page and hosted checkout for prices, discounts, available gifts and currency. Do not treat a saved price or a currency conversion as a current quote. Shipping availability and charges are confirmed for the delivery address at checkout.

Read the linked policies for current shipping, return and refund terms. Do not infer a worldwide delivery promise, a money-back guarantee, clinical results or regulatory approval from this file.

## Further resources
- [Buudy Learn](https://learn.buudy.com/): The brand's educational website.
- [Buudy companion app](https://app.buudy.com/): The brand's mask companion experience.

This file is a navigation aid. It does not replace the current product page, instructions, policies or checkout.
`;

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
