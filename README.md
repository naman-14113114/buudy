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
quantities, gift messaging, promo summaries, and checkout recording.

Checkout currently treats the checkout click as the v1 sale record. It validates
customer details, recalculates totals on the server from product data, writes the
order to Supabase, clears the local cart, and redirects to
`/order-confirmation/[orderNumber]`.

## Accounts, Orders, And Admin

Customer accounts, profiles, order history, and the admin dashboard use Supabase
Auth and Postgres. Apply the migration in `supabase/migrations/` and set these
environment variables locally and in Vercel:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAILS=sahiljainsj004@gmail.com,support@buudy.com
```

Protected customer routes are `/my-profile`, `/order-history`, and
`/account-settings`. Admin routes are protected by `ADMIN_EMAILS` and start at
`/admin`. Never expose `SUPABASE_SERVICE_ROLE_KEY` to client-side code.

## Contact Form

The contact page lives at `/pages/contact-us` and posts to
Web3Forms directly from the browser, which is required for the free Web3Forms
plan. Create a Web3Forms access key for the email inbox, then add it locally and
in Vercel:

```bash
WEB3FORMS_ACCESS_KEY=your-web3forms-access-key
```

The browser loads that key at runtime through `src/app/api/contact/config/route.ts`,
so the same deployment works on `buudy-zeta.vercel.app`, `us.buudy.com`, or a
future domain without changing code. The submitted payload also records the
actual `window.location.href` as `source_url`.

`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is still supported as an optional build-time
shortcut, but `WEB3FORMS_ACCESS_KEY` is preferred on Vercel. The legacy
`src/app/api/contact/route.ts` remains as a graceful fallback for validation,
but Web3Forms free accounts reject server-side proxy submissions.

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
- Environment variable: `WEB3FORMS_ACCESS_KEY` for the contact form
- Supabase env variables listed above for accounts, orders, checkout recording,
  and admin dashboard
