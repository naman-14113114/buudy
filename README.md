# Buudy Storefront

Scalable Next.js ecommerce storefront for Buudy, with a real homepage at `/`,
the LED Mask page at `/products/buudy-led-mask`, and the Red Torch page at
`/products/red-light-torch`.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS 4
- `next/font` and `next/image`
- Local product assets for key SEO/LCP images
- Client components only for cart, gallery, FAQ, video, selector, and sticky CTA interactions

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build Checks

```bash
npm run lint
npm run build
```

## Product Data

Most product and commerce content is data-driven:

- `src/data/home.ts` for homepage section content
- `src/data/products.ts` for product pricing, gifts, specs, gallery, and badges
- `src/data/productSections.ts` for reusable product section content
- `src/data/navigation.ts` and `src/data/footer.ts` for shared layout data

Adding another product should usually mean adding a product record and section
data, then allowing `src/app/products/[slug]/page.tsx` to render it.

## Cart And Checkout

The cart is handled in `src/components/cart/CartProvider.tsx` and persisted in
the browser. It supports multiple product lines, product-specific gifts, editable
quantities, gift messaging, promo summaries, and checkout routing isolated in
`src/lib/checkout.ts`.

Set this environment variable on Vercel when the real checkout destination is ready:

```bash
NEXT_PUBLIC_CHECKOUT_URL=https://your-checkout-url.example
```

Until then, checkout falls back to `https://buudy.com/cart`.

## Assets

Key product images are stored in:

```txt
public/images/products/buudy-led-mask/
public/images/products/buudy-red-torch/
public/images/home/
```

To re-sync the local product images from the known source URLs:

```bash
npm run sync:assets
```

Heavy review videos stay remote and lazy-loaded to keep the initial product page fast.

## Vercel Deployment

Create a new Vercel project from this folder. The default framework detection should
select Next.js automatically.

Recommended production settings:

- Build command: `npm run build`
- Install command: `npm install`
- Output directory: leave empty for Next.js
- Environment variable: `NEXT_PUBLIC_CHECKOUT_URL` when available
