# Buudy-Vercel Context

Append-only operational record for:

`E:\1st YEAR DTU\New folder\Buudy-Vercel`

Read the workspace `AGENTS.md` and `CONTEXT.md`, then this file and the repository
`AGENTS.md`, before making recommendations or edits in this repository. Do not
remove or condense old entries. Do not record secrets, private tokens, or
credential-bearing remote URLs.

## 2026-08-11 08:13:08 +05:30 - Initial Buudy-Vercel state refresh for New folder memory

- Repository: `E:\1st YEAR DTU\New folder\Buudy-Vercel`.
- Intended GitHub repository: `https://github.com/naman-14113114/buudy.git`.
- Branch and HEAD after fetch: `main` at `71398fc967b0dc38dececc060d94b80b15658d17`.
- Upstream: `origin/main`, ahead/behind `0/0`.
- Worktree before this context file: clean. No staged, unstaged, or untracked files existed.
- Latest commit: `71398fc9 Merge branch 'main' of https://github.com/naman-14113114/buudy`, dated `2026-07-02T07:58:44+05:30`.
- Recent commits: `f0782a8e feat: add GiftBundle component to US, AU, CA, and UK apps`; `eb32cc0a Fix regional Klaviyo popup forms`; `387e1239 feat: add wavelength selector components and product section data across regional apps`.

### User Request And Practical Meaning

- User asked to update memory for the whole `New folder`, see GitHub state, and especially get current on `uk.Buudy Vercel Deployment` and `Buudy-Vercel`.
- Practical meaning for this repository: perform a read-only GitHub/local freshness audit, inspect current structure and major UK product facts, and record that future Buudy changes often need to be considered in both this multi-region repo and the newer UK deployment folder.
- Protected scope: no source code, product data, assets, review JSON, checkout logic, tracking, package files, Vercel configuration, Git history, commit, push, branch, pull request, deployment, promotion, or production setting was to be changed.

### Current Repository Shape

- This is the older multi-region pnpm/turbo monorepo.
- Root `package.json` name is `buudy`; package manager is `pnpm@11.1.1`.
- Workspace packages are `apps/*` and `packages/*`.
- Region apps exist under `apps/us`, `apps/uk`, `apps/ca`, and `apps/au`.
- Useful root scripts include `build`, `lint`, `typecheck`, and region-specific `dev:uk`, `dev:us`, `dev:ca`, `dev:au`, `build:*`, and `lint:*`.
- No local `.vercel/project.json` was present, so no local Vercel link file should be assumed for this repository.
- Repository `AGENTS.md` warns that this is not the Next.js version expected from model memory; read relevant local Next.js docs before writing code.

### Current UK App Facts Inspected

- UK market source in `apps/uk/src/lib/market.ts` uses `siteUrl: "https://uk.buudy.com"`, locale `en-GB`, currency `GBP`, checkout source `uk_buudy`, and checkout UTM source `uk.buudy.com`.
- `apps/uk/src/data/products.ts` contains two current UK products inspected:
  - `buudy-led-mask`, slug `buudy-led-mask`, template `mask`, price `17900`, compare-at `44900`, rating `4.9`, review count `16000`, customer count `16,000+`, promo code `GLOWKIT`.
  - `buudy-red-torch`, slug `red-light-torch`, template `torch`, price `7000`, compare-at `17500`, rating `4.8`, review count `16000`, customer count `16,000+`, promo code `TORCH60`.
- `apps/uk/src/data/reviews.ts` imports only LED mask and red torch reviews. No IPL review import was present in this repository's UK or US app.
- Review dataset counts inspected:
  - `apps/uk/src/data/reviews/buudy-led-mask-reviews.json`: `4274` reviews, rating distribution `1:3, 2:2, 3:4, 4:489, 5:3776`.
  - `apps/uk/src/data/reviews/buudy-red-torch-reviews.json`: `1172` reviews, rating distribution `1:34, 4:66, 5:1072`.
  - `apps/uk/src/data/reviews/buudy-ipl-hair-removal-device-reviews.json`: missing.
  - US review files match the UK LED mask and red torch counts and also lack the IPL review file.

### Checkout And Cross-Repo Divergence

- `apps/uk/src/lib/site.ts` uses `plusbaseStoreUrl = "https://buudy.com"` and bridge path `/pages/add-to-cart`.
- The older UK checkout URL builder hardcodes LED mask and gift values:
  - LED mask product ID `1000000611225890`, variant ID `1000019092784268`.
  - Red torch gift product ID `1000000665008955`, variant ID `1000020384558655`.
  - It always targets `product_handle: "buudy-led-mask"` and gift `buudy-red-torch`.
- This is materially different from the newer `uk.Buudy Vercel Deployment` folder, which supports LED mask, IPL device, and red torch PlusBase mappings by target product. Future work must not blindly copy checkout code between the two folders without reconciling these IDs and route/product differences.

### Files Inspected

- `AGENTS.md`.
- `package.json`.
- `pnpm-workspace.yaml`.
- `apps/uk/src/lib/market.ts`.
- `apps/uk/src/lib/site.ts`.
- `apps/uk/src/data/products.ts`.
- `apps/uk/src/data/reviews.ts`.
- UK and US review JSON file presence/counts.
- Recent Git commits and latest commit stats.

### Files Changed

- Added this append-only `CONTEXT.md` file.
- No application source, content, assets, review data, checkout logic, tracking, package files, Vercel settings, or deployment configuration were changed.

### Commands And Verification

- `git status --short --branch`.
- Sanitized `git remote -v`.
- `git fetch --all --prune --quiet`.
- `git rev-list --left-right --count "HEAD...@{upstream}"`.
- `git log --oneline --date=iso-strict`.
- `git show --stat --oneline --decorate HEAD`.
- Targeted `rg --files`, `rg`, and `Get-Content` reads for package, market, checkout, product, and review files.
- PowerShell JSON counts using `ConvertFrom-Json` for review datasets.

### Not Tested

- No lint, typecheck, build, browser, checkout, live deployment, or Vercel inspection was run for this repository because the task was a read-only memory refresh and no app file was edited.

### Git And Publishing State

- After this task, the repository has a documentation-only untracked/modified context file from this entry.
- No commit, push, branch, pull request, fast-forward pull, merge, rebase, stash, reset, Vercel deploy, production promotion, rollback, alias change, domain change, or environment/settings change occurred.

### Remaining Notes For Future Work

- Treat this repository as an older multi-region source, not as identical to the newer single-app UK Vercel deployment folder.
- If the user asks for a Buudy change and says it must be done in both folders, first reconcile both repositories again, then apply the change with awareness that product coverage, checkout mappings, domain/canonical values, and architecture differ.

## 2026-08-11 10:41:14 +05:30 - Four-market synchronization from latest UK source completed locally

### Repository And Starting State

- Repository: `E:\1st YEAR DTU\New folder\Buudy-Vercel`; apps/storefronts are UK `uk.buudy.com`, US `us.buudy.com`, CA `ca.buudy.com`, and AU `au.buudy.com`.
- Branch/HEAD: local `main` at `71398fc967b0dc38dececc060d94b80b15658d17`; upstream `origin/main` at the same commit; final ahead/behind `0/0`.
- A non-destructive fetch completed before editing. Starting worktree contained only this untracked append-only `CONTEXT.md`; it was preserved.
- Latest-source reference was `E:\1st YEAR DTU\New folder\uk.Buudy Vercel Deployment` at aligned HEAD `799ca7f`; Muuhu behavior was inspected from `muuhu-store` at aligned HEAD `bb3932bf`.

### User Request And Practical Scope

- Make `apps/uk` behaviorally equivalent to the updated standalone UK source, including current IPL product/routes/assets, reviews, merchant feed, attribution, analytics, Bing conversion, layout behavior, and current UK PlusBase IDs.
- Port the shared global image loader, accessible before/after modal, cart promotion, dynamic totals, and checkout robustness to US, CA, and AU while preserving each market's price, currency, domain, contact/content, SEO, analytics, attribution, PlusBase IDs, and existing country-only integrations.
- Apply regional mask gift coupons only when a mask unlocks a torch: US `free_bundle_us`, CA `free_bundle_ca`, AU `free_bundle_us`; UK has no gift coupon. Validate the universal case-insensitive `BUUDY10` as exactly 10 local currency units off.
- Protected scope: no UK IPL/feed/Bing/contact/analytics leakage into US/CA/AU; no regional commerce/config replacement; no live checkout, Git publication, Vercel, PlusBase, payment, or production change.

### Files And Routes Inspected

- Root and app package/workspace/Next configuration, all four market/site/product/cart/checkout files, current regional attribution helpers, product gallery/cart differences, current PlusBase IDs, and standalone UK `src`, `public`, `scripts`, and `supabase` trees.
- Local browser routes: each app's `/products/buudy-led-mask` and `/cart`; production route manifests from all four builds.
- UK-only presence checks covered IPL product route/data/assets/reviews, `/api/conversions/bing-ads`, and `/google-merchant-feed.xml`. US/CA/AU checks confirmed those paths remain absent.

### Files And Routes Changed

- `apps/uk`: synchronized every common file under `src`, `public`, `scripts`, and `supabase` from the completed standalone UK source; copied `.env.example`; merged UK CSP/Amazon image-host requirements into the monorepo-aware `next.config.ts`. This added current IPL assets/data/components/reviews, merchant feed, Bing conversion, marketing analytics, attribution/shopbase helpers, cart layout helpers, and the global loader.
- `apps/uk` common-file SHA-256 audit finished with `0` hash mismatches against standalone UK. Four unchanged monorepo-only extras remain: `PageMediaPreloader.tsx`, `RouteChrome.tsx`, `kala.png`, and `kala_logo.png`; they are not imported by current UK source and were preserved rather than deleted.
- `apps/us`, `apps/ca`, and `apps/au`: changed `src/app/actions/checkout.ts`, `src/app/api/checkout/prepare/route.ts`, `src/app/globals.css`, `src/app/layout.tsx`, cart `CartDrawer.tsx`, `CartProvider.tsx`, `CartSummary.tsx`, `CheckoutForm.tsx`, `PromoCodeBox.tsx`, product `BeforeAfterGrid.tsx`, `ProductPage.tsx`, `src/lib/cart.ts`, and `src/lib/site.ts`.
- Added in each of US/CA/AU: `public/images/buudy-image-loader.svg`, `src/components/ui/GlobalImageLoader.tsx`, and `src/components/product/DeferredClientSections.tsx`.
- Appended this `CONTEXT.md`. Root packages, shared configs, regional product/pricing/review/SEO/contact data, regional analytics, and non-requested routes were not changed.

### Shared UX And Cart Implementation

- Every app installs one root MutationObserver loader. It covers initial and dynamically inserted public images, keeps the Buudy SVG visible until `load` or `error`, preserves image priorities/video behavior, and supports reduced motion.
- Before/after cards keep their eight images, order, concerns, quotes, and carousel treatment. All cards open the accessible responsive modal with cyclic navigation, Escape/close, focus restoration, body lock, mobile swipe, adjacent image decode, and approved full profiles for Donna, Jane, Sarah, Michelle, James, Karen, Linda, and Jennifer.
- `manualPromoCode` is backward-compatible persisted cart state. Empty/incorrect codes reject accessibly; any casing of `Buudy10` normalizes to `BUUDY10`; removal and reload persistence work.
- The cart summary promo control is above totals/checkout. Cart totals are line-derived, promotion is exactly GBP/USD/CAD/AUD 10 once per cart, and totals floor at zero.
- Product page client-heavy review/before-after/wavelength/expert sections use deferred client sections without adding UK product/content to regional apps.

### Checkout And Regional Commerce Details

- Server routes revalidate `BUUDY10` and ignore client discount amounts. Gift lines in posted cart state are skipped; paid cart lines use each market's existing mappings; torch gift quantity equals actual mask quantity.
- US IDs remain mask `1000000667824913`/`1000020463775916`, torch `1000000667833408`/`1000020464156040`; mask gift code `free_bundle_us`.
- CA IDs remain mask `1000000667637100`/`1000020458546865`, torch `1000000667833423`/`1000020464156156`; mask gift code `free_bundle_ca`; current CA attribution normalization/webhook/cron behavior remains.
- AU IDs remain mask `1000000667824913`/`1000020463775916`, torch `1000000665008955`/`1000020384558655`; temporary mask gift code `free_bundle_us`.
- UK now has standalone parity: mask `1000000667467053`/`1000020450989467`, IPL `1000000667723529`/`1000020460632985`, torch `1000000670474158`/`1000020550222900`; no gift coupon.
- Direct checkout URLs append every applicable unique discount code. In US/CA/AU combined mask-plus-`BUUDY10` cases, the manual code is also attempted through PlusBase's coupon endpoint; a coupon failure is logged and checkout continues so neither code prevents the other attempt.
- Fallback builders now select the actual first paid product and quantity. Torch-only regional and IPL-only UK fallbacks no longer default to a mask or unlock a torch gift. Existing regional product/variant IDs and CA product handles/gift parameters were retained.

### Mistakes, Findings, And Corrections

- The initial global loader batched dynamic mutations and failed the early delayed-image browser assertion. It was changed to synchronize each observer callback directly, then passed pending/success/error probes.
- Early Playwright cart probes clicked before client hydration or inspected hidden cart-drawer duplicates. The isolated harness was corrected to wait for root readiness and visible controls; no app workaround was added.
- Checkout mock preparation exposed fallback mask defaults for non-mask carts and a UK generic gift quantity. The routes/builders were corrected to use actual paid product, actual quantity, and actual mask quantity in all apps.
- The first temporary TypeScript mock runner was treated as CommonJS and stopped before tests. The external verification folder was marked ESM; reruns passed without adding a repo dependency or contacting PlusBase.

### Verification

- `pnpm lint`: passed all four apps; UK `0` errors/`33` existing warnings, US/CA/AU each `0` errors/`29` existing warnings.
- Root `pnpm typecheck` stops in untouched `packages/shared` with existing `TS18003` because its config finds no inputs. Direct app command `pnpm --filter @buudy/uk --filter @buudy/us --filter @buudy/ca --filter @buudy/au typecheck` passed all four.
- `pnpm build`: passed all four final apps. UK generated `33/33` pages including IPL/feed/Bing; US, CA, and AU each generated `31/31` and retained only mask/torch product routes. CA retained existing cron/webhook routes.
- `git diff --check`: passed; only Windows LF-to-CRLF notices were printed.
- Standalone/app-UK common-file hash comparison across `src`, `public`, `scripts`, and `supabase`: `0` mismatches.
- Delayed image test proved loader visible while pending and cleared on successful load/error. Desktop/mobile modal tests covered next navigation, Escape/focus restoration, overflow, controls, and swipe.
- Browser promo suite passed empty, invalid, lowercase-valid, normalized, persisted, removed, and original/discounted totals in monorepo UK GBP 179/169, US USD 199/189, CA CAD 299/289, and AU AUD 299/289.
- Mocked checkout suites passed in all four apps for gift-only, promo-only, both-code, invalid code, non-mask, multi-quantity, fallback mask, and fallback non-mask. US/CA/AU additionally proved coupon-request failure is logged and tolerated. No live checkout was requested.
- Visual screenshots from the external Codex visualization workspace were inspected for UK cart placement and 390x844 modal layout. Local console errors were third-party Tawk CORS only; no app exception or hydration error remained.

### Not Tested And Remaining Uncertainty

- No live PlusBase checkout, hosted coupon combination, payment, order, webhook mutation, Vercel deployment, production page, environment variable, domain, alias, analytics dashboard, or PlusBase admin setting was changed/tested.
- PlusBase production support for repeated `discount` query parameters and simultaneous hosted coupon combination remains external behavior; code attempts all requested codes and tolerates individual coupon failure as specified.
- Root workspace typecheck remains red only because of the unrelated empty `packages/shared` config; the four app typechecks and builds are green.

### Final Git And Publishing State

- Final local `main` remains `71398fc9`, ahead/behind `0/0`; all approved source/assets and this untracked append-only context remain local and unstaged.
- No commit, push, branch, pull request, pull, merge, rebase, stash, reset, deployment, promotion, rollback, live checkout, payment, order, Vercel/PlusBase setting, alias, domain, or environment action occurred.

## 2026-08-11 10:47:17 +05:30 - Final diff-audit whitespace correction

- Repository/state: `Buudy-Vercel`, local `main` at HEAD `71398fc9`, aligned with `origin/main` at ahead/behind `0/0`. The requested Buudy UK/four-market implementation and all regional commerce boundaries remain unchanged.
- Request/practical scope: complete the already requested synchronization with a clean final audit; protected areas remained prices, currencies, domains, product/variant IDs, regional content/SEO/analytics/attribution, checkout configuration, Git history, and all production settings.
- Files inspected: final working-tree diff plus `apps/au/src/components/cart/CartDrawer.tsx`, `apps/ca/src/components/cart/CartDrawer.tsx`, `apps/uk/src/components/cart/CartDrawer.tsx`, `apps/us/src/components/cart/CartDrawer.tsx`, `apps/uk/src/components/cart/CartPageContent.tsx`, and `apps/uk/src/components/faq/FaqPage.tsx`.
- Files changed: removed one extra EOF blank line from each market's `CartDrawer.tsx`; removed trailing spaces from the UK cart sticky wrapper and FAQ support-email anchor. No rendered content, behavior, link, or data changed.
- Finding/correction: the first compact final `git diff --check` exposed four `new blank line at EOF` reports and two trailing-whitespace reports that were absent from the earlier summarized check. Those six formatting findings were corrected with a targeted patch, and the command then passed with only Windows LF-to-CRLF notices.
- Verification: reran `git diff --check` successfully; confirmed ahead/behind `0/0`; confirmed no Buudy Next dev server, delayed-image server, or checkout-verification process remained. The earlier lint, direct app typechecks, builds, browser tests, and mocked checkout tests remain the behavioral verification because this correction was whitespace-only.
- Not tested/remaining uncertainty: no production PlusBase coupon combination, live checkout, payment, order, Vercel deployment, or production setting was exercised. Hosted support for the requested combined coupon behavior remains external.
- Final Git/publishing state: implementation and context changes remain local and unstaged. No commit, push, branch, PR, pull, merge, rebase, stash, reset, deployment, promotion, rollback, alias/domain/environment change, live checkout, payment, or order occurred.
