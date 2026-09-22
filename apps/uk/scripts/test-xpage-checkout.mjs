import assert from "node:assert/strict";
import { test } from "node:test";
import { XPAGE, parsePublishedOffer, selectOffer, buildBundlePayload,
  validateCheckoutUrl, createXpageCheckout } from "../src/lib/xpage-checkout.ts";

function fixture() {
  const option = (promo) => ({
    id: promo ? XPAGE.promoOptionId : XPAGE.regularOptionId,
    discount_target: promo ? "TOTAL" : null,
    discount_type: promo ? "PERCENTAGE" : null,
    discount_amount: promo ? "5.59" : 0,
    conditions: [{ id: `fresh-mask-${promo}`, quantity: 1,
      product: { id: XPAGE.maskProductId, status: "ACTIVE", variants: [
        { id: XPAGE.maskVariantId, price: 179.56, is_visible: true },
      ] } }],
    offered: [{ id: `fresh-torch-${promo}`, quantity: 1, discount_type: "PERCENTAGE", discount_amount: "100.00",
      product: { id: XPAGE.torchProductId, status: "ACTIVE", variants: [
        { id: XPAGE.torchVariantId, price: 36.23, is_visible: true },
      ] } }],
  });
  return { bundle: { id: XPAGE.bundleId, status: "ACTIVE", options: [option(false), option(true)] },
    csrf: "fresh-public-session-token", landingPageId: "a2bbaaff-af2a-4cf9-b563-129e0ac93953" };
}
function html(published) {
  return `<div x-data='${JSON.stringify({ bundle: published.bundle })}'></div>
    <script>orderData.landing_page_id = "${published.landingPageId}";
    const headers = {"X-CSRF-Token": "${published.csrf}"};</script>`;
}

test("parses native JSON without evaluating unrelated Alpine expressions", () => {
  const data = fixture();
  assert.deepEqual(parsePublishedOffer(`<div x-data="throw new Error()"></div>${html(data)}`), data);
  const encoded = JSON.stringify({ bundle: data.bundle }).replaceAll('"', "&quot;");
  assert.deepEqual(parsePublishedOffer(html(data).replace(/<div.*<\/div>/, `<div x-data="${encoded}"></div>`)), data);
});
test("rejects missing or inactive published offer", () => {
  assert.throws(() => parsePublishedOffer("<h1>Sign in</h1>"));
  const data = fixture(); data.bundle.status = "INACTIVE";
  assert.throws(() => parsePublishedOffer(html(data)));
});
for (const quantity of [1, 2, 100]) {
  for (const promo of [false, true]) {
    test(`preserves ${quantity} masks and free torches with promo=${promo}`, () => {
      const data = fixture();
      const payload = buildBundlePayload(data, quantity, promo);
      assert.equal(payload.bundle_option_id, promo ? XPAGE.promoOptionId : XPAGE.regularOptionId);
      assert.deepEqual(payload.bundle_selected_variants.conditions[`fresh-mask-${promo}`], Array(quantity).fill(XPAGE.maskVariantId));
      assert.deepEqual(payload.bundle_selected_variants.offered[`fresh-torch-${promo}`], Array(quantity).fill(XPAGE.torchVariantId));
      assert.deepEqual(Object.keys(payload).sort(), [
        "bundle_option_id", "bundle_selected_variants", "landing_page_id",
      ]);
    });
  }
}
test("rejects invalid quantities instead of silently reducing the order", () => {
  for (const quantity of [0, -1, 1.5, NaN, Infinity, 101]) {
    assert.throws(() => buildBundlePayload(fixture(), quantity, false));
  }
});
test("fails closed if gift, promo, variant or product configuration changes", () => {
  const mutations = [
    (o) => { o.offered[0].discount_amount = "99"; },
    (o) => { o.discount_amount = "10"; },
    (o) => { o.conditions[0].quantity = 2; },
    (o) => { o.offered[0].product.id = "different-product"; },
    (o) => { o.conditions[0].product.variants[0].is_visible = false; },
    (o) => { o.conditions[0].product.status = "INACTIVE"; },
  ];
  for (const mutate of mutations) {
    const data = fixture(); mutate(data.bundle.options[1]);
    assert.throws(() => selectOffer(data, true));
  }
});
test("rejects unexpected checkout destinations and invalid tokens", () => {
  const token = "a".repeat(64);
  const url = `${XPAGE.checkoutOrigin}/session/checkout/${token}`;
  assert.equal(validateCheckoutUrl(url, token).origin, XPAGE.checkoutOrigin);
  for (const bad of [url.replace(".shop/", ".shop.evil.example/"), `${XPAGE.origin}/`, "javascript:alert(1)",
    url.replace("https://", "http://"), url.replace("https://", "https://user:password@")]) {
    assert.throws(() => validateCheckoutUrl(bad, token));
  }
  assert.throws(() => validateCheckoutUrl(url, "invalid"));
});
test("creates a fresh cookie session with only order data and returns a clean GBP checkout", async () => {
  let calls = 0;
  const fetcher = async (url, init) => {
    calls++;
    assert.equal(init.cache, "no-store");
    if (calls === 1) {
      assert.equal(url.toString(), `${XPAGE.origin}/?currency=GBP`);
      assert.equal(init.headers.cookie, "xp_currency=GBP");
      return new Response(html(fixture()), { headers: { "set-cookie": "session=unique; HttpOnly; Secure" } });
    }
    assert.equal(url, `${XPAGE.origin}/create-bundle-order`);
    assert.equal(init.headers["X-CSRF-Token"], fixture().csrf);
    assert.match(init.headers.cookie, /session=unique/);
    const payload = JSON.parse(init.body);
    assert.deepEqual(Object.keys(payload).sort(), [
      "bundle_option_id", "bundle_selected_variants", "landing_page_id",
    ]);
    assert.equal(init.headers.referer, `${XPAGE.origin}/?currency=GBP`);
    assert.doesNotMatch(JSON.stringify({ url, init }), /buudy\.co\.uk|utm_|msclkid|gclid|fbclid|custom_fields|buudy_promo_code/);
    const token = "b".repeat(64);
    return Response.json({ status: "success", checkout_token: token,
      checkout_url: `${XPAGE.checkoutOrigin}/session/checkout/${token}?utm_source=buudy.co.uk&msclkid=qa-click&source=cart&gclid=test&fbclid=test&redirect=https%3A%2F%2Fwww.buudy.co.uk%2Fcart#buudy.co.uk` });
  };
  const result = await createXpageCheckout(2, true, fetcher);
  assert.equal(calls, 2);
  assert.equal(new URL(result.checkoutUrl).origin, XPAGE.origin);
  assert.equal(new URL(result.checkoutUrl).search, "?currency=GBP");
  assert.equal(new URL(result.checkoutUrl).hash, "");
});
test("does not retry failed checkout POSTs", async () => {
  let calls = 0;
  await assert.rejects(createXpageCheckout(1, false, async () => {
    calls++;
    if (calls === 1) return new Response(html(fixture()));
    throw new Error("timeout");
  }));
  assert.equal(calls, 2);
});
