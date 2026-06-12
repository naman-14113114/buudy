# Buudy Country Store Monorepo

This repository is a pnpm/Turborepo monorepo for the Buudy country storefronts.
Each country is a fully independent Next.js app so copy, SEO, pricing, product
IDs, checkout labels, policies, images, and page structure can change in one
country without changing another.

## Apps

- `apps/uk` -> `https://uk.buudy.com`
- `apps/us` -> `https://us.buudy.com`
- `apps/ca` -> `https://ca.buudy.com`
- `apps/au` -> `https://au.buudy.com`

The UK app is the current source of truth. US, CA, and AU were cloned from UK
and then updated with their own market data.

## Packages

- `packages/shared`: market-agnostic utilities such as class merging, money
  formatting, percentage-off, and delivery-date helpers.
- `packages/ui`: reusable, non-content UI primitives.
- `packages/eslint-config`: shared ESLint configuration.
- `packages/tsconfig`: shared TypeScript configuration.

Country-specific content stays inside each app. Do not move product data,
policies, page layouts, SEO copy, checkout IDs, or country images into shared
packages unless the same content truly belongs to every country.

## Install

```bash
pnpm install
```

## Local Development

```bash
pnpm dev:uk
pnpm dev:us
pnpm dev:ca
pnpm dev:au
```

You can also use filters directly:

```bash
pnpm --filter @buudy/uk dev
```

## Build And Lint

```bash
pnpm lint
pnpm build
pnpm build:uk
pnpm --filter @buudy/us build
```

## Vercel Setup

Create one Vercel project per country and set the project root directory:

- UK root directory: `apps/uk`
- US root directory: `apps/us`
- CA root directory: `apps/ca`
- AU root directory: `apps/au`

Use these commands in Vercel:

- Install command: `pnpm install --frozen-lockfile`
- Build command UK: `pnpm --filter @buudy/uk build`
- Build command US: `pnpm --filter @buudy/us build`
- Build command CA: `pnpm --filter @buudy/ca build`
- Build command AU: `pnpm --filter @buudy/au build`
- Output directory: leave the default Next.js output.

Keep environment variables per Vercel project. Do not blindly share Supabase,
Web3Forms, Klaviyo, checkout, or admin variables between countries unless they
are intentionally the same.

## Adding A New Country

1. Copy `apps/uk` to `apps/<country-code>`.
2. Rename the app package in `apps/<country-code>/package.json`.
3. Update app-local market data in `src/lib/market.ts`.
4. Update app-local product prices, copy, policies, metadata, country badge,
   checkout labels, and any country-specific assets.
5. Add root scripts if you want shortcuts like `dev:<country-code>`.
6. Create a Vercel project with root directory `apps/<country-code>`.

## Migration Notes

- The former single UK Next.js app now lives in `apps/uk`.
- `apps/us`, `apps/ca`, and `apps/au` are cloned country apps with independent
  market configuration and pricing.
- Shared packages are intentionally conservative. They contain generic helpers
  and primitives only, not country content.
- npm workflow was replaced by pnpm workspaces and Turborepo task orchestration.
