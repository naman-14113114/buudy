# Buudy international draft and storefront restoration, 7 October 2026

## Current direction: preserve the original conversion page

The owner rejected the separate, simplified localized layout and the added currency forms and payment/bank-fee copy on 7 October. That design is not approved for publication. `localizedStorefrontEnabled` is false: automatic language routing is disabled, language URLs temporarily redirect to the existing corresponding English page, and localized drafts are excluded from sitemap/hreflang. The added header language row and currency forms are removed. The original large sale/compare price component and cart summary layout are reused.

The translation files remain saved for an implementation that translates the existing storefront in place. The 67-language and 500-URL results below document the rejected draft's validation, not current live translation coverage. Do not re-enable the flag until the existing sections, imagery, conversion CTAs, controls and cart appearance have been retained and translated. Currency remains automatically selected from the existing provider-backed service; no XPage settings change is required.

## Scope

Production source is `naman-14113114/buudy`, `apps/us`, serving `https://www.buudy.com`. Changes are confined to this app. The separate UK repository/app, shared packages and XPageDrop configuration are untouched. All copy was authored directly by Codex; no paid translation API was used.

The main mask journey is available in 67 languages, including English. It covers homepage, product details, five product FAQs, cart, contact, about, shipping and returns summaries. Five complete policy documents are also available in French, German, Dutch, Danish and Swedish, alongside English. Refund aliases use the complete return policy. Other locales explicitly link to the complete English terms.

## Coverage and limits

The 5 October country-only provider check accepted 222 destinations and rejected 17. Published languages cover the planned default language for 220 accepted destinations. Dzongkha for Bhutan and Dhivehi for Maldives remain gaps; English fallback is not counted as completed localization. Multilingual countries can select another published language. This does not cover every language spoken within every country.

Country-only delivery acceptance does not establish address-level eligibility, delivery time or successful payment. The provider checks the final address. Image/video text, quizzes, companion content and many complete legal translations remain outside this release's completed translation coverage. No independent native-speaker certification was obtained.

## Language, pricing and checkout

Neutral homepage entry chooses an explicit saved language, then a supported browser preference, then the published country default. Explicit language/deep URLs retain their content. Translated HTML uses self-canonicals, reciprocal hreflang and x-default; invalid paths return 404 and carts are noindex.

Display prices are public quotes from the existing XPage offer. All 154 provider currency codes returned matching native quotes during the 7 October read-only sweep. Rates change. The mask base price is GBP 179 at this evidence date; BUUDY10 is the provider's fixed GBP 10 discount. Do not restore the obsolete percentage discount or calculate a complete local basket by multiplying a rounded converted unit price.

The cart shows the exact GBP product total and explains that the provider converts the complete basket. XPage's payment configuration settles in GBP; the chosen display currency does not imply local-currency settlement. The mask feed uses the same GBP price/currency as the server HTML and Product schema. Mixed mask/other-product carts are blocked with a clear instruction to purchase separately; an invented combined total is not shown.

Native mask quote failures disable purchase actions and show retry messaging. Checkout creates a fresh provider session; POST is not retried. Quantity and free-torch lines are preserved. No payment, address/contact submission or real order was made during testing.

## Validation and measurement

The release passed TypeScript, production build, scoped ESLint, 21 routing/provider tests, 67 dictionary checks, 30 full-policy markup/link/numeric parity checks, and local checks of 500 indexable sitemap URLs. Browser checks covered 320px RTL layout, explicit currency retention through a language change, quantity two with the fixed discount, and mixed-cart messaging. Production verification and IndexNow evidence are recorded separately after deployment.

Independent review identified feed currency, mixed-cart totals, localized lifecycle analytics and stale query preference issues. These were repaired and verified in the parent session. The reviewer could not finish its final review because the workspace agent service reported credit exhaustion; do not claim a completed independent sign-off.

IndexNow tooling verifies the public ownership file and every submitted canonical/indexable URL before submission. HTTP 200/202 records acceptance only. It does not establish indexing, ranking, traffic or sales. The existing Bing API key currently lists Learn, BestLedFaceMask and TheGlobalEdit; it does not establish verified access for buudy.com. Search Console, organic sales baselines and cross-property content reconciliation remain follow-up work.

Existing English content still contains claims and assets needing provenance review. This release does not certify every legacy claim, review, credential, caption or provider policy. In particular, the source return policy has an internal change-of-mind clause inconsistency; translations preserve the source and summaries describe its restrictive conditions rather than promising an unconditional guarantee.
